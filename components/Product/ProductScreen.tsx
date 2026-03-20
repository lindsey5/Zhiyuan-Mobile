import { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { useLocalSearchParams } from "expo-router";

import AddToCartButton from '@/components/Product/AddToCartButton';
import CustomizedText from '@/components/ui/Text';
import QuantitySelector from '@/components/Product/QuantitySelector';
import MenuButton from '@/components/ui/Menu';
import { useCartStore } from '@/lib/store/cartStore';
import SuccessCard from '@/components/ui/SuccessCard';
import { useGetProduct } from '@/hooks/Product/use-get-product.hook';
import LoadingScreen from '../ui/LoadingScreen';
import VariantContainer from './VariantContainer';
import GradientBackground from '../ui/GradientBackgroud';

const { height } = Dimensions.get('screen');

const ProductScreen = () => {
    const { id } = useLocalSearchParams();
    const { addItem } = useCartStore();
    const [quantity, setQuantity] = useState<number>(1);
    const [showSuccess, setShowSuccess] = useState(false);
    const { data, isLoading } = useGetProduct(Number(id));
    const product = data?.product;
    const [selectedVariant, setSelectedVariant] = useState<Variant>();

    useEffect(() => {
        if (data) setSelectedVariant(data.product.variants[0]);
    }, [data]);

    const incrementQuantity = (): void => {
        setQuantity((prev) => prev + 1);
    };

    const decrementQuantity = (): void => {
        if (quantity > 1) setQuantity((prev) => prev - 1);
    };

    const totalPrice = useMemo(() => (selectedVariant?.price || 0) * quantity, [quantity]);

    const handleAddToCart = () => {
        if (selectedVariant) {
            addItem({
                id: selectedVariant.id,
                image: selectedVariant.image_url,
                name: selectedVariant.variant_name,
                price: totalPrice,
                quantity
            });
            setShowSuccess(true);
            setQuantity(1);
        }
    };

    if (isLoading || !product){
        return <LoadingScreen />
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{ uri: product.thumbnail_url }}
                    style={{ width: 50, height: 50 }}
                    resizeMode="contain"
                />
                <CustomizedText style={styles.headerText}>{product.product_name}</CustomizedText>
            </View>

            <MenuButton />
            <SuccessCard
                message="Item added to your cart"
                visible={showSuccess}
                onClose={() => setShowSuccess(false)}
            />

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.content}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: selectedVariant?.image_url }}
                            style={styles.productImage}
                            resizeMode='contain'
                        />
                    </View>

                    <CustomizedText style={styles.description} numberOfLines={3}>
                        {product.description}
                    </CustomizedText>
                    <VariantContainer 
                        selectedVariant={selectedVariant}
                        variants={product.variants}
                        setSelectedVariant={setSelectedVariant}
                    />
                    
                </View>
            </ScrollView>

            <View style={styles.bottomContainer}>
                <QuantitySelector
                    decrementQuantity={decrementQuantity}
                    incrementQuantity={incrementQuantity}
                    quantity={quantity}
                />
                <AddToCartButton
                    handleAddToCart={handleAddToCart}
                    buttonText="Add to Cart"
                    price={totalPrice}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: '100%',
        paddingTop: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    headerText: {
        width: '90%',
        fontSize: 32,
        paddingLeft: 20,
    },
    scrollContainer: {
        alignItems: 'center',
        flex: 1,
    },
    content: {
        marginTop: 30,
        gap: 10,
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: '100%',
    },
    imageContainer: {
        width: '80%',
        height: height * 0.25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 50,
    },
    productImage: {
        width: '100%',
        height: '100%',
    },
    description: {
        fontSize: 20,
        color: '#A0A0A0',
        textAlign: 'center',
        fontStyle: 'italic',
        lineHeight: 24,
        width: '70%',
    },
    bottomContainer: {
        gap: 20,
        height: '30%',
        alignItems: 'center',
        paddingBottom: 10,
        backgroundColor: 'transparent'
    },
});

export default ProductScreen;