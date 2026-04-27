import { View, StyleSheet, Text, TextInput, FlatList, Dimensions, ActivityIndicator } from "react-native";
import ProductCard from "@/components/Products/ProductCard";
import React, { useEffect, useState } from "react";
import { useGetProducts } from "@/hooks/Product/use-get-products.hook";
import { useDebounce } from "@/hooks/useDebounce";
import { Ionicons } from "@expo/vector-icons"; 
import SortMenu from "./SortMenu";
import Filter from "./Filter";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { getItemWidth } from "@/utils/utils";

const { width } = Dimensions.get('screen');

export default function ProductsScreen() {
    const limit = 5;
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const searchDebounce = useDebounce(search, 200);
    const [hasMore, setHasMore] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [filter, setFilter] = useState<{ categories: string[], minValue?: number, maxValue?: number}>({
        categories: [],
        minValue: undefined,
        maxValue: undefined,
    });
    const [sortBy, setSortBy] = useState<{sortBy: string, order: 'ASC' | 'DESC'}>({ sortBy: 'product_name', order: 'ASC'});
    const { data, isFetching } = useGetProducts(page, limit, sortBy, filter, searchDebounce);
    const skeletonData = Array.from({ length: 6 }).map((_, index) => ({ _id: `skeleton-${index}` }));

    const getNumColumns = () => {
        if (width > 900) return 4;
        if (width > 600) return 3;
        return 2;
    };

    const numColumns = getNumColumns();

    const padding = 10 * 2;
    const gap = 10;

    const itemWidth = (width - padding - gap * (numColumns - 1)) / numColumns;

    useEffect(() => {
        setPage(1);
        setHasMore(true);
    }, [searchDebounce]);

    useEffect(() => {
        if (!data?.products) return;

        page === 1 ? setProducts(data.products) : setProducts(prev => [...prev, ...data.products]);
        if (data.totalPages) setHasMore(page < data.totalPages);
    }, [data, page]);

    const handleLoadMore = () => {
        if (!isFetching && hasMore) setPage(prev => prev + 1);
    };


    return (
        <FlatList<Product | { _id: string }>
            key={numColumns}
            style={{ paddingBottom: 150 }}
            data={products}
            keyExtractor={(item, index) => item._id || index.toString()}
            onEndReachedThreshold={0.5}
            onEndReached={handleLoadMore}
            renderItem={({ item }) => (
                <View style={[styles.item, { flex: 1 / numColumns, margin: 5 }]}>
                    <ProductCard item={item as Product} />
                </View>
            )}
            columnWrapperStyle={{ paddingHorizontal: 10 }}
            numColumns={numColumns}
            ListHeaderComponent={(
                <>
                <View style={styles.header}>
                    <SortMenu setSortBy={setSortBy} />
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
                    <Filter setFilter={setFilter} setPage={setPage}/>
                </View>
                <Text style={styles.text}>All Products</Text>
                </>
            )}
            ListFooterComponent={() => (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, paddingHorizontal: 10 }}>
                {isFetching && skeletonData.map((_, i) => (
                    <View style={[styles.item, { width: itemWidth }]}>
                        <ProductCardSkeleton key={i}/>
                    </View>
                ))}
                </View>
            )}
            ListEmptyComponent={() => (
                !isFetching && products.length < 1 &&  (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No Products Found</Text>
                    </View>
                )
            )}
        />
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        paddingHorizontal: 10,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 10
    },
    inputContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        borderRadius: 25,
        paddingHorizontal: 15,
        height: 45,
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
    },
    emptyContainer: {
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#888',
    },
});