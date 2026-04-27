import {
  View,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Text,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import CustomizedText from "../ui/Text";
import useResponsiveFontSize from "@/hooks/useResponsiveFont";
import { useRouter } from "expo-router";
import { useGetProducts } from "@/hooks/Product/use-get-products.hook";
import { formatToPeso } from "@/utils/format";
import COLOR from "@/lib/contants/color";
import usePulseAnimation from "@/hooks/usePulseAnimation";
import { ArrowRight } from "lucide-react-native";

export default function NewProductsCarousel() {
	const windowWidth = Dimensions.get("window").width;
	const windowHeight = Dimensions.get("window").height;
	const progress = useSharedValue<number>(0);

	const font22 = useResponsiveFontSize(22);

	const itemWidth = windowWidth * 0.7;
	const sideSpacing = (windowWidth - itemWidth) / 0.8;

	const router = useRouter();
	const pulseStyle = usePulseAnimation();

	const { data, isFetching } = useGetProducts(
		1,
		10,
		{ sortBy: "createdAt", order: "DESC" },
		{ categories: [] }
	);

	function renderItem(info: { item: Product; index: number }) {
		const product = info.item;
		const index = info.index;

		const animatedStyle = useAnimatedStyle(() => {
		const distance = progress.value - index;
		const perspective = 600;

		const scale = interpolate(Math.abs(distance), [0, 1], [1, 0.9]);
		const rotateY = interpolate(distance, [-1, 0, 1], [10, 0, -10]);
		const opacity = interpolate(Math.abs(distance), [0, 1], [1, 0.7]);

		return {
			transform: [{ perspective }, { scale }, { rotateY: `${rotateY}deg` }],
			opacity,
		};
		});

		const handleAddToCart = () => {
		router.push(`/product/${product?._id}`);
		};

		if (isFetching || !data) {
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
			source={{ uri: product.thumbnail_url }}
			style={styles.image}
			/>

			<CustomizedText
			style={{
				fontSize: font22,
				marginTop: 20,
				textAlign: "center",
			}}
			>
			{product.product_name}
			</CustomizedText>

			<CustomizedText style={{ fontSize: font22, marginTop: 10 }}>
			{formatToPeso(product.variants?.[0].price || 0)}
			</CustomizedText>

			<TouchableOpacity
			style={styles.button}
			onPress={handleAddToCart}
			activeOpacity={0.85}
			>
			<View style={styles.buttonContent}>
				<Image
					source={require("../../assets/Basket.png")}
					style={styles.icon}
					resizeMode="contain"
				/>

				<Text style={[styles.buttonText, { fontSize: font22 }]}>Add to Cart</Text>
			</View>

			<ArrowRight color="white" size={20} />
			</TouchableOpacity>
		</Animated.View>
		);
	}

	const placeholderProduct: Product = {
		_id: "",
		product_name: "",
		description: "",
		category: "",
		thumbnail_public_id: "",
		thumbnail_url: "",
		variants: [
		{
			_id: "",
			image_public_id: "",
			image_url: "",
			product_id: "",
			sku: "",
			stock: 1,
			variant_name: "",
			price: 0,
		},
		],
	};

	return (
		<>
		<Text style={styles.sectionTitle}>New Products</Text>
		<View style={styles.carouselContainer}>
		<Carousel
			data={
			isFetching
				? Array.from({ length: 3 }, () => placeholderProduct)
				: data?.products || []
			}
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
			onProgressChange={(_, absoluteProgress) => progress.value = absoluteProgress}
			renderItem={renderItem}
		/>
		</View>
		</>
	);
}

const styles = StyleSheet.create({
	sectionTitle: {
        marginTop: 24,
        paddingHorizontal: 10,
        fontSize: 22,
        fontWeight: "700",
        color: "#1a1a1a",
    },

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
		shadowColor: "#000",
		shadowOpacity: 0.2,
		shadowRadius: 6,
		shadowOffset: { width: 0, height: 4 },
	},

	image: {
		width: "100%",
		flex: 1,
		borderRadius: 12,
		resizeMode: "contain",
	},

	button: {
		marginTop: 20,
		width: "100%",
		maxWidth: 400,

		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",

		paddingVertical: 16,
		paddingHorizontal: 20,

		borderRadius: 20,
		backgroundColor: "#000000", 

		borderWidth: 1,
		borderColor: "#eee",
	},

	buttonContent: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},

	icon: {
		width: 32,
		height: 32,
		tintColor: COLOR.accent,
	},

	buttonText: {
		fontWeight: "600",
		color: "white",
	},

	/* Skeleton */
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
		paddingVertical: 30,
		width: "100%",
		borderRadius: 16,
	},
});