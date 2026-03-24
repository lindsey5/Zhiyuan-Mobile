import COLOR from "@/lib/contants/color";
import React, { useRef } from "react";
import {
    View,
    StyleSheet,
    FlatList,
    Image,
    Dimensions,
    Animated,
} from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

type ImageSliderProps = {
    images: number[];
};

export default function ImageSlider({ images }: ImageSliderProps) {
    const scrollX = useRef(new Animated.Value(0)).current;

    return (
        <View style={styles.container}>
        {/* Image Slider */}
        <FlatList
            data={images}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
            )}
            renderItem={({ item }) => (
            <Image source={item} style={styles.image} />
            )}
        />

        {/* Dots */}
        <View style={styles.dotsContainer}>
            {images.map((_, index) => {
            const dotWidth = scrollX.interpolate({
                inputRange: [
                (index - 1) * SCREEN_WIDTH,
                index * SCREEN_WIDTH,
                (index + 1) * SCREEN_WIDTH,
                ],
                outputRange: [8, 16, 8],
                extrapolate: "clamp",
            });

            const opacity = scrollX.interpolate({
                inputRange: [
                (index - 1) * SCREEN_WIDTH,
                index * SCREEN_WIDTH,
                (index + 1) * SCREEN_WIDTH,
                ],
                outputRange: [0.3, 1, 0.3],
                extrapolate: "clamp",
            });

            return (
                <Animated.View
                key={index}
                style={[styles.dot, { width: dotWidth, opacity }]}
                />
            );
            })}
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    image: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT * 0.3,
        minHeight: 200,
        resizeMode: "cover",
    },
    dotsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },
    dot: {
        height: 8,
        borderRadius: 4,
        backgroundColor: COLOR.primary,
        marginHorizontal: 4,
    },
});