import { categories } from "@/constants/data";
import { ScrollView, StyleSheet} from "react-native";
import TabButton from "./TabButton";

export default function CategoryTab({ selectedCategory, setSelectedCategory }: { selectedCategory: number, setSelectedCategory: (category: number) => void }) {
    return (
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.categoryContainer}
        >
            {categories.map((category, index) => (
                <TabButton 
                    key={index} 
                    label={category} 
                    isSelected={index === selectedCategory} 
                    style={{ marginRight: 10 }} 
                    onPress={() => setSelectedCategory(index)} 
                />
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    category: {
        fontSize: 24,
        marginVertical: 10,
    },
    categoryContainer: {
        marginTop: 40,
        maxHeight: 30,
        flexDirection: 'row',
        paddingHorizontal: 10
    }
})