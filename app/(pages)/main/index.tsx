import { View, Text, StyleSheet } from "react-native"
import ProductCarousel from "@/components/Home/ProductCarousel";

const Home = () => {

    return (
        <>
            <Text style={styles.text}>Most Selling Products</Text>
            <ProductCarousel />
        </>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
    },
    text: {
        marginTop: 20,
        marginLeft: 20,
        fontWeight: 'bold',
        width: '100%',
        fontSize: 24,
    }
});