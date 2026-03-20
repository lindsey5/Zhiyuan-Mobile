import { View, Dimensions, Image, StyleSheet, TouchableOpacity, useWindowDimensions, Text } from "react-native";
import Animated, { useAnimatedStyle, interpolate } from "react-native-reanimated";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import CustomizedText from "../ui/Text";
import useResponsiveFontSize from "@/hooks/useResponsiveFont";
import { useRouter } from "expo-router";
import { useGetProducts } from "@/hooks/Product/use-get-products.hook";
import { formatToPeso } from "@/utils/format";

export default function ProductCarousel() {
	const { width } = useWindowDimensions();
	const progress = useSharedValue<number>(0);
	const windowWidth = Dimensions.get("window").width;
	const windowHeight = Dimensions.get("window").height;
	const font22 = useResponsiveFontSize(22);

	const itemWidth = windowWidth * 0.7;
	const sideSpacing = (windowWidth - itemWidth) / 0.8;

	const router = useRouter();
	const { data } = useGetProducts(1, 10, { sortBy: 'product_name', order: 'ASC'});

	function renderItem(info: { item: Product; index: number }) {
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
			router.push(`/product/${product.id}`);
		};

		return (
		<Animated.View style={[styles.itemContainer, animatedStyle]}>
			<Image
				source={{ uri: product.thumbnail_url}}
				style={styles.image}
			/>
			<CustomizedText style={{ fontSize: 32, marginTop: 20 }}>{product.product_name}</CustomizedText>
			<CustomizedText 
				style={{ fontSize: 18, marginVertical: 16, textAlign: "center", opacity: 0.6 }} 
				ellipsizeMode="tail" 
				numberOfLines={3}
			>{product.description}</CustomizedText>
			<TouchableOpacity 
				style={styles.button}
				onPress={handleAddToCart}
			>
				<View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
					<Image
						source={require('../../assets/basket.png')}
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

	return (
		<View style={styles.carouselContainer}>
			<Carousel
				data={data?.products || []}
				loop
				width={width >= 768 ? itemWidth : windowWidth * 0.9}
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
        backgroundColor: "#fff",
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
	}
});