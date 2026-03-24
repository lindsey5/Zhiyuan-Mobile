import { formatToPeso } from "@/utils/format";
import { useRef, useState } from "react";
import { PanResponder, Animated, View, Image, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import CustomizedText from "../ui/Text";
import COLOR from "@/lib/contants/color";
import { useCartStore } from "@/lib/store/cartStore";
import { useRouter } from "expo-router";

const { width : SCREEN_WIDTH } = Dimensions.get('screen');
const max_width = SCREEN_WIDTH * 0.2;

export default function SwipeableCartItem({ item, size, font20, font24 }: { item : CartItem, size: number, font20: number, font24: number}) {
    const { removeItem } = useCartStore();
    const translateX = useRef(new Animated.Value(0)).current;
    const [show, setShow] = useState(false);
    const router = useRouter();

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

    return (
        <View style={styles.wrapper}>
            
            {/* DELETE BUTTON */}
            {show && <TouchableOpacity style={styles.deleteButton} onPress={() => removeItem(item.id)}>
                <Text style={{ color: "white", fontWeight: "bold" }}>Remove</Text>
            </TouchableOpacity>}

            {/* SWIPEABLE CONTENT */}
            <Animated.View
                {...panResponder.panHandlers}
                style={[
                    styles.cartItem,
                    { transform: [{ translateX }] }
                ]}
            >
                <View style={{ flexDirection: 'row', flex: 1, gap: 10, alignItems: 'center' }}>
                    
                    <View style={[styles.cartItemImageContainer, { width: size, height: size }]}>
                        <Image
                            style={{ width: '100%', height: '100%', borderRadius: 40 }}
                            source={{ uri: item.image }}
                            resizeMode="cover"
                        />
                    </View>

                    <View style={{ flex: 1 }}>
                        <TouchableOpacity  onPress={() => router.push(`/product/${item.product_id}`)}>
                            <CustomizedText style={{ fontSize: font24, marginBottom: 5 }} numberOfLines={2}>
                                {item.variant_name}
                            </CustomizedText>
                        </TouchableOpacity>
                        <Text>Price: {formatToPeso(item.price)}</Text>
                        <Text>Quantity: {item.quantity}</Text>
                    </View>

                </View>

                <CustomizedText style={{ fontSize: font20 }}>
                    {formatToPeso(item.amount)}
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
        overflow: 'hidden'
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
        borderColor: '#999999',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cartItemImageContainer: {
        borderRadius: 40,
        backgroundColor: COLOR.primary,
        padding: 5,
        overflow: 'hidden'
    }
});