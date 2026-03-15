import { useCartStore } from "@/lib/store/cartStore";
import { Href, useRouter } from "expo-router";
import { Pressable, View, Text, StyleSheet } from "react-native";
import Badge from "./Badge";

type Item = {
    text: string;
    path: Href;
};

const items : Item[] = [
    { 
        text: "Home",
        path: "/main",
    },
    {
        text: "Products",
        path: "/products",
    },
    {
        text: "Cart",
        path: "/main",
    }
]

export default function MenuItem(){
    const { cart } = useCartStore();
    const router = useRouter();
    
    return (
        <View style={styles.menu}>
            {items.map(item => (
                <Pressable key={item.text} style={styles.item} onPress={() => router.replace(item.path)}>
                    {item.text === 'Cart' && <Badge count={cart.length} style={styles.badge}/>}
                    <Text style={styles.itemText}>{item.text}</Text>
                </Pressable>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    menu: {
        position: "absolute",
        top: "20%",
        right: 20,
    },
    item: { 
        flexDirection: 'row',
        gap: 5,
        marginVertical: 10,
    },
    itemText: {
        fontWeight: "bold",
        fontSize: 16,
    },
    badge: {
        top: '50%',
        right: -5,
        transform: [{ translateY: '-50%' }],
    }
});
