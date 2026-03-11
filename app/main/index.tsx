import CustomizedText from "@/components/ui/Text";
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { useState } from "react";
import CategoryTab from "@/components/Home/CategoryTab";
import ProductCarousel from "@/components/Home/ProductCarousel";
import CartSummary from "@/components/Home/CartSummary";
import MenuButton from "@/components/ui/Menu";
import ProductList from "@/components/ui/ProductList";

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState(0);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <CustomizedText style={styles.title}>Paul N Ballin {"\n"}Let's Play</CustomizedText>
            </View>
            <MenuButton />
            <ScrollView style={{ flex: 1 }}>
                <Text style={styles.text}>Most Selling Products</Text>
                <ProductCarousel />
                <Text style={styles.text}>All Products</Text>
                <CategoryTab 
                    selectedCategory={selectedCategory} 
                    setSelectedCategory={setSelectedCategory} 
                />
                <ProductList />
            </ScrollView>
            <CartSummary />
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: { 
        flex: 2, 
        position: 'relative',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 10,
    },
    title: {
        fontSize: 32,
    },
    text: {
        fontSize: 24,
        marginTop: 20,
        marginLeft: 20,
        fontWeight: 'bold',
        width: '100%'
    }
});