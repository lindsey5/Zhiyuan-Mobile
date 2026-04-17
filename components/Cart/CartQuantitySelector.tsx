import useResponsiveFontSize from "@/hooks/useResponsiveFont";
import COLOR from "@/lib/contants/color";
import { useCartStore } from "@/lib/store/cartStore";
import { MinusIcon, PlusIcon } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CartQuantitySelector({
    variant_id,
    stock,
    quantity,
}: {
    variant_id: string;
    quantity: number;
    stock: number;
}) {
    const { decreaseQuantity, increaseQuantity, cart } = useCartStore();
    const cartItem = cart.find((item) => item.variant_id === variant_id);
    const font14 = useResponsiveFontSize(14);

    const handleIncreaseQuantity = () => {
        if ((cartItem?.quantity || 1) < stock) {
            increaseQuantity(variant_id);
        }
    };

    const handleDecreaseQuantity = () => {
        if ((cartItem?.quantity || 0) > 1) {
            decreaseQuantity(variant_id);
        }
    };

    const disableMinus = (cartItem?.quantity || 0) <= 1;
    const disablePlus = (cartItem?.quantity || 0) >= stock;

  return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.btn, disableMinus && styles.disabled, { borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }]}
                onPress={handleDecreaseQuantity}
                disabled={disableMinus}
                activeOpacity={0.7}
            >
                <MinusIcon size={18} color={disableMinus ? "#aaa" : "#000"} />
            </TouchableOpacity>

            <View style={styles.qtyBox}>
                <Text style={[styles.qtyText, { fontSize: font14 }]}>{quantity}</Text>
            </View>

            <TouchableOpacity
                style={[styles.btn, disablePlus && styles.disabled, { borderTopRightRadius: 8, borderBottomRightRadius: 8,}]}
                onPress={handleIncreaseQuantity}
                disabled={disablePlus}
                activeOpacity={0.7}
            >
                <PlusIcon size={18} color={disablePlus ? "#aaa" : "#000"} />
            </TouchableOpacity>
        </View>
    );
    }

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },

    btn: {
        width: 38,
        height: 38,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLOR.highlight,
    },

    qtyBox: {
        width: 45,
        height: 38,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLOR.border,
    },

    qtyText: {
        fontWeight: "700",
        color: "#000",
    },

    disabled: {
        opacity: 0.9,
    },
});