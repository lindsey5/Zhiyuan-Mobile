import { useCartStore } from "@/lib/store/cartStore";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import CheckoutItem from "./CheckoutItem";
import Button from "../ui/Button";
import { useRouter } from "expo-router";

interface CheckoutSummaryProps{
    
}

export default function CheckoutSummary () {
    const { cart } = useCartStore();
    const router = useRouter();

    return (
        <>
        <ScrollView style={styles.container}>
            {cart.map(item => (
                <CheckoutItem key={item.variant_id} item={item}/>
            ))}
        </ScrollView>
        <View style={{ flexDirection: 'row', gap: 5, paddingHorizontal: 10 }}>
            <Button style={[styles.backButton, styles.button]} onPress={() => router.replace('/cart')}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Back to Cart</Text>
            </Button>
            <Button style={styles.button}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Next</Text>
            </Button>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        paddingHorizontal: 10,
        flex: 1,
    },
    button:{
        flex: 1
    },
    backButton: {
        backgroundColor: '#e0e0e0',
        borderWidth: 1,
        borderColor: '#bdbdbd',
    },
})