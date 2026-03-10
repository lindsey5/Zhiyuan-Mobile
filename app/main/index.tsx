import CustomizedText from "@/components/ui/Text";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native"
import { useState } from "react";
import CategoryTab from "@/components/Home/CategoryTab";
import ProductCarousel from "@/components/Home/ProductCarousel";
import CartSummary from "@/components/Home/CartSummary";
import MenuButton from "@/components/ui/Menu";

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState(0);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <CustomizedText style={styles.title}>Paul N Ballin {"\n"}Let's Play</CustomizedText>
            </View>
            <MenuButton />
            <CategoryTab 
                selectedCategory={selectedCategory} 
                setSelectedCategory={setSelectedCategory} 
            />
            <ScrollView style={{ marginTop: 20, flex: 1 }}>
                <ProductCarousel />
            </ScrollView>
            <CartSummary />
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        position: 'relative'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    title: {
        fontSize: 32,
    },
});