import { View, StyleSheet, Dimensions } from "react-native";
import ReviewCard from "./ReviewCard";
import { getItemWidth } from "@/utils/utils";
import { useGetReviews } from "@/hooks/Review/use-get-reviews.hook";

const screenWidth = Dimensions.get("window").width;

export default function ReviewSection() {

    const { data } = useGetReviews({
        limit: 12,
        page: 1
    });

    let numColumns = 2;

    if (screenWidth > 900) {
        numColumns = 4;
    } else if (screenWidth > 600) {
        numColumns = 3;
    }

    const padding = 10 * 2;
    const gap = 10;

    const itemWidth = (screenWidth - padding - gap * (numColumns - 1)) / numColumns;

    return (
        <View style={{ padding: 10 }}>
            <View style={styles.container}>
            {data?.reviews.map((review) => (
                <View
                    key={review._id}
                    style={{ width: itemWidth}}
                >
                    <ReviewCard review={review}/>
                </View>
            ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
});