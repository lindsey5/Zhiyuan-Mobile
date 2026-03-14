import CartSummary from "@/components/Home/CartSummary";
import MenuButton from "@/components/ui/Menu";
import { Slot, usePathname } from "expo-router";
import { View, Image, StyleSheet } from "react-native";

export default function Layout () {
    const pathname = usePathname();

    const hideLayout = pathname.includes("productDetails");

    return (
         <View style={styles.container}>
            {!hideLayout && (
              <View style={styles.header}>
                <Image 
                    style={{ width: 70, height: 70 }}
                    resizeMode="contain"
                    source={require('../../assets/logo.jpg')}
                />
              </View>
            )}

            {!hideLayout && <MenuButton />}

            <Slot />

            {!hideLayout && <CartSummary />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        position: 'relative',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        gap: 10,
        paddingTop: 50,
        paddingBottom: 10,
    },
    headertext: {
        fontWeight: 'bold',
        fontSize: 20
    },
    text: {
        marginTop: 20,
        marginLeft: 20,
        fontWeight: 'bold',
        width: '100%',
        fontSize: 24,
    }
});