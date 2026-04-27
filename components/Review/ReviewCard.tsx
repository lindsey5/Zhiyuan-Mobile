import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import COLOR from "@/lib/contants/color";
import { formatDate } from "@/utils/format";

type ReviewCardProps = {
    review: Review;
};

export default function ReviewCard({ review }: ReviewCardProps) {
    return (
        <View style={styles.card}>
        {/* Top: name + stars */}
        <View style={styles.top}>
            <Text style={styles.name} numberOfLines={1}>
            {review.name}
            </Text>
            <View style={styles.stars}>
            {[...Array(5)].map((_, i) => (
                <FontAwesome
                key={i}
                name={i < review.rating ? "star" : "star-o"}
                size={11}
                color={i < review.rating ? COLOR.accent : "#DDD"}
                />
            ))}
            </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Comment */}
        <Text style={styles.comment} numberOfLines={4}>
            {review.review}
        </Text>

        {/* Footer */}
        <View style={styles.footer}>
            <Text style={styles.date}>{formatDate(review.createdAt)}</Text>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 14,
        flex: 1,
        borderWidth: 0.5,
        borderColor: "#E8E8E4",
        gap: 10,
        margin: 5
    },

    /* TOP */
    top: {
        gap: 5,
    },
    name: {
        fontSize: 13,
        fontWeight: "500",
        color: "#111",
    },
    stars: {
        flexDirection: "row",
        gap: 2,
    },

    /* DIVIDER */
    divider: {
        height: 0.5,
        backgroundColor: "#E8E8E4",
    },

    /* COMMENT */
    comment: {
        fontSize: 12,
        color: "#666",
        lineHeight: 19,
        flex: 1,
    },

    /* FOOTER */
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "auto",
    },
    date: {
        fontSize: 10,
        color: "#AAA",
        letterSpacing: 0.2,
    },
});