import { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
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

const { height } = Dimensions.get('screen');

const ProductScreen = () => {
    const { id } = useLocalSearchParams();
    const { addItem } = useCartStore();
    const [quantity, setQuantity] = useState<number>(1);
    const [showSuccess, setShowSuccess] = useState(false);
    const { data, isLoading } = useGetProduct(Number(id));
    const product = data?.product;
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const incrementQuantity = (): void => {
        setQuantity((prev) => prev + 1);
    };

    const decrementQuantity = (): void => {
        if (quantity > 1) setQuantity((prev) => prev - 1);
    };

    const totalPrice = useMemo(() => (product?.variants[selectedIndex]?.price || 0) * quantity, [quantity]);

    const handleAddToCart = () => {
        const selectedVariant = product?.variants[selectedIndex]
        if (selectedVariant) {
            addItem({
                id: selectedVariant.id,
                image: selectedVariant.image_url,
                product_id: product?.id || 0,
                variant_name: selectedVariant.variant_name,
                amount: totalPrice,
                quantity,
                price: selectedVariant.price
            });
            setShowSuccess(true);
            setQuantity(1);
        }
    };

    if (isLoading || !product){
        return <LoadingScreen />
    }

    const nextIndex = () => {
        if(selectedIndex < product.variants.length -1) {
            setSelectedIndex(prev => prev + 1);
        }
    }

    const prevIndex = () => {
        if(selectedIndex > 0){
            setSelectedIndex(prev => prev - 1);
        }
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
                    <View style={styles.imageSlider}>
                        <TouchableOpacity onPress={prevIndex} style={{ opacity: selectedIndex === 0 ? 0.2 : 1}}>
                            <Image 
                                resizeMode='contain'
                                style={{ width: 40, height: 40}}
                                source={require('../../assets/left.png')}
                            />
                        </TouchableOpacity>
                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: product.variants[selectedIndex]?.image_url }}
                                style={styles.productImage}
                                resizeMode='contain'
                            />
                        </View>
                        <TouchableOpacity onPress={nextIndex} style={{ opacity: selectedIndex === product.variants.length -1 ? 0.2 : 1}}>
                            <Image 
                                resizeMode='contain'
                                style={{ width: 40, height: 40}}
                                source={require('../../assets/right.png')}
                            />
                        </TouchableOpacity>
                    </View>

                    <CustomizedText style={styles.description} numberOfLines={3}>
                        {product.description}
                    </CustomizedText>
                    <VariantContainer 
                        selectedIndex={selectedIndex}
                        variants={product.variants}
                        setSelectedIndex={setSelectedIndex}
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
    },
    content: {
        marginTop: 30,
        gap: 10,
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: '100%',
    },
    imageSlider: { 
        flex: 1, 
        marginTop: 50,
        marginBottom: 20,
        width: '100%', 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        gap: 10,
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    imageContainer: {
        flex: 1,
        height: height * 0.25,
        justifyContent: 'center',
        alignItems: 'center',
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