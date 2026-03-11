import { Pressable, View, Text, StyleSheet } from "react-native";

export default function MenuItem(){
    return (
        <View style={styles.menu}>
            <Pressable style={styles.item}>
                <Text style={styles.itemText}>Home</Text>
            </Pressable>
            <Pressable style={styles.item}>
                <Text style={styles.itemText}>Products</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    menu: {
        position: "absolute",
        top: 130,
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
        textDecorationLine: 'underline'
    },
});
