import { ArrowUpDown } from "lucide-react-native";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import {
    Modal,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Animated,
    PanResponder,
    Dimensions,
} from "react-native";

type SortOption = {
    sortBy: string;
    order: 'ASC' | 'DESC';
};

const options: Record<string, SortOption> = {
    'A-Z': { sortBy: 'product_name', order: 'ASC' },
    'Z-A': { sortBy: 'product_name', order: 'DESC' },
    'Newest': { sortBy: 'createdAt', order: 'DESC' },
    'Oldest': { sortBy: 'createdAt', order: 'ASC' },
    'Price: High to low': { sortBy: 'price', order: 'DESC' },
    'Price: Low to high': { sortBy: 'price', order: 'ASC' }
};

const { height } = Dimensions.get('screen');

export default function SortMenu({
    setSortBy,
}: {
    setSortBy: Dispatch<SetStateAction<{ sortBy: string, order: 'ASC' | 'DESC' }>>
}) {
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState<string>('A-Z');

    const translateY = useRef(new Animated.Value(0)).current;

    const applySort = () => {
        setSortBy(options[selected]);
        setVisible(false);
    };

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) => {
                return Math.abs(gestureState.dy) > 5;
            },

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
                        setVisible(false);
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
        <>
            <TouchableOpacity onPress={() => setVisible(true)}>
                <ArrowUpDown color={"#eba84a8c"} size={24} strokeWidth={2} />
            </TouchableOpacity>

            <Modal visible={visible} animationType="fade" transparent>
                <View style={styles.overlay}>
                    <Animated.View
                        style={[
                            styles.container,
                            { transform: [{ translateY }] }
                        ]}
                        {...panResponder.panHandlers}
                    >
                        <View style={styles.dragHandle} />

                        {Object.entries(options).map(([key]) => (
                            <TouchableOpacity
                                key={key}
                                style={styles.option}
                                onPress={() => setSelected(key)}
                            >
                                <Text>{key}</Text>
                                <View style={styles.radioOuter}>
                                    {selected === key && <View style={styles.radioInner} />}
                                </View>
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity
                            style={styles.applyBtn}
                            onPress={applySort}
                        >
                            <Text style={styles.applyText}>Apply</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'flex-end',
        padding: 5,
    },
    container: {
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        alignItems: 'center',
    },
    dragHandle: {
        width: 60,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#ccc',
        marginBottom: 10,
    },
    option: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    radioOuter: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 1,
        borderColor: '#999',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#000',
    },
    applyBtn: {
        width: '100%',
        marginTop: 15,
        backgroundColor: '#f190078c',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    applyText: {
        fontWeight: '600',
    },
});