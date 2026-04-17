import COLOR from "@/lib/contants/color";
import { View, StyleSheet } from "react-native";

export default function CartSkeleton () {
    return (
        <View style={styles.wrapper}>
            <View style={styles.cartItem}> 
                <View style={styles.cartItemImageContainer} />
                <View style={{ flex: 1, flexDirection: 'column', gap: 10 }}>
                    <View style={{ width: '100%', height: 30,  backgroundColor: COLOR.skeleton,}} />
                    <View style={{ width: '100%', height: 25,  backgroundColor: COLOR.skeleton,}} />
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        position: 'relative',
        backgroundColor: 'transparent',
        overflow: 'hidden'
    },
    cartItem: {
        width: '100%',
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 5,
        gap: 20,
        borderColor: '#999999',
        justifyContent: 'space-between',
    },
    cartItemImageContainer: {
        padding: 5,
        overflow: 'hidden',
        backgroundColor: COLOR.skeleton,
        width: 75, 
        height: 75
    }
});