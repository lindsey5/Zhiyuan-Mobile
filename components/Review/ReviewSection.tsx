import { View, StyleSheet, Dimensions } from "react-native";
import ReviewCard from "../ui/ReviewCard";
import { reviews } from "@/lib/data/mock-data";
import { getItemWidth } from "@/utils/utils";

const screenWidth = Dimensions.get("window").width;

export default function ReviewSection() {
    let numColumns = 2;

    if (screenWidth > 900) {
        numColumns = 4;
    } else if (screenWidth > 600) {
        numColumns = 3;
    }

    const itemWidth = getItemWidth(screenWidth, numColumns);

    return (
        <View style={styles.container}>
        {reviews.map((item) => (
            <View
                key={item.id}
                style={[
                    {
                    width: itemWidth,
                    },
                ]}
            >
                <ReviewCard
                    name={item.name}
                    rating={item.rating}
                    date={item.date}
                    comment={item.comment}
                />
            </View>
        ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 10,
        gap: 10,
    },
});