import { View, StyleSheet, Text, ScrollView, TextInput, TouchableOpacity, Image, FlatList, Dimensions } from "react-native";
import ProductCard from "@/components/Products/ProductCard";
import CategoryTab from "./CategoryTab";
import React, { useEffect, useState } from "react";
import { useGetProducts } from "@/hooks/Product/use-get-products.hook";
import { useDebounce } from "@/hooks/useDebounce";
import { Ionicons } from "@expo/vector-icons"; 

const { width } = Dimensions.get('screen');

export default function ProductsScreen() {
    const limit = 20;
    const [page, setPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [search, setSearch] = useState('');
    const searchDebounce = useDebounce(search, 200);
    const [hasMore, setHasMore] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const { data, isLoading } = useGetProducts(page, limit, searchDebounce, selectedCategory === 'All' ? undefined : selectedCategory);

    const getNumColumns = () => {
        if (width > 900) return 4;
        if (width > 600) return 3;
        return 2;
    };

    const numColumns = getNumColumns();

    useEffect(() => {
        setPage(1);
        setHasMore(true);
    }, [searchDebounce, selectedCategory]);

    useEffect(() => {
        if (!data?.products) return;

        page === 1 ? setProducts(data.products) : setProducts(prev => [...prev, ...data.products])

        if (data?.totalPages) setHasMore(page < data.totalPages);
    }, [data, page]);

    const handleLoadMore = () => {
        if (!isLoading && hasMore) {
            setPage(prev => prev + 1);
        }
    };

    return (
        <FlatList 
            key={numColumns}
            style={{ paddingBottom: 150 }}
            data={products}
            keyExtractor={(_, index) => index.toString()}
            onEndReachedThreshold={0.5}
            onEndReached={handleLoadMore}
            renderItem={({ item }) => (
                <View style={[
                    styles.item,
                    { flex: 1 / numColumns, margin: 5 }
                ]}>
                    <ProductCard item={item} key={item.id} />
                </View>
            )}
            columnWrapperStyle={{
                paddingHorizontal: 10
            }}
            numColumns={numColumns}
            ListHeaderComponent={(
                <>
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
                </>
            )}
        />
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
        marginVertical: 20,
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
    item: {
        marginBottom: 15,
    }
});