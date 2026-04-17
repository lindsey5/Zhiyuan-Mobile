import { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import COLOR from "@/lib/contants/color";
import useResponsiveFontSize from "@/hooks/useResponsiveFont";

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  label: string;
  value: string;
  options: Option[];
  onSelect: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function Dropdown({
  label,
  value,
  options,
  onSelect,
  placeholder = "Select an option",
  disabled = false,
}: DropdownProps) {
    const [visible, setVisible] = useState(false);
    const font16 = useResponsiveFontSize(16);
    const selectedLabel = options.find((opt) => opt.value === value)?.label || "";

    return (
        <View style={styles.field}>
        <Text style={styles.label}>{label}</Text>

        <Pressable
            disabled={disabled}
            style={[styles.dropdown, visible && styles.dropdownFocused, disabled && styles.dropdownDisabled]}
            onPress={() => setVisible(true)}
        >
            <Text style={[styles.value, { fontSize: font16 }, !value && styles.placeholder, disabled && styles.disabledText]}>
            {selectedLabel || placeholder}
            </Text>

            <Text style={[styles.arrow, disabled && styles.disabledText]}>
            ▼
            </Text>
        </Pressable>

        <Modal transparent visible={visible} animationType="fade">
            <Pressable
                style={styles.overlay}
                onPress={() => setVisible(false)}
            >
                <View style={styles.modalBox}>
                    <FlatList
                        data={options}
                        keyExtractor={(item) => item.value}
                        renderItem={({ item }) => {
                            const isSelected = item.value === value;

                            return (
                            <Pressable
                                style={[styles.option, isSelected && styles.optionSelected]}
                                onPress={() => {
                                    onSelect(item.value);
                                    setVisible(false);
                                }}
                            >
                                <Text style={[styles.optionText, { fontSize: font16 }, isSelected && styles.optionTextSelected]}>
                                {item.label}
                                </Text>
                            </Pressable>
                            );
                        }}
                    />
                </View>
            </Pressable>
        </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    field: {
        marginBottom: 18,
    },

    label: {
        fontSize: 13,
        fontWeight: "900",
        color: "#555",
        marginBottom: 6,
    },

    dropdown: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#a7a6a6",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    dropdownFocused: {
        borderBottomColor: COLOR.accent,
    },

    dropdownDisabled: {
        opacity: 0.4,
    },

    value: {
        fontSize: 16,
        color: "#111",
    },

    placeholder: {
        color: "#999",
    },

    disabledText: {
        color: "#999",
    },

    arrow: {
        fontSize: 12,
        color: "#666",
    },

    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: "center",
        paddingHorizontal: 20,
    },

    modalBox: {
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingVertical: 10,
        maxHeight: 300,
    },

    option: {
        paddingVertical: 12,
        paddingHorizontal: 15,
    },

    optionSelected: {
        backgroundColor: "#f2f2f2",
    },

    optionText: {
        color: "#111",
    },

    optionTextSelected: {
        color: COLOR.accent,
        fontWeight: "600",
    },
});