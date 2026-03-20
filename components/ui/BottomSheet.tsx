import { useRef } from "react";
import {
    Modal,
    View,
    StyleSheet,
    Animated,
    PanResponder,
    Dimensions,
    Pressable,
    TouchableOpacity,
} from "react-native";

const { height } = Dimensions.get('screen');

interface BottomSheetProps {
    onRelease: () => void;
    content: React.ReactNode;
    visible: boolean;
}

export default function BottomSheet ({ onRelease, content, visible } : BottomSheetProps) {
    const translateY = useRef(new Animated.Value(0)).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) => {
                return Math.abs(gestureState.dy) > 5;
            },

            onStartShouldSetPanResponder: () => false,

            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dy > 0) {
                    translateY.setValue(gestureState.dy);
                }
            },

            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dy > 100) {
                    Animated.timing(translateY, {
                        toValue: height,
                        duration: 200,
                        useNativeDriver: true,
                    }).start(() => {
                        onRelease();
                        translateY.setValue(0);
                    });
                } else {
                    Animated.spring(translateY, {
                        toValue: 0,
                        useNativeDriver: true,
                    }).start();
                }
            }
        })
    ).current;

    return (
        <Modal visible={visible} animationType="fade" transparent>
            <View style={styles.overlay}>
                <Animated.View
                    style={{ transform: [{ translateY }] }}
                    {...panResponder.panHandlers}
                >
                    <Pressable style={styles.container}>
                    {content}
                    </Pressable>
                </Animated.View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'flex-end',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    container: {
        backgroundColor: '#F4E1C6',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        alignItems: 'center',
    },
});