import React from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    Dimensions,
    ScrollView,
    TouchableWithoutFeedback,
} from "react-native";
import { Check } from "lucide-react-native";
import { useGetCategories } from "@/hooks/Category/use-get-categories.hook";

interface CategorySelectionProps {
    selectedItems: string[];
    handleToggle: (category: string) => void;
}

const { height } = Dimensions.get('screen');

export default function CategorySelection({ selectedItems, handleToggle }: CategorySelectionProps) {
    const { data } = useGetCategories();

    return (
        <>
        <Text style={styles.text}>Category:</Text>

        <TouchableWithoutFeedback>
            <ScrollView style={styles.categoryContainer}>
                {data?.categories?.map(category => (
                    <TouchableOpacity
                        key={category._id}
                        style={styles.category}
                        onPress={() => handleToggle(category.name)}
                    >
                        <Text style={styles.categoryText}>
                            {category.name}
                        </Text>

                        <View
                            style={[
                                styles.checkbox,
                                selectedItems.includes(category.name) && {
                                    backgroundColor: '#000',
                                    borderWidth: 0
                                }
                            ]}
                        >
                            {selectedItems.includes(category.name) && (
                                <Check size={20} color="#fff" />
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </TouchableWithoutFeedback>
        </>
    )
}

const styles = StyleSheet.create({
    text: {
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        fontSize: 16,
        marginVertical: 10
    },
    categoryContainer: {
        width: '100%',
        maxHeight: height * 0.30,
        marginTop: 10,
    },
    category: {
        width: '100%',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    checkbox: {
        width: 25,
        height: 25,
        borderWidth: 1,
        borderColor: "#9e9c9c",
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5
    },
    categoryText: {
        fontSize: 16,
    },
})