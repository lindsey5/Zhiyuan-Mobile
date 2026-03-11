import { products } from "@/constants/data";
import { View, StyleSheet } from "react-native";
import ProductCard from "./ProductCard";

export default function ProductList() {
    return (
        <View style={styles.container}>
            {products.map(item => <ProductCard item={item} key={item.id} />)}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    padding: 20
  },
});