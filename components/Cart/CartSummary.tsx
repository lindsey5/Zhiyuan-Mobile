import { View, Image, StyleSheet, TouchableOpacity, Animated } from "react-native"
import CustomizedText from "../ui/Text"
import useResponsiveFontSize from "@/hooks/useResponsiveFont"
import COLOR from "@/lib/contants/color";
import { formatToPeso } from "@/utils/format";
import { ChevronRight } from "lucide-react-native";
import { useEffect, useRef } from "react";

export default function CartSummary ({ totalAmount } : { totalAmount : number}) {
    const font24 = useResponsiveFontSize(24);

    const fade1 = useRef(new Animated.Value(0.3)).current;
    const fade2 = useRef(new Animated.Value(0.3)).current;
    const fade3 = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
    const animate = (anim: Animated.Value, delay : number) => {
        Animated.loop(
        Animated.sequence([
            Animated.timing(anim, {
                toValue: 1,
                duration: 800,
                delay,
                useNativeDriver: true,
            }),
            Animated.timing(anim, {
                toValue: 0.3,
                duration: 800,
                useNativeDriver: true,
            }),
        ])
        ).start();
    };

    animate(fade1, 0);
    animate(fade2, 150);
    animate(fade3, 300);
    }, []);

    return (
        <View style={styles.cartSummary}>
            <Image 
                style={{ position: 'absolute', width: '100%', height: '100%', tintColor: COLOR.secondary }}
                resizeMode="stretch"
                source={require('../../assets/summary-panel.png')}
            />
            <View style={{ width: '100%', padding: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                <CustomizedText style={{ fontSize: font24 }}>Total Amount</CustomizedText>
                <CustomizedText style={{ fontSize: font24 }}>{formatToPeso(totalAmount)}</CustomizedText>
            </View>
            <View style={styles.checkoutButtonContainer}>
                <CustomizedText style={{ fontSize: font24 }}>Checkout</CustomizedText>
                <TouchableOpacity style={styles.checkoutButton} disabled={!totalAmount}>
                    <Animated.View style={{ opacity: fade1 }}>
                        <ChevronRight color="white" />
                    </Animated.View>

                    <Animated.View style={{ opacity: fade2 }}>
                        <ChevronRight color="white" />
                    </Animated.View>

                    <Animated.View style={{ opacity: fade3 }}>
                        <ChevronRight color="white" />
                    </Animated.View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cartSummary: { 
        position: 'relative', 
        width: '100%', 
        height: 250, 
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 20
    },
    checkoutButtonContainer: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderRadius: 50,
        borderWidth: 1,
        marginBottom: 30,
        backgroundColor: '#f0cca1'
    },
    checkoutButton: {
        flexDirection: 'row',
        gap: 5,
        backgroundColor: '#202020',
        padding: 12,
        borderRadius: 50
    }
})