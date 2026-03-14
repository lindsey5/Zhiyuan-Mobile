import { View, Text, StyleSheet} from 'react-native';
import QuantitySelectorButton from '@/components/Products/QuantitySelectorButton';
import { useMemo } from 'react';

export default function QuantitySelector(
    { 
        incrementQuantity, 
        decrementQuantity, 
        quantity 
    } : 
    { 
        incrementQuantity : () => void, 
        decrementQuantity : () => void, 
        quantity : number
    }
) {

    const formattedQuantity = useMemo(() => quantity.toString().padStart(2, '0'), [quantity])


    return (
        <View style={styles.quantityContainer}>
            <QuantitySelectorButton
                onPress={decrementQuantity}
                imageSource={require("../../assets/SubtrButton.png")}
                disabled={quantity <= 1}
            />

            <View style={styles.quantityWrapper}>
                <Text style={styles.quantityText}>{formattedQuantity}</Text>
            </View>

            <QuantitySelectorButton   
                onPress={incrementQuantity}
                imageSource={require("../../assets/AddButton.png")}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    quantityContainer: {
        flexDirection: "row",
        justifyContent: "center",
        width: '100%',
    },
    quantityWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    quantityText: {
        fontSize: 64,
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 2,
    },
});

