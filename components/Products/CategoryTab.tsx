import { CATEGORIES } from "@/lib/data/contants";
import { ScrollView, StyleSheet} from "react-native";
import TabButton from "./TabButton";

export default function CategoryTab({ selectedCategory, setSelectedCategory }: { selectedCategory: string, setSelectedCategory: (category: string) => void }) {
    return (
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.categoryContainer}
        >
            {CATEGORIES.map((category, index) => (
                <TabButton 
                    key={index} 
                    label={category} 
                    isSelected={category === selectedCategory} 
                    style={{ marginRight: 10 }} 
                    onPress={() => setSelectedCategory(category)} 
                />
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    category: {
        fontSize: 24,
    },
    categoryContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10
    }
})