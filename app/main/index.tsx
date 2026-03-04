import CustomizedText from "@/components/ui/Text";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native"
import { Menu, Scroll } from "lucide-react-native";
import { useState } from "react";
import CategoryTab from "@/components/Home/CategoryTab";
import ProductScreen from "@/components/Home/ProductScreen";

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState(0);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <CustomizedText style={styles.title}>Paul N Ballin {"\n"}Let's Play</CustomizedText>
                <TouchableOpacity>
                    <Menu color="rgba(235, 168, 74, 0.55)" />
                </TouchableOpacity>
            </View>
            <CategoryTab 
                selectedCategory={selectedCategory} 
                setSelectedCategory={setSelectedCategory} 
            />
            <ScrollView style={{ marginTop: 20, flex: 1 }}>
                <ProductScreen />
            </ScrollView>
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        paddingHorizontal: 20,
        paddingTop: 60
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
    },
});