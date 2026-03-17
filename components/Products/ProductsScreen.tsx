import { View, StyleSheet, Text, ScrollView, TextInput, TouchableOpacity, Image } from "react-native";
import ProductCard from "@/components/Products/ProductCard";
import CategoryTab from "./CategoryTab";
import React, { useState } from "react";
import { useGetProducts } from "@/hooks/Product/use-get-products.hook";
import { useDebounce } from "@/hooks/useDebounce";
import { Ionicons } from "@expo/vector-icons"; 
import LoadingScreen from "../ui/LoadingScreen";

export default function ProductsScreen() {
    const limit = 20;
    const [page, setPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [search, setSearch] = useState('All');
    const searchDebounce = useDebounce(search, 500);
    const { data, isLoading } = useGetProducts(page, limit, searchDebounce, selectedCategory === 'All' ? undefined : selectedCategory);

    return (
        <ScrollView style={{ flex: 1, marginBottom: 20 }}>
            <View style={styles.inputContainer}>
                <Ionicons name="search" size={20} color="#888" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Search..."
                    placeholderTextColor="#888"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={setSearch}
                    value={search}
                />
            </View>
            <CategoryTab 
                selectedCategory={selectedCategory} 
                setSelectedCategory={setSelectedCategory} 
            />
            <View style={styles.header}>
                <Text style={styles.text}>All Products</Text>
                <TouchableOpacity onPress={() => console.log("Filter pressed")}>
                    <Image 
                        source={require('../../assets/filter.png')}
                        resizeMode="contain"
                        style={{ tintColor: '#eba84a8c', width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            </View>
            {isLoading ? <LoadingScreen /> : (
                <View style={styles.container}>
                    {data?.products.map(item => <ProductCard item={item} key={item.id} />)}
                </View>
            )}
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
    header: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
        marginTop: 20,
        paddingHorizontal: 10,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    inputContainer: {
        flexGrow: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        borderRadius: 25,
        paddingHorizontal: 15,
        height: 45,
        boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
        marginBottom: 20,
        marginHorizontal: 15,
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#000",
    },
});