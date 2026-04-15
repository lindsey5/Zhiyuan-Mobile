import { TouchableOpacity, View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

interface RadioProps {
    label: string;
    selected?: string;
    value: string;
    setSelected: (value: string) => void;
    containerStyle?: ViewStyle;
    labelStyle?: TextStyle;
    outerCircleStyle?: ViewStyle;
    innerCircleStyle?: ViewStyle;
}

export default function Radio({ label, setSelected, value, selected, containerStyle, innerCircleStyle, labelStyle, outerCircleStyle }: RadioProps) {
    return (
        <TouchableOpacity
            onPress={() => setSelected(value)}
            style={[styles.radioContainer, containerStyle]}
        >
        <View style={[styles.outerCircle, outerCircleStyle]}>
            {selected === value && (
            <View style={[styles.innerCircle, innerCircleStyle]} />
            )}
        </View>

        <Text style={[styles.label, labelStyle]}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    radioContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
    },

    label: {
        fontSize: 14,
    },

    outerCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'black',
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },

    innerCircle: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: 'black',
    },
});