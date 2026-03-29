// hooks/usePulseAnimation.ts
import { useEffect } from "react";
import { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from "react-native-reanimated";

export default function usePulseAnimation(minOpacity = 0.5, maxOpacity = 1, duration = 800) {
    const pulse = useSharedValue(0);

    useEffect(() => {
        pulse.value = withRepeat(
        withTiming(1, { duration, easing: Easing.inOut(Easing.ease) }),
        -1, // infinite repeat
        true // reverse
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: minOpacity + pulse.value * (maxOpacity - minOpacity),
    }));

    return animatedStyle;
}