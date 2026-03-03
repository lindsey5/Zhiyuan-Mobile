import * as React from "react";
import { View, Dimensions, Image, StyleSheet, TouchableOpacity } from "react-native";
import Animated, { useAnimatedStyle, interpolate } from "react-native-reanimated";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import CustomizedText from "../ui/Text";
import { products } from "@/constants/data";
import responsiveFontSize from "@/utils/responsiveFontSize";
import { ShoppingBasket } from "lucide-react-native";

export default function ProductScreen() {
	const progress = useSharedValue<number>(0);
	const windowWidth = Dimensions.get("window").width;
	const windowHeight = Dimensions.get("window").height;

	const itemWidth = windowWidth * 0.7;
	const sideSpacing = (windowWidth - itemWidth) / 0.8;

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

		return (
		<Animated.View style={[styles.itemContainer, animatedStyle]}>
			<Image
				source={require('../../assets/billiard.png')}
				style={styles.image}
			/>
			<CustomizedText style={{ fontSize: responsiveFontSize(24), marginTop: 20 }}>{product.name}</CustomizedText>
			<CustomizedText 
				style={{ fontSize: responsiveFontSize(16), marginTop: 16, textAlign: "center", opacity: 0.6 }} 
				ellipsizeMode="tail" 
				numberOfLines={3}
			>{product.description}</CustomizedText>
			<TouchableOpacity 
				style={{
					marginTop: 20, 
					backgroundColor: "#000000", 
					paddingVertical: 10, 
					paddingHorizontal: 20, 
					width: "100%",
					flexDirection: "row",
					alignItems: "center",
					borderRadius: 50,
					justifyContent: "space-between"
				}}
			>
				<View style={{ flexDirection: "row", alignItems: "center", gap: 10}}>
					<ShoppingBasket color="#72aa28" size={35} />
				<CustomizedText style={{ color: "#fff", fontSize: responsiveFontSize(18) }}>Add to Cart</CustomizedText>
				</View>
				<CustomizedText style={{ color: "#fff", fontSize: responsiveFontSize(18) }}>P {product.price.toFixed(2)}</CustomizedText>
			</TouchableOpacity>
		</Animated.View>
		);
	}

	return (
		<View style={styles.carouselContainer}>
		<Carousel
			data={products}
			loop
			width={windowWidth}
			height={windowHeight * 0.55}
			mode="parallax"
			modeConfig={{
				parallaxScrollingScale: 0.8, 
				parallaxScrollingOffset: sideSpacing,
			}}
			pagingEnabled
			snapEnabled
			onProgressChange={(offsetProgress, absoluteProgress) => {
			progress.value = absoluteProgress;
			}}
			renderItem={renderItem}
		/>
		</View>
	);
}

const styles = StyleSheet.create({
	carouselContainer: {
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	itemContainer: {
		flex: 1,
		borderRadius: 25,
		padding: 30,
		backgroundColor: "#fff",
		boxShadow: "0 7px 15px rgba(0,0,0, 0.3)",
		alignItems: "center",
	},
	image: {
		width: "100%",
		flex: 1,
		borderRadius: 12,
		resizeMode: "contain",
	},
});