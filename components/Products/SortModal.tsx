import { Dispatch, SetStateAction, useState } from "react";
import { Modal, View, StyleSheet, Text, TouchableOpacity } from "react-native";

type SortOption = {
  sortBy: string;
  order: 'ASC' | 'DESC';
};

const options: Record<string, SortOption> = {
    'A-Z' : {
        sortBy: 'product_name',
        order: 'ASC',
    },
    'Z-A' : {
        sortBy: 'product_name',
        order: 'DESC',
    },
    'Newest': {
        sortBy: 'createdAt',
        order: 'DESC',
    },
    'Oldest': {
        sortBy: 'createdAt',
        order: 'ASC',
    },
    'Price: High to low': {
        sortBy: 'price',
        order: 'DESC',
    },
    'Price: Low to high': {
        sortBy: 'price',
        order: 'ASC',
    }
};

export default function SortModal ({
    visible,
    setVisible,
    setSortBy,
} : { 
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>
    setSortBy: Dispatch<SetStateAction<{ sortBy: string, order: 'ASC' | 'DESC'}>>
}) {
    const [selected, setSelected] = useState<string>('A-Z');

    const applySort = () => {
        setSortBy(options[selected])
        setVisible(false)
    }

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.text}>Sort</Text>
                    {Object.entries(options).map(([key, value]) => (
                        <TouchableOpacity
                            key={key}
                            style={styles.option}
                            onPress={() => setSelected(key)}
                        >
                            <Text>{key}</Text>
                            <View style={styles.radioOuter}>
                            {selected === key && <View style={styles.radioInner} />}
                            </View>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                        style={styles.applyBtn}
                        onPress={applySort}
                    >
                        <Text style={styles.applyText}>Apply</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'flex-end',
        padding: 5
    },
    container: {
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 10,
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    option: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12
    },
    radioOuter: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 1,
        borderColor: '#999',
        justifyContent: 'center',
        alignItems: 'center'
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#000'
    },
    applyBtn: {
        width: '100%',
        marginTop: 15,
        backgroundColor: '#f190078c',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center'
    },
    applyText: {
        fontWeight: '600'
    }
})