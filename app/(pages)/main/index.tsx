import { Text, StyleSheet, ScrollView } from "react-native"
import ProductCarousel from "@/components/Home/ProductCarousel";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GradientBackground from "@/components/ui/GradientBackgroud";

const queryClient = new QueryClient();

const Home = () => {

    return (
        <QueryClientProvider client={queryClient}>
            <GradientBackground>
                <ScrollView>
                    <Text style={styles.text}>Most Selling Products</Text>
                    <ProductCarousel />
                </ScrollView>
            </GradientBackground>
        </QueryClientProvider>
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