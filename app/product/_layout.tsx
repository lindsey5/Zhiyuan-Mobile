import MenuButton from "@/components/ui/Menu";
import CustomizedText from "@/components/ui/Text";
import { products } from "@/constants/data";
import { Slot, useLocalSearchParams } from "expo-router";
import { View, StyleSheet } from "react-native";

export default function ProductDetailsLayout () {
    const { id } = useLocalSearchParams();
    const product = products.find(product => product.id === Number(id))

    if(!product) return null
    
    return (
        <View style={styles.container}>
            <CustomizedText style={styles.text}>{product.name}</CustomizedText>
            <MenuButton />

            <Slot />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        paddingTop: 70,
        paddingBottom: 10,
    },
    text: {
        width: '60%',
        fontSize: 30,
        paddingLeft: 20,
    }
});