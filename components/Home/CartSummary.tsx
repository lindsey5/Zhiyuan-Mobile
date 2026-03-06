import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
// Ensure you have run: npx expo install react-native-svg
import Svg, { Path, Rect } from 'react-native-svg'; 

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CartSummary = () => {
    const containerWidth = SCREEN_WIDTH; 
    const h = 100; 
    const r = 40;

    // Precise SVG Path for the "Trapezoid Notch" look
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
        <View style={styles.container}>
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
        <View style={[styles.content, { width: containerWidth }]}>
            <View style={styles.left}>
                <View style={styles.badge}><Text style={styles.badgeText}>4</Text></View>
                <View style={styles.labels}>
                    <Text style={styles.title}>Cart</Text>
                    <Text style={styles.subtitle}>4 items</Text>
                </View>
            </View>

        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F0F4F8',
        justifyContent: 'center',
        alignItems: 'center',
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
        paddingTop: 12, // Offset for the notch dip
    },
    left: { flexDirection: 'row', alignItems: 'center' },
    badge: {
        backgroundColor: 'black',
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
    labels: { marginLeft: 12 },
    title: { fontWeight: '800', fontSize: 20, color: '#000' },
    subtitle: { fontSize: 13, color: '#555', fontWeight: '500' },
    right: { flexDirection: 'row' },
});

export default CartSummary;