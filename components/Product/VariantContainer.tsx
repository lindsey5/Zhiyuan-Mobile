import COLOR from '@/lib/contants/color';
import { formatToPeso } from '@/utils/format';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface VariantContainerProps {
    selectedVariant?: Variant;
    variants: Variant[];
    setSelectedVariant: React.Dispatch<React.SetStateAction<Variant | undefined>>;
}

export default function VariantContainer ({
    variants,
    selectedVariant,
    setSelectedVariant
} : VariantContainerProps) {
    return (
        <View style={styles.variantsContainer}>
            {variants.map((variant) => (
                <TouchableOpacity
                    key={variant.id}
                    style={[
                        styles.variantButton,
                        selectedVariant?.id === variant.id && styles.activeVariantButton,
                    ]}
                    onPress={() => setSelectedVariant(variant)}
                >
                    <Image
                        source={{ uri: variant.image_url }}
                        style={styles.variantImage}
                        resizeMode="cover"
                    />
                    <View style={{ width: '100%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                        <Text style={[
                                styles.variantText,
                                selectedVariant?.id === variant.id && { color: '#E8B84A', fontWeight: 'bold' }
                            ]}>{variant.variant_name}</Text>
                        </View>
                        <Text>{formatToPeso(variant.price)}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    variantsContainer: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        padding: 10,
        alignItems: 'flex-start',
    },
    variantButton: {
        maxWidth: '60%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 6,
        borderRadius: 8,
        marginLeft: 10,
        boxShadow: "0px 2px 5px rgba(0,0,0,0.3)",
        backgroundColor: '#f5f5f5',
    },
    activeVariantButton: { 
        borderWidth: 2,
        borderColor: COLOR.accent,
        boxShadow: ''
    },
    variantImage: {
        width: 36,
        height: 36,
        borderRadius: 6,
        marginRight: 8,
    },
    variantText: {
        fontSize: 14,
        color: '#333',
        flexWrap: 'wrap',
        width: '80%',
    },
});
