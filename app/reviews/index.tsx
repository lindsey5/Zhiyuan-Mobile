import ReviewCard from "@/components/Review/ReviewCard";
import Pagination from "@/components/ui/Pagination";
import { useGetReviews } from "@/hooks/Review/use-get-reviews.hook";
import COLOR from "@/lib/contants/color";
import { useState } from "react";
import { Dimensions, View, StyleSheet, TouchableOpacity, Text, ScrollView, ActivityIndicator } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function Page () {
    const [page, setPage] = useState(1);
    const [rating, setRating] = useState(0);

    const { data, isFetching } = useGetReviews({
        limit: 20,
        page,
        rating
    });

    let numColumns = 1;

    if (screenWidth > 900) {
        numColumns = 4;
    } else if (screenWidth > 600) {
        numColumns = 3;
    } else if (screenWidth > 400) {
        numColumns = 2;
    }

    const padding = 10 * 2;
    const gap = 5;

    const itemWidth = (screenWidth - padding - gap * (numColumns - 1)) / numColumns;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Reviews</Text>
                <Text style={styles.eyebrow}>Customer feedback</Text>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.filterScroll}
                contentContainerStyle={styles.filterRow}
            >

                {[0, 5, 4, 3, 2, 1].map((r) => (
                    <TouchableOpacity
                        key={r}
                        onPress={() => {
                            setRating(r);
                            setPage(1);
                        }}
                        style={[styles.pill, rating === r && styles.pillActive]}
                        activeOpacity={0.7}
                    >
                        <Text
                        style={[
                            styles.pillText,
                            rating === r && styles.pillTextActive,
                        ]}
                        >
                        {r === 0 ? "All" : `${r} ★`}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.reviewsContainer}>
                {data?.reviews.map(review => (
                    <View key={review._id} style={{ width: itemWidth }}>
                        <ReviewCard review={review}/>
                    </View>
                ))}
            </View>
            {isFetching && (
                <View style={styles.center}>
                <ActivityIndicator size="large" color={COLOR.highlight} />
                </View>
            )}
            {!isFetching && data?.reviews.length === 0 && (
                <Text style={styles.empty}>No reviews found</Text>
            )}
            {!isFetching && (data?.reviews.length || 0) > 0 && (
                <Pagination
                    page={page}
                    totalPages={data?.totalPages || 1}
                    onChange={(p) => setPage(p)}
                />
            )}
            <View style={{ height: 150 }}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },

    filterScroll: {
        marginBottom: 20,
    },

    header: {
        marginBottom: 20,
        gap: 5
    },
    eyebrow: {
        fontSize: 11,
        letterSpacing: 0.8,
        textTransform: "uppercase",
        color: "#747474",
        marginBottom: 4,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#111",
        letterSpacing: -0.3,
    },

    filterRow: {
        flexDirection: "row",
        gap: 6,
        paddingBottom: 2,
    },

    pill: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 999,
        backgroundColor: "#EFEFED",
    },

    pillActive: {
        backgroundColor: COLOR.accent,
    },

    pillText: {
        fontSize: 13,
        color: "#777",
        fontWeight: "400",
    },

    pillTextActive: {
        color: "#fff",
        fontWeight: "500",
    },

    reviewsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },

    center: {
        marginVertical: 40,
        alignItems: "center",
    },

    empty: {
        textAlign: "center",
        marginTop: 40,
        color: "#aaa",
        fontSize: 14,
    },
});