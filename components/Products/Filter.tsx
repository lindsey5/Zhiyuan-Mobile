import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
} from "react-native";
import BottomSheet from "../ui/BottomSheet";
import { X } from "lucide-react-native";
import Button from "../ui/Button";
import COLOR from "@/lib/contants/color";
import CategorySelection from "./CategorySelection";
import PriceRangeSlider from "./PriceRangeSlider";

interface FilterProps {
    setFilter: React.Dispatch<React.SetStateAction<{
        categories: string[]
        minPrice?: number
        maxPrice?: number
    }>>
}

export default function Filter({ setFilter } : FilterProps) {
    const [visible, setVisible] = useState(false);
    const [selectedItems, setSeletedItems] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState([0, 20000]);

    const handleToggle = (category: string) => {
        if (selectedItems.includes(category)) {
            setSeletedItems(prev => prev.filter(item => item !== category));
        } else {
            setSeletedItems(prev => [...prev, category]);
        }
    };

    const clearFilter = () => {
        setSeletedItems([]);
        setPriceRange([0, 20000]);
    };

    const applyFilter = () => {
        setFilter({
            categories: selectedItems,
            minPrice: priceRange[0],
            maxPrice: priceRange[1]
        })
        setVisible(false);
    };

    return (
        <>
            <TouchableOpacity onPress={() => setVisible(true)}>
                <MaterialIcons name="filter-list" color={COLOR.highlight} size={30} />
            </TouchableOpacity>

            <BottomSheet
                onRelease={() => setVisible(false)}
                visible={visible}
                content={
                    <>
                        {/* HEADER */}
                        <View style={styles.header}>
                            <Text style={styles.title}>Filter</Text>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setVisible(false)}
                            >
                                <X size={24} />
                            </TouchableOpacity>
                        </View>

                        {/* CATEGORY */}
                        <CategorySelection 
                            selectedItems={selectedItems}
                            handleToggle={handleToggle}
                        />

                        {/* PRICE RANGE */}
                        <PriceRangeSlider 
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                        />

                        {/* BUTTONS */}
                        <View style={styles.buttonsContainer}>
                            <Button
                                label="Clear All"
                                style={[styles.button, styles.clearButton]}
                                onPress={clearFilter}
                            />
                            <Button
                                label="Apply"
                                style={styles.button}
                                onPress={applyFilter}
                            />
                        </View>
                    </>
                }
            />
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        position: 'relative',
        marginBottom: 40,
    },
    closeButton: {
        position: 'absolute',
        right: -5,
        top: 2
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        alignSelf: 'center'
    },
    button: {
        flex: 1,
    },
    clearButton: {
        backgroundColor: '#e0e0e0',
        borderWidth: 1,
        borderColor: '#bdbdbd',
    },
    buttonsContainer: {
        width: '100%',
        flexDirection: 'row',
        gap: 10
    }
});