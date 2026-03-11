import { products } from "@/constants/data";
import { View, StyleSheet, Dimensions } from "react-native";
import ProductCard from "./ProductCard";

const { width: screenWidth } = Dimensions.get("window");

const getItemWidth = (numColumns : number, containerPadding = 20, spacing = 10) => {
  return (screenWidth - containerPadding * 2 - spacing * (numColumns - 1)) / numColumns;
};

export default function ProductList() {
    let numColumns = 2;

    if (screenWidth > 900) {
        numColumns = 4;
    } else if (screenWidth > 600) {
        numColumns = 3;
    }
    const itemWidth = getItemWidth(numColumns);
    
    return (
        <View style={styles.container}>
            {products.map(item => <ProductCard item={item} key={item.id} style={{ width: itemWidth }}/>)}
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