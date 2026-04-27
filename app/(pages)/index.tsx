import { Text, StyleSheet, ScrollView, View, TouchableOpacity } from "react-native";
import ProductCarousel from "@/components/Home/ProductCarousel";
import ImageSlider from "@/components/Home/ImageSlider";
import ReviewSection from "@/components/Review/ReviewSection";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import ReviewModal from "@/components/Review/ReviewModal";

const Home = () => {
    const { review } = useLocalSearchParams();
    const router = useRouter();
    const [openModal, setOpenModal] = useState(review ? true : false);

    return (
        <ScrollView>
            {/* Most Selling */}
            <Text style={styles.sectionTitle}>Most Selling Products</Text>
            <ProductCarousel />

            {/* Slider */}
            <View style={styles.sliderWrapper}>
                <ImageSlider
                images={[
                    require("../../assets/images/image1.jpg"),
                    require("../../assets/images/image1.jpg"),
                    require("../../assets/images/image1.jpg"),
                ]}
                />
            </View>

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
        marginHorizontal: 20,
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
        marginTop: 24,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: "#E8B84A",
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