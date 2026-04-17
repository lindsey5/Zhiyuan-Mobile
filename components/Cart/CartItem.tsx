import { formatToPeso } from "@/utils/format";
import { useMemo, useRef, useState } from "react";
import { PanResponder, Animated, View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import CustomizedText from "../ui/Text";
import COLOR from "@/lib/contants/color";
import { useCartStore } from "@/lib/store/cartStore";
import { useRouter } from "expo-router";
import CartQuantitySelector from "./CartQuantitySelector";
import { useGetVariant } from "@/hooks/Variant/use-get-variant.hook";
import Chip from "../ui/Chip";
import CartSkeleton from "./CartSkeleton";

export default function SwipeableCartItem({ item, font16 }: { item : CartItem, font16: number }) {
    const { removeItem } = useCartStore();
    const translateX = useRef(new Animated.Value(0)).current;
    const [show, setShow] = useState(false);
    const router = useRouter();
    const { data, isFetching } = useGetVariant(item.variant_id);

    const totalAmount = useMemo(() => {
        return item.quantity * item.price
    }, [item])

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) => {
                return Math.abs(gestureState.dx) > 10;
            },

            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dx < 0) {
                    translateX.setValue(gestureState.dx);
                }

                if(gestureState.dx > 10) setShow(false)
                if(gestureState.dx < -50) setShow(true)
            },

            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dx < -100) {
                    // snap open
                    Animated.timing(translateX, {
                        toValue: -100,
                        duration: 200,
                        useNativeDriver: true,
                    }).start();
                } else {
                    // snap back
                    setShow(false);
                    Animated.timing(translateX, {
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: true,
                    }).start();
                }
            },
        })
    ).current;

    if(isFetching) return <CartSkeleton />

    return (
        <View style={styles.wrapper}>
            
            {/* DELETE BUTTON */}
            {show && (
                <TouchableOpacity style={styles.deleteButton} onPress={() => removeItem(item.variant_id)}>
                    <Text style={{ color: "white", fontWeight: "bold" }}>Remove</Text>
                </TouchableOpacity>
            )}

            {/* SWIPEABLE CONTENT */}
            <Animated.View
                {...panResponder.panHandlers}
                style={[
                    styles.cartItem,
                    { transform: [{ translateX }] }
                ]}
            >
                <View style={{ flexDirection: 'row', flex: 1, gap: 10, alignItems: 'flex-start' }}>
                    
                    <View style={styles.cartItemImageContainer}>
                        <Image
                            style={{ width: '100%', height: '100%' }}
                            source={{ uri: item.image }}
                            resizeMode="cover"
                        />
                    </View>

                    <View style={{ flex: 1, gap: 10 }}>
                        <TouchableOpacity  onPress={() => router.push(`/product/${item.product_id}`)}>
                            <CustomizedText style={{ fontSize: font16, marginBottom: 5 }} numberOfLines={2}>
                                {data?.variant.product?.product_name}
                            </CustomizedText>
                            <Chip label={data?.variant.variant_name || ""} variant="primary" />
                        </TouchableOpacity>
                        <CartQuantitySelector 
                            stock={data?.variant?.stock || 0} 
                            variant_id={data?.variant?._id || ""} 
                            quantity={item.quantity || 0}
                        />
                    </View>

                </View>

                <CustomizedText style={{ fontSize: font16 }}>
                    {formatToPeso(totalAmount)}
                </CustomizedText>
            </Animated.View>

        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        position: 'relative',
        backgroundColor: 'transparent',
        overflow: 'hidden',
    },
    deleteButton: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: 100,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartItem: {
        width: '100%',
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 5,
        gap: 30,
        borderColor: COLOR.border,
        justifyContent: 'space-between',
    },
    cartItemImageContainer: {
        width: 75, 
        height: 75
    }
});