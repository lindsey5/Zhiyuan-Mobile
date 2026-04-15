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
    const font18 = useResponsiveFontSize(18);
 
    if(isFetching) return <CartSkeleton />

    return (
        <View style={styles.checkoutItemContainer}>
            <View style={styles.cartItemImageContainer}>
                <Image
                    style={{ width: '100%', height: '100%', borderRadius: 40 }}
                    source={{ uri: item.image }}
                    resizeMode="cover"
                />
            </View>
            <View style={{ flex: 1, gap: 5 }}>
                <View>
                    <CustomizedText style={{ fontSize: font16, marginBottom: 5 }} numberOfLines={2}>
                        {data?.variant.product?.product_name}
                    </CustomizedText>
                    <Chip label={data?.variant.variant_name || ""} variant="primary" />
                    <Text style={{ marginTop: 8, fontSize: font16 }}>Price: {formatToPeso(item.price)}</Text>
                </View>
            </View>
            <View style={{ alignItems: 'flex-end'}}>
                <Text style={{ marginTop: 8, fontWeight: 'bold', fontSize: font18 }}>{formatToPeso(item.total_amount)}</Text>
                <Text style={{ marginTop: 8, fontWeight: 'bold', fontSize: font16 }}>{item.quantity}x</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    checkoutItemContainer: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start', 
        gap: 20,
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderColor: '#999999',
    },

    cartItemImageContainer: {
        borderRadius: 40,
        backgroundColor: COLOR.primary,
        padding: 5,
        overflow: 'hidden',
        width: 75, 
        height: 75
    }
})