 import CartItems from "@/components/Cart/CartItems";
import CartSummary from "@/components/Cart/CartSummary";
import EmptyCart from "@/components/Cart/EmptyCart";
import GradientBackground from "@/components/ui/GradientBackgroud"
import CustomizedText from "@/components/ui/Text"
import useResponsiveFontSize from "@/hooks/useResponsiveFont";
import COLOR from "@/lib/contants/color";
import { useCartStore } from "@/lib/store/cartStore"
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useMemo } from "react";
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Alert } from "react-native"

export default function Page () {
    const font40 = useResponsiveFontSize(40);
    const { cart, clearCart } = useCartStore();
    const router = useRouter();

    const totalAmount = useMemo(() => cart.reduce((acc, item) =>  item.total_amount + acc, 0), [cart])
    
    const confirmClear = () => {
        Alert.alert(
            "Confirm",
            "Are you sure you want to clear your cart?",
            [
                {
                    text: 'No',
                    style: 'cancel',
                    
                },
                {
                    text: 'Yes',
                    onPress: clearCart
                }
            ]
        )
    }

    return (
        <GradientBackground>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <ChevronLeft size={32}/>
                    </TouchableOpacity>
                    <CustomizedText style={[ styles.title, { fontSize: font40 }]}>My Cart</CustomizedText>
                    <View style={styles.cartBadge}>
                        <Text style={styles.cartBadgeText}>{cart.length}</Text>
                    </View>
                </View>
                <ScrollView style={{ marginTop: 50 }}>
                    {cart.length ? 
                        <>
                        <CartItems cart={cart} />
                        <TouchableOpacity onPress={confirmClear} style={{ alignSelf: 'flex-end', marginVertical: 10 }}>
                            <CustomizedText style={{ fontSize: 16, color: 'red' }}>Clear All</CustomizedText>
                        </TouchableOpacity>
                        </>
                        :
                        <EmptyCart />
                    }
                </ScrollView>
                <CartSummary totalAmount={totalAmount} disabled={!cart.length}/>
            </View>
        </GradientBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    header: {
        width: '100%',
        position: 'relative',
        flexDirection: 'row',
        paddingTop: 60,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: { 
        fontWeight: 'bold', 
        textAlign: 'center',
    },
    backButton: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        zIndex: 1,
    },
    cartBadge: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLOR.highlight,
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
        zIndex: 1
    },
    cartBadgeText: {
        fontWeight: 'bold'
    },
    
    cartSummary: { 
        position: 'relative', 
        width: '100%', 
        height: '25%', 
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 10
    }
})