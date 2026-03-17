import { View, StyleSheet, Text, ScrollView } from "react-native";
import ProductCard from "@/components/Products/ProductCard";
import CategoryTab from "@/components/Home/CategoryTab";
import { useState } from "react";
import { useGetProducts } from "@/hooks/Product/use-get-products.hook";
import { useDebounce } from "@/hooks/useDebounce";

export default function ProductsScreen() {
    const [search, setSearch] = useState('');
    const searchDebounce = useDebounce(search, 500);
    const [page, setPage] = useState(1);
    const { data, isLoading } = useGetProducts(page, 20, searchDebounce);

    const [selectedCategory, setSelectedCategory] = useState(0);

    return (
        <ScrollView style={{ flex: 1, marginBottom: 20 }}>
            <Text style={styles.text}>All Products</Text>
            <CategoryTab 
                selectedCategory={selectedCategory} 
                setSelectedCategory={setSelectedCategory} 
            />
            <View style={styles.container}>
                {data?.products.map(item => <ProductCard item={item} key={item.id} />)}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        padding: 20
    },
    text: {
        fontSize: 24,
        marginVertical: 20,
        marginLeft: 20,
        fontWeight: 'bold',
        width: '100%'
    }
});