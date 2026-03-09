import { Pressable, View, Text, StyleSheet } from "react-native";

export default function MenuItem(){
    return (
        <View style={styles.menu}>
            <Pressable>
                <Text style={styles.item}>Home</Text>
            </Pressable>
            <Pressable>
                <Text style={styles.item}>Products</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    menu: {
        position: "absolute",
        top: "22%",
        right: 50,
    },
    item: {
        marginVertical: 10,
        fontWeight: "bold",
        fontSize: 18,
    },
});