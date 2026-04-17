import { View, Image, StyleSheet, Text } from "react-native"
import Chip from "../ui/Chip"
import CustomizedText from "../ui/Text"
import { useGetVariant } from "@/hooks/Variant/use-get-variant.hook"
import { formatToPeso } from "@/utils/format";
import useResponsiveFontSize from "@/hooks/useResponsiveFont";
import COLOR from "@/lib/contants/color";
import CartSkeleton from "../Cart/CartSkeleton";

export default function CheckoutItem ({ item } : { item : CartItem }) {
    const { data, isFetching } = useGetVariant(item.variant_id);
    const font16 = useResponsiveFontSize(16);
    const font14 = useResponsiveFontSize(14);
 
    if(isFetching) return <CartSkeleton />

    return (
        <View style={styles.checkoutItemContainer}>
            <View style={{ flexDirection: 'row', flex: 1, gap: 10 }}>
                <View style={styles.cartItemImageContainer}>
                    <Image
                        style={styles.image}
                        source={{ uri: item.image }}
                        resizeMode="cover"
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <CustomizedText style={{ fontSize: font16, marginBottom: 5 }} numberOfLines={2}>
                        {data?.variant.product?.product_name}
                    </CustomizedText>
                    <Chip label={data?.variant.variant_name || ""} variant="primary" />
                    <Text style={{ marginTop: 8, fontSize: font16 }}>Price: {formatToPeso(item.price)}</Text>
                </View>
            </View>
            <View style={{ alignItems: 'flex-end', justifyContent: 'flex-start', gap: 3 }}>
                <Text style={[styles.text, { fontSize: font16 }]}>{formatToPeso(item.amount)}</Text>
                <Text style={[styles.text, { fontSize: font14 }]}>Qty: {item.quantity}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    checkoutItemContainer: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start', 
        gap: 30,
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderColor: '#999999',
    },

    cartItemImageContainer: {
        width: 65, 
        height: 65
    },
    
    image: {
         width: '100%', 
         height: '100%', 
    },

    text: {
        fontWeight: 'bold',
    }
})