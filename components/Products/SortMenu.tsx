import { ArrowUpDown, X } from "lucide-react-native";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";
import BottomSheet from "../ui/BottomSheet";
import Button from "../ui/Button";
import COLOR from "@/lib/contants/color";

type SortOption = {
    sortBy: string;
    order: 'ASC' | 'DESC';
};

const options: Record<string, SortOption> = {
    'A-Z': { sortBy: 'product_name', order: 'ASC' },
    'Z-A': { sortBy: 'product_name', order: 'DESC' },
    'Newest': { sortBy: 'createdAt', order: 'DESC' },
    'Oldest': { sortBy: 'createdAt', order: 'ASC' },
    'Price: High to low': { sortBy: 'price', order: 'DESC' },
    'Price: Low to high': { sortBy: 'price', order: 'ASC' }
};

export default function SortMenu({ setSortBy }: {
    setSortBy: Dispatch<SetStateAction<{ sortBy: string, order: 'ASC' | 'DESC' }>>
}) {
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState<string>('A-Z');

    const applySort = () => {
        setSortBy(options[selected]);
        setVisible(false);
    };

    return (
        <>
            <TouchableOpacity onPress={() => setVisible(true)}>
                <ArrowUpDown color={COLOR.highlight} size={24} strokeWidth={2} />
            </TouchableOpacity>
            <BottomSheet 
                visible={visible}
                onRelease={() => setVisible(false)}
                content={(
                    <>
                    <View style={styles.header}>
                        <Text style={styles.text}>Sort</Text>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setVisible(false)}>
                            <X size={24}/>
                        </TouchableOpacity>
                    </View>
                    {Object.entries(options).map(([key]) => (
                        <TouchableOpacity
                            key={key}
                            style={styles.option}
                            onPress={() => setSelected(key)}
                        >
                            <Text style={styles.optionText}>{key}</Text>
                            <View style={styles.radioOuter}>
                                {selected === key && <View style={styles.radioInner} />}
                            </View>
                        </TouchableOpacity>
                    ))}

                    <Button 
                        label="Apply" 
                        style={styles.applyBtn} 
                        onPress={applySort}
                    />
                    </>
                )}


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
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        alignSelf: 'center'
    },
    option: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    optionText: {
        fontSize: 16
    },
    radioOuter: {
        width: 25,
        height: 25,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#999',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioInner: {
        width: 15,
        height: 15,
        borderRadius: 50,
        backgroundColor: '#000',
    },
    applyBtn: {
        marginTop: 15,
        width: '100%',
        alignItems: 'center',
    },
});