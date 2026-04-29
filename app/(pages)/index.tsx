import { Text, StyleSheet, ScrollView, View, TouchableOpacity } from "react-native";
import NewProductsCarousel from "@/components/Home/NewProductsCarousel";
import ReviewSection from "@/components/Review/ReviewSection";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import ReviewModal from "@/components/Review/ReviewModal";
import COLOR from "@/lib/contants/color";
import BestSellingProductsCarousel from "@/components/Home/BestSellingProducts";

const Home = () => {
    const { review } = useLocalSearchParams();
    const router = useRouter();
    const [openModal, setOpenModal] = useState(review ? true : false);

    return (
        <ScrollView>
            <BestSellingProductsCarousel />

            {/* New Products */}
            <NewProductsCarousel />

            {/* Reviews */}
            <Text style={[styles.sectionTitle, { marginVertical: 20 }]}>Recent Reviews</Text>
            <ReviewSection />

            {/* Button */}
            <TouchableOpacity 
                style={styles.button} 
                activeOpacity={0.8}
                onPress={() => router.push('/reviews')}
            >
                <Text style={styles.buttonText}>View All Reviews</Text>
            </TouchableOpacity>
            <View style={{ height: 150 }}/>

            <ReviewModal 
                setVisible={setOpenModal}
                visible={openModal}
            />
        </ScrollView>
    );
};

export default Home;

const styles = StyleSheet.create({
    sectionTitle: {
        marginTop: 24,
        paddingHorizontal: 10,
        fontSize: 22,
        fontWeight: "700",
        color: "#1a1a1a",
    },

    sliderWrapper: {
        marginTop: 16,
    },

    button: {
        width: "90%",
        alignSelf: "center",
        marginTop: 10,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: COLOR.accent,
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0px 2px 5px rgba(0,0,0,0.3)",
    },

    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});