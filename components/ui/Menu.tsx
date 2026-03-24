import { Menu } from "lucide-react-native";
import { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Sidebar from "./Sidebar";
import Badge from "./Badge";
import { useCartStore } from "@/lib/store/cartStore";
import COLOR from "@/lib/contants/color";

export default function MenuButton() {
    const [show, setShow] = useState(false);
    const { cart } = useCartStore();

    return (
        <>
            {show ? (
                <Sidebar setShow={setShow}/>
            ) : (
                <TouchableOpacity style={styles.menuButton} onPress={() => setShow(true)}>
                    <Badge count={cart.length}/>
                    <Menu color={COLOR.highlight} size={24} strokeWidth={3} />
                </TouchableOpacity>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    menuButton: {
        position: "absolute",
        top: 70,
        right: 20,
        zIndex: 2,
    },
});