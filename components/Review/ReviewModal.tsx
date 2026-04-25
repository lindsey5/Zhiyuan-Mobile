import { useCreateReview } from "@/hooks/Review/use-create-review.hook";
import COLOR from "@/lib/contants/color";
import { useLocalSearchParams } from "expo-router";
import { Star } from "lucide-react-native";
import { Dispatch, SetStateAction, useState, useRef, useEffect, useMemo } from "react";
import { Modal, StyleSheet, View, Text, TouchableOpacity, TextInput, Animated } from "react-native";

interface ReviewModalProps {
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
}

export default function ReviewModal ({ visible, setVisible } : ReviewModalProps) {
    const { name : nameState } = useLocalSearchParams();
    const [rating, setRating] = useState(0);
    const [name, setName] = useState(nameState ? String(nameState) : "");
    const [review, setReview] = useState("");
    const scaleAnim = useRef(new Animated.Value(0.9)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    const createReviewMutation = useCreateReview();

    const handleSubmit = async () => {
        const response = await createReviewMutation.mutateAsync({ data: { name, review, rating }})
    
        if(response.success){
            setVisible(false)
        }
    };
    
    const nameExceeded = useMemo(() =>  name.length > 100, [name]);
    const reviewExceeded = useMemo(() => review.length > 200, [review]);
    
    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true
                })
            ]).start();
        } else {
            scaleAnim.setValue(0.9);
            opacityAnim.setValue(0);
        }
    }, [visible]);
    return (
        <Modal
            visible={visible}
            transparent={true}
            onRequestClose={() => setVisible(false)}
        >
        <View
            style={styles.container}
        >
            <Animated.View
                style={[
                    styles.card,
                    {
                        transform: [{ scale: scaleAnim }],
                        opacity: opacityAnim
                    }
                ]}
            >
                {/* Header */}
                <Text style={styles.title}>Leave a Review</Text>

                {/* Content */}
                <Text style={styles.subtitle}>
                    How was your experience?
                </Text>
                <View style={styles.ratingRow}>
                    {Array.from({ length: 5}).map((_, index) => (
                        <TouchableOpacity onPress={() => setRating(index + 1)}>
                            <Star
                                size={40}
                                color={index + 1 <= rating ? COLOR.accent : COLOR.muted}
                                fill={index + 1 <= rating ? COLOR.accent : "transparent"}
                            />
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.label}>Name</Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your name"
                    placeholderTextColor={COLOR.muted}
                    style={[styles.input, nameExceeded && styles.inputError]}
                />
                <Text style={styles.counter}>{name.length}/100</Text>

                <TextInput
                    value={review}
                    onChangeText={setReview}
                    placeholder="Write your review..."
                    placeholderTextColor={COLOR.muted}
                    multiline
                    numberOfLines={4}
                   style={[styles.textArea, reviewExceeded && styles.inputError]}
                />
                <Text style={styles.counter}>{review.length}/200</Text>

                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={[styles.button, styles.cancelBtn]}
                        onPress={() => setVisible(false)}
                    >
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.button, 
                            styles.submitBtn, 
                            (!name || !review || !rating || nameExceeded || reviewExceeded) && styles.disabledBtn 
                        ]}
                        onPress={handleSubmit}
                        disabled={!name || !review || !rating}
                    >
                        <Text style={styles.submitText}>Submit</Text>
                    </TouchableOpacity>

                </View>
            </Animated.View>
        </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 1,
    },
    card: {
        width: "85%",
        maxWidth: 500,
        backgroundColor: COLOR.panel,
        borderRadius: 12,
        padding: 20,
        borderWidth: 1,
        borderColor: COLOR.border
    },

    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLOR.primary,
        marginBottom: 8
    },

    subtitle: {
        fontSize: 14,
        color: COLOR.muted,
        marginBottom: 15
    },

    ratingRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20
    },

    label: {
        fontSize: 13,
        fontWeight: "600",
        color: COLOR.muted,
        marginBottom: 6
    },

    input: {
        borderWidth: 1,
        borderColor: COLOR.border,
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        backgroundColor: "#fff",
        color: "#000"
    },

    textArea: {
        height: 100,
        borderWidth: 1,
        borderColor: COLOR.border,
        borderRadius: 8,
        padding: 10,
        textAlignVertical: "top",
        backgroundColor: "#fff",
        color: "#000",
        marginBottom: 10
    },

    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10
    },

    button: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
        marginHorizontal: 5
    },

    cancelBtn: {
        backgroundColor: "#ddd"
    },

    submitBtn: {
        backgroundColor: COLOR.accent
    },

    cancelText: {
        color: "#333",
        fontWeight: "500"
    },

    submitText: {
        color: "#fff",
        fontWeight: "600"
    },

    counter: {
        fontSize: 12,
        color: COLOR.muted,
        alignSelf: "flex-end",
        marginBottom: 10
    },

    inputError: {
        borderColor: "red"
    },

    disabledBtn: {
        opacity: 0.5
    },
})