import { Menu } from "lucide-react-native";
import { useState } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import useResponsiveFontSize from "@/hooks/useResponsiveFont";
import Sidebar from "./Sidebar";

export default function MenuButton() {
    const [show, setShow] = useState(false);

    return (
        <>
            {show ? (
                <Sidebar setShow={setShow} />
            ) : (
                <TouchableOpacity style={styles.menuButton} onPress={() => setShow(true)}>
                    <Menu color="hsla(35, 80%, 61%, 0.55)" size={24} strokeWidth={3} />
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