import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { CheckCircle } from 'lucide-react-native';
import COLOR from '@/lib/contants/color';

interface SuccessCardProps {
  visible: boolean;
  message: string;
  onClose: () => void;
  duration?: number; 
}

const { width } = Dimensions.get('window');

const SuccessCard: React.FC<SuccessCardProps> = ({ visible, message, onClose, duration = 2000 }) => {
    const slideAnim = useRef(new Animated.Value(50)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    const resetAnimation = () => {
        slideAnim.setValue(50);
        opacityAnim.setValue(0);
    };

    useEffect(() => {
        if (visible) {
        // Animate in
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();

        // Auto-hide
        const timer = setTimeout(() => {
            Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: 50,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            ]).start(() => {
                resetAnimation();
                onClose();
            });
        }, duration);

        return () => clearTimeout(timer);
        }
    }, [visible]);

    if (!visible) return null;

    return (
        <View style={styles.overlay}>
        <Animated.View
            style={[
            styles.card,
            {
                opacity: opacityAnim,
                transform: [{ translateY: slideAnim }],
            },
            ]}
        >
            <CheckCircle size={48} color={COLOR.highlight} />

            <Text style={styles.message}>{message}</Text>

        </Animated.View>
        </View>
    );
    };

    const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    },
    card: {
        width: width * 0.7,
        maxWidth: 400,
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingVertical: 25,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    message: {
        fontSize: 18,
        fontWeight: '600',
        color: '#E8B84A',
        textAlign: 'center',
        marginVertical: 15,
    },
    closeText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default SuccessCard;