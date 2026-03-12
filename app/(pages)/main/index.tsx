import { Text, StyleSheet, ScrollView } from "react-native"
import ProductCarousel from "@/components/Home/ProductCarousel";

const Home = () => {

    return (
        <ScrollView>
            <Text style={styles.text}>Most Selling Products</Text>
            <ProductCarousel />
        </ScrollView>
    )
}

export default Home;

const styles = StyleSheet.create({
    text: {
        marginTop: 20,
        marginLeft: 20,
        fontWeight: 'bold',
        width: '100%',
        fontSize: 24,
    }
});