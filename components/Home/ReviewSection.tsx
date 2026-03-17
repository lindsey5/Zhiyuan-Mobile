import { View, StyleSheet, Dimensions } from "react-native";
import ReviewCard from "../ui/ReviewCard";
import { reviews } from "@/lib/data/mock-data";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function ReviewSection() {
    const CARD_MIN_WIDTH = 160; 
    const SPACING = 10;

    const numColumns = Math.floor(SCREEN_WIDTH / (CARD_MIN_WIDTH + SPACING));

    const itemWidth =
        (SCREEN_WIDTH - SPACING * (numColumns + 1)) / numColumns;

    return (
        <View style={styles.container}>
        {reviews.map((item) => (
            <View
                key={item.id}
                style={[
                    {
                    width: itemWidth,
                    marginLeft: SPACING,
                    marginBottom: SPACING,
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
    },
});