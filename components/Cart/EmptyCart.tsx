import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ShoppingCart } from "lucide-react-native";
import COLOR from "@/lib/contants/color";
import { useRouter } from "expo-router";

export default function EmptyCart() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <ShoppingCart size={80} />

            <Text style={styles.title}>Your cart is empty</Text>

            <Text style={styles.subtitle}>
                Looks like you haven’t added anything yet.
            </Text>

            <TouchableOpacity style={styles.button} onPress={() => router.push('/products')}>
                <Text style={styles.buttonText}>Start Shopping</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        marginTop: 16,
    },
    subtitle: {
        fontSize: 14,
        color: "#777",
        textAlign: "center",
        marginTop: 8,
        marginBottom: 20,
    },
    button: {
        backgroundColor: COLOR.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    buttonText: {
        fontWeight: "600",
        fontSize: 18
    },
});