import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Dimensions
} from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import COLOR from "@/lib/contants/color";

const { width } = Dimensions.get('screen');

interface PriceRangeSliderProps {
    priceRange: number[];
    setPriceRange: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function PriceRangeSlider({ priceRange, setPriceRange }: PriceRangeSliderProps) {
    return (
        <>
        <Text style={styles.text}>Price:</Text>
        <View style={styles.priceContainer}>
            <MultiSlider
                sliderLength={width - 65}
                values={priceRange}
                min={0}
                max={20000}
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
        </>
    )
}

const styles = StyleSheet.create({
    text: {
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        fontSize: 16,
        marginVertical: 10
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
})