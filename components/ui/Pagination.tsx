import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import COLOR from "@/lib/contants/color";

type Props = {
    page: number;
    totalPages: number;
    onChange: (page: number) => void;
};

const getPagination = (current: number, total: number) => {
    const delta = 1;
    const range: (number | string)[] = [];

    for (
        let i = Math.max(2, current - delta);
        i <= Math.min(total - 1, current + delta);
        i++
    ) {
        range.push(i);
    }

    if (current - delta > 2) range.unshift("...");
    if (current + delta < total - 1) range.push("...");

    range.unshift(1);
    if (total > 1) range.push(total);

    return range;
};

export default function Pagination({ page, totalPages, onChange }: Props) {
    const pages = getPagination(page, totalPages);

    return (
        <View style={styles.container}>
        {/* Prev */}
        <TouchableOpacity
            onPress={() => onChange(Math.max(1, page - 1))}
            disabled={page === 1}
            style={[styles.navBtn, page === 1 && styles.disabled]}
        >
            <ChevronLeft size={18} color={page === 1 ? "#ccc" : "#333"} />
        </TouchableOpacity>

        {/* Pages */}
        <View style={styles.pages}>
            {pages.map((p, i) => {
            if (p === "...") {
                return (
                <Text key={`dots-${i}`} style={styles.dots}>
                    ···
                </Text>
                );
            }

            const isActive = page === p;

            return (
                <TouchableOpacity
                key={p}
                onPress={() => onChange(Number(p))}
                style={[styles.pageBtn, isActive && styles.activePage]}
                >
                <Text
                    style={[
                    styles.pageText,
                    isActive && styles.activeText,
                    ]}
                >
                    {p}
                </Text>
                </TouchableOpacity>
            );
            })}
        </View>

        {/* Next */}
        <TouchableOpacity
            onPress={() => onChange(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            style={[styles.navBtn, page === totalPages && styles.disabled]}
        >
            <ChevronRight size={18} color={page === totalPages ? "#ccc" : "#333"} />
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        marginTop: 20,
    },

    pages: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },

    pageBtn: {
        width: 34,
        height: 34,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f3f3f3",
    },

    activePage: {
        backgroundColor: COLOR.accent,
    },

    pageText: {
        fontSize: 13,
        color: "#555",
        fontWeight: "500",
    },

    activeText: {
        color: "#fff",
        fontWeight: "600",
    },

    navBtn: {
        width: 34,
        height: 34,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f3f3f3",
    },

    disabled: {
        opacity: 0.4,
    },

    dots: {
        paddingHorizontal: 4,
        color: "#999",
        fontSize: 14,
    },
});