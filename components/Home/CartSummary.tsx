import { useCartStore } from '@/lib/store/cartStore';
import { useRouter } from 'expo-router';
import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Animated, PanResponder, TouchableOpacity } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg'; 

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SHEET_MAX_HEIGHT = 170;
const SHEET_MIN_HEIGHT = 110;

const CartSummary = () => {
    const { cart } = useCartStore();
    const router = useRouter();

    const animatedValue = useRef(new Animated.Value(SHEET_MIN_HEIGHT)).current;
    const currentHeight = useRef(SHEET_MIN_HEIGHT);

    useEffect(() => {
        const id = animatedValue.addListener(({ value }) => {
        currentHeight.current = value;
        });
        return () => animatedValue.removeListener(id);
    }, [animatedValue]);

    const panResponder = useRef(
        PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dy) > 5,
        onPanResponderMove: (_, gesture) => {
            let newHeight = currentHeight.current - gesture.dy;
            newHeight = Math.max(SHEET_MIN_HEIGHT, Math.min(SHEET_MAX_HEIGHT, newHeight));
            animatedValue.setValue(newHeight);
        },
        onPanResponderRelease: (_, gesture) => {
            if (currentHeight.current >= SHEET_MAX_HEIGHT) {
                // Snap back first
                Animated.spring(animatedValue, {
                toValue: SHEET_MIN_HEIGHT,
                useNativeDriver: false,
                bounciness: 5,
                }).start(() => {
                currentHeight.current = SHEET_MIN_HEIGHT;
                // Navigate after reset completes
                router.push('/products');
                });
            } else {
                // Just snap back if not reached max
                Animated.spring(animatedValue, {
                toValue: SHEET_MIN_HEIGHT,
                useNativeDriver: false,
                bounciness: 5,
                }).start(() => {
                currentHeight.current = SHEET_MIN_HEIGHT;
                });
            }
    },
        })
    ).current;

    const containerWidth = SCREEN_WIDTH - 10; 
    const h = 100; 
    const r = 40;

    const visibleItems = Math.min(cart.length, 4);
    const imageSize = Math.min(50, SCREEN_WIDTH * (0.25 / (visibleItems || 1)));

    const d = `
        M 0,${r} 
        A ${r},${r} 0 0 1 ${r},0 
        H ${containerWidth * 0.28} 
        L ${containerWidth * 0.40} 25 
        H ${containerWidth * 0.60} 
        L ${containerWidth * 0.72} 0 
        H ${containerWidth - r} 
        A ${r},${r} 0 0 1 ${containerWidth},${r} 
        V ${h - r} 
        A ${r},${r} 0 0 1 ${containerWidth - r},${h} 
        H ${r} 
        A ${r},${r} 0 0 1 0,${h - r} 
        Z
    `;

    return (
        <Animated.View
        style={[styles.container, { height: animatedValue }]}
        {...panResponder.panHandlers}
        >
        <View style={[styles.svgWrapper, { width: containerWidth }]}>
            <Svg height={h} width={containerWidth} viewBox={`0 0 ${containerWidth} ${h}`}>
            <Path d={d} fill="#D9B991" /> 
            <Rect 
                x={(containerWidth / 2) - 25}
                y={15}
                width={50}
                height={4}
                rx={2}
                fill="#C4A47A"
            />
            </Svg>
        </View>

        <TouchableOpacity 
            onPress={() => router.push('/products')} 
            style={[styles.content, { width: containerWidth }]}
        >
            <View style={styles.left}>
            <View style={styles.badge}>
                <Text style={styles.badgeText}>{cart.length}</Text>
            </View>
            <View style={styles.labels}>
                <Text style={styles.title}>Cart</Text>
                <Text style={styles.subtitle}>{cart.length} items</Text>
            </View>
            </View>

            <View style={styles.cartItemsImageContainer}>
            {cart.slice(0, 4).map((item, index) => (
                <View
                key={item.id}
                style={[
                    styles.cartItemImageContainer,
                    {
                    width: imageSize,
                    height: imageSize,
                    borderRadius: imageSize / 2,
                    marginLeft: index === 0 ? 0 : 6,
                    }
                ]}
                >
                <Image 
                    source={typeof item.image === "string" ? { uri: item.image } : item.image}
                    resizeMode="cover"
                    style={[ styles.cartImage, { borderRadius: imageSize / 2 } ]}
                />
                </View>
            ))}
            </View>
        </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#F0F4F8',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    svgWrapper: {
        position: 'absolute',
    },
    content: {
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingTop: 12,
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    badge: {
        backgroundColor: 'black',
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    labels: {
        marginLeft: 12
    },
    title: {
        fontWeight: '800',
        fontSize: 20,
        color: '#000'
    },
    subtitle: {
        fontSize: 13,
        color: '#555',
        fontWeight: '500'
    },
    cartItemsImageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cartItemImageContainer: {
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden', 
    },
    cartImage: {
        width: '100%',
        height: '100%',
    }
});

export default CartSummary;