import { StyleSheet } from "react-native";
import Animated, {  } from "react-native-reanimated";
import COLOR from "@/lib/contants/color";
import usePulseAnimation from "@/hooks/usePulseAnimation";

export default function ProductCardSkeleton() {
    const pulseStyle = usePulseAnimation();

    return (
        <Animated.View style={[styles.card, pulseStyle]}>
            <Animated.View style={[styles.image, pulseStyle]} />
            <Animated.View style={[styles.title, pulseStyle]} />
            <Animated.View style={[styles.price, pulseStyle]} />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 25,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 12,
        backgroundColor: COLOR.skeleton,
    },
    title: {
        width: "80%",
        height: 16,
        borderRadius: 8,
        marginTop: 10,
        backgroundColor: COLOR.skeleton,
    },
    price: {
        width: "50%",
        height: 20,
        borderRadius: 8,
        marginTop: 8,
        backgroundColor: COLOR.skeleton,
    },
});