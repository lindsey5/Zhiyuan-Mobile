import { View, Dimensions, Image, StyleSheet, TouchableOpacity, useWindowDimensions, Text } from "react-native";
import Animated, { useAnimatedStyle, interpolate } from "react-native-reanimated";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import CustomizedText from "../ui/Text";
import useResponsiveFontSize from "@/hooks/useResponsiveFont";
import { useRouter } from "expo-router";
import { useGetProducts } from "@/hooks/Product/use-get-products.hook";
import { formatToPeso } from "@/utils/format";
import COLOR from "@/lib/contants/color";
import usePulseAnimation from "@/hooks/usePulseAnimation";

export default function NewProductsCarousel() {
	const windowWidth = Dimensions.get("window").width;
	const windowHeight = Dimensions.get("window").height;
	const progress = useSharedValue<number>(0);

	const font22 = useResponsiveFontSize(22);

	const itemWidth = windowWidth * 0.7;
	const sideSpacing = (windowWidth - itemWidth) / 0.8;

	const router = useRouter();

	const pulseStyle = usePulseAnimation();

	const { data, isFetching } = useGetProducts(1, 10, { sortBy: 'createdAt', order: 'DESC'}, { categories: [] });

	function renderItem(info: { item: Product, index: number }) {
		const product = info.item;
		const index = info.index;

		const animatedStyle = useAnimatedStyle(() => {
			const distance = progress.value - index;

			const perspective = 600;

			// Subtle scale for side items
			const scale = interpolate(Math.abs(distance), [0, 1], [1, 0.9]);

			// Slight tilt for side items
			const rotateY = interpolate(distance, [-1, 0, 1], [10, 0, -10]);

			// Optional opacity for side items
			const opacity = interpolate(Math.abs(distance), [0, 1], [1, 0.7]);

			return {
				transform: [
				{ perspective },
				{ scale },
				{ rotateY: `${rotateY}deg` },
				],
				opacity,
			};
		});

		const handleAddToCart = () => {
			router.push(`/product/${product?._id}`);
		};

		if(isFetching || !data) {
			return (
				<Animated.View style={[styles.itemContainer, animatedStyle]}>
					<Animated.View style={[styles.skeletonImage, pulseStyle]} />
					<Animated.View style={[styles.skeletonTitle, pulseStyle]} />
					<Animated.View style={[styles.skeletonButton, pulseStyle]} />
				</Animated.View>
			);
		}

		return (
			<Animated.View style={[styles.itemContainer, animatedStyle]}>
				<Image
					source={{ uri: product.thumbnail_url}}
					style={styles.image}
				/>
				<CustomizedText style={{ fontSize: font22, marginTop: 20, textAlign: 'center' }}>{product.product_name}</CustomizedText>
				<TouchableOpacity 
					style={styles.button}
					onPress={handleAddToCart}
				>
					<View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
						<Image
							source={require('../../assets/Basket.png')}
							style={{ tintColor: '#A4E000', width: 32, height: 32 }}
							resizeMode="contain"
						/>
						<CustomizedText style={[styles.buttonText, { fontSize: font22 }]} onPress={handleAddToCart}>Add to Cart</CustomizedText>
					</View>
					<CustomizedText style={[styles.buttonText, { fontSize: font22 }]}>{formatToPeso(product.variants[0].price)}</CustomizedText>
				</TouchableOpacity>
			</Animated.View>
		);
	}
	const placeholderProduct : Product = { 
		_id: "", 
		product_name: '', 
		description: '',
		category: '',
		thumbnail_public_id: '',
		thumbnail_url: '',
		variants: [{ 
			_id: "",
			image_public_id: '',
			image_url: '',
			product_id: "",
			sku: '',
			stock: 1,
			variant_name: '',
			price: 0 
		}] 
	};

	return (
		<View style={styles.carouselContainer}>
			<Carousel
				data={isFetching ? Array.from({ length: 3 }, (_, i) => (placeholderProduct)) : data?.products || []}
				loop
				width={windowWidth >= 768 ? itemWidth : windowWidth * 0.9}
				height={Math.max(windowHeight * 0.6, 500)}
				mode="parallax"
				modeConfig={{
					parallaxScrollingScale: 0.8, 
					parallaxScrollingOffset: sideSpacing,
				}}
				pagingEnabled
				snapEnabled
				onProgressChange={(_, absoluteProgress) => {
					progress.value = absoluteProgress;
				}}
				renderItem={renderItem}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	carouselContainer: {
		flex: 1,
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	itemContainer: {
		flex: 1,
        borderRadius: 25,
        padding: 30,
        backgroundColor: COLOR.panel,
        alignItems: "center",
        elevation: 4,
        boxShadow: "0px 4px 6px rgba(0,0,0,0.3)"
	},
	image: {
		width: "100%",
		flex: 1,
		borderRadius: 12,
		resizeMode: "contain",
	},
	button: {
		maxWidth: 400,
		marginTop: 20, 
		backgroundColor: "#000000", 
		paddingHorizontal: 12,
		paddingVertical: 20,
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 50,
		justifyContent: "space-between",
	},
	buttonText: {
		color: "#fff", 
		fontWeight: '500'
	},
    skeletonImage: {
        width: "100%",
        flex: 1,
        borderRadius: 12,
        backgroundColor: COLOR.skeleton,
    },
    skeletonTitle: {
        width: "70%",
        height: 20,
        borderRadius: 10,
        marginTop: 20,
        backgroundColor: COLOR.skeleton,
    },

    skeletonButton: {
        maxWidth: 400,
		marginTop: 20, 
		backgroundColor: COLOR.skeleton, 
		paddingHorizontal: 12,
		paddingVertical: 30,
		width: "100%",
		borderRadius: 50,
    },
});