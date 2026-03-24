import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import COLOR from "@/lib/contants/color";

type ReviewCardProps = {
    name: string;
    rating: number;
    date: string;
    comment: string;
};

export default function ReviewCard({
    name,
    rating,
    date,
    comment,
}: ReviewCardProps) {
    return (
        <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>

            <View style={styles.info}>
            <Text style={styles.name}>{name}</Text>

            {/* Stars */}
            <View style={styles.stars}>
                {[...Array(5)].map((_, i) => (
                <FontAwesome
                    key={i}
                    name={i < rating ? "star" : "star-o"}
                    size={14}
                    color={COLOR.highlight}
                />
                ))}
            </View>
            </View>

            <Text style={styles.date}>{date}</Text>
        </View>

        {/* Comment */}
        <Text style={styles.comment}>{comment}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#F5F5F5",
        borderRadius: 16,
        padding: 14,
        marginBottom: 12,
        flex: 1,
        boxShadow: "0px 2px 5px rgba(0,0,0,0.3)",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    info: {
        flex: 1,
    },
    name: {
        fontWeight: "600",
        fontSize: 14,
    },
    stars: {
        flexDirection: "row",
        marginTop: 2,
    },
    date: {
        fontSize: 11,
        color: "#888",
    },
    comment: {
        fontSize: 12,
        color: "#666",
        lineHeight: 18,
    },
});