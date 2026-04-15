import COLOR from "@/lib/contants/color";
import { StyleSheet, TouchableOpacity, Text, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {}

export default function Button({ style, ...props }: ButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.btn, style]} 
            {...props}
        />
    );
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: COLOR.highlight,
        padding: 15,
        borderRadius: 8,
        textAlign: 'center'
    },
});