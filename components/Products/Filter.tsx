import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    Dimensions,
    ScrollView,
    TouchableWithoutFeedback,
    TextInput
} from "react-native";
import BottomSheet from "../ui/BottomSheet";
import { Check, X } from "lucide-react-native";
import { CATEGORIES } from "@/lib/contants/contants";
import Button from "../ui/Button";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import COLOR from "@/lib/contants/color";

const { width, height } = Dimensions.get('screen');

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
    const [priceRange, setPriceRange] = useState([0, 10000]);

    const handleToggle = (category: string) => {
        if (selectedItems.includes(category)) {
            setSeletedItems(prev => prev.filter(item => item !== category));
        } else {
            setSeletedItems(prev => [...prev, category]);
        }
    };

    const clearFilter = () => {
        setSeletedItems([]);
        setPriceRange([0, 10000]);
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
                        <Text style={styles.text}>Category:</Text>

                        <TouchableWithoutFeedback>
                            <ScrollView style={styles.categoryContainer}>
                                {CATEGORIES.map(category => (
                                    <TouchableOpacity
                                        key={category}
                                        style={styles.category}
                                        onPress={() => handleToggle(category)}
                                    >
                                        <Text style={styles.categoryText}>
                                            {category}
                                        </Text>

                                        <View
                                            style={[
                                                styles.checkbox,
                                                selectedItems.includes(category) && {
                                                    backgroundColor: '#000',
                                                    borderWidth: 0
                                                }
                                            ]}
                                        >
                                            {selectedItems.includes(category) && (
                                                <Check size={20} color="#fff" />
                                            )}
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </TouchableWithoutFeedback>

                        {/* PRICE RANGE */}
                        <Text style={styles.text}>Price:</Text>

                        <View style={styles.priceContainer}>
                            <MultiSlider
                                sliderLength={width - 65}
                                values={priceRange}
                                min={0}
                                max={10000}
                                step={1000}
                                onValuesChange={(values) => {
                                    let [minVal, maxVal] = values;

                                    if (minVal > maxVal) minVal = maxVal;

                                    setPriceRange([minVal, maxVal]);
                                }}
                                selectedStyle={{ backgroundColor: COLOR.highlight }}
                                unselectedStyle={{ backgroundColor: '#ccc' }}
                                trackStyle={{ height: 4 }}
                                markerStyle={{
                                    height: 20,
                                    width: 20,
                                    borderRadius: 10,
                                    backgroundColor: COLOR.highlight,
                                }}
                            />

                            <View style={styles.priceInputContainer}>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="numeric"
                                    value={String(priceRange[0])}
                                    onChangeText={(text) => {
                                        let val = Number(text) || 0;
                                        if (val > priceRange[1]) val = priceRange[1];
                                        setPriceRange([val, priceRange[1]]);
                                    }}
                                />

                                <View style={styles.separator} />

                                <TextInput
                                    style={styles.input}
                                    keyboardType="numeric"
                                    value={String(priceRange[1])}
                                    onChangeText={(text) => {
                                        let val = Number(text) || 0;
                                        if (val < priceRange[0]) val = priceRange[0];
                                        if(val > 10000) val = 10000;
                                        setPriceRange([priceRange[0], val]);
                                    }}
                                />
                            </View>
                        </View>

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
    text: {
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        fontSize: 16,
        marginVertical: 10
    },
    categoryContainer: {
        width: '100%',
        maxHeight: height * 0.35,
        marginTop: 10,
    },
    category: {
        width: '100%',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    checkbox: {
        width: 25,
        height: 25,
        borderWidth: 1,
        borderColor: "#9e9c9c",
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5
    },
    categoryText: {
        fontSize: 16,
    },
    priceContainer: {
        width: '100%',
    },
    priceInputContainer:{
        width: '100%',
        flexDirection: 'row',
        gap: 10,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        width: '45%',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        textAlign: 'center',
    },
    separator: {
        width: 10,
        height: 2,
        backgroundColor: COLOR.highlight,
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