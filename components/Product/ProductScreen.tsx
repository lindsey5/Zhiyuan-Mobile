import { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, Text } from 'react-native';
import { useLocalSearchParams } from "expo-router";
import AddToCartButton from '@/components/Product/AddToCartButton';
import CustomizedText from '@/components/ui/Text';
import ProductQuantitySelector from '@/components/Product/ProductQuantitySelector';
import MenuButton from '@/components/ui/Menu';
import { useCartStore } from '@/lib/store/cartStore';
import SuccessCard from '@/components/ui/SuccessCard';
import { useGetProduct } from '@/hooks/Product/use-get-product.hook';
import LoadingScreen from '../ui/LoadingScreen';
import VariantContainer from './VariantContainer';
import ProductDescription from './ProductDescription';

import Modal from "react-native-modal";
import ImageViewer from "react-native-image-zoom-viewer";

const { height, width } = Dimensions.get('screen');

const ProductScreen = () => {
    const { id } = useLocalSearchParams();
    const { addItem } = useCartStore();
    const [quantity, setQuantity] = useState<number>(1);
    const [showSuccess, setShowSuccess] = useState(false);
    const { data, isFetching } = useGetProduct(id as string);
    const product = data?.product;
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const [showImageModal, setShowImageModal] = useState(false);

    const incrementQuantity = (): void => {
        setQuantity((prev) => prev + 1);
    };

    const decrementQuantity = (): void => {
        if (quantity > 1) setQuantity((prev) => prev - 1);
    };

    const totalPrice = useMemo(() => (product?.variants?.[selectedIndex]?.price || 0) * quantity, [quantity]);

    const handleAddToCart = () => {
        const selectedVariant = product?.variants?.[selectedIndex];

        if (selectedVariant) {
            addItem({
                variant_id: selectedVariant._id,
                product_id: product._id,
                quantity,
                amount: selectedVariant.price * quantity,
                price: selectedVariant.price,
                image: selectedVariant.image_url,
            }, selectedVariant.stock);

            setShowSuccess(true);
            setQuantity(1);
        }
    };

    useEffect(() => {
        setSelectedIndex(0);
        setQuantity(1);
    }, [id]);

    if (isFetching || !product) {
        return <LoadingScreen />
    }

    const nextIndex = () => {
        if (selectedIndex < (product.variants?.length || 1) - 1) {
            setSelectedIndex(prev => prev + 1);
        }
    };

    const prevIndex = () => {
        if (selectedIndex > 0) {
            setSelectedIndex(prev => prev - 1);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{ uri: product.thumbnail_url }}
                    style={{ width: 50, height: 50 }}
                    resizeMode="contain"
                />
                <CustomizedText style={styles.headerText}>
                    {product.product_name}
                </CustomizedText>
            </View>

            <MenuButton />

            <SuccessCard
                message="Successfully added to cart"
                visible={showSuccess}
                onClose={() => setShowSuccess(false)}
            />

            {/* IMAGE ZOOM MODAL */}
            <Modal
                isVisible={showImageModal}
                onBackdropPress={() => setShowImageModal(false)}
                onBackButtonPress={() => setShowImageModal(false)}
                style={{ margin: 0 }}
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setShowImageModal(false)}
                    >
                        <Text style={styles.closeText}>✕</Text>
                    </TouchableOpacity>

                    <ImageViewer
                        imageUrls={[
                            { url: product.variants?.[selectedIndex]?.image_url || "" }
                        ]}
                        enableSwipeDown={true}
                        onSwipeDown={() => setShowImageModal(false)}
                        backgroundColor="black"
                    />
                </View>
            </Modal>

            <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContainer}>
                <View style={styles.content}>
                    <View style={styles.imageSlider}>
                        <TouchableOpacity
                            onPress={prevIndex}
                            style={{ opacity: selectedIndex === 0 ? 0.2 : 1 }}
                        >
                            <Image
                                resizeMode="contain"
                                style={{ width: 40, height: 40 }}
                                source={require('../../assets/left.png')}
                            />
                        </TouchableOpacity>

                        <View style={styles.imageContainer}>
                            <TouchableOpacity style={styles.productImage} onPress={() => setShowImageModal(true)}>
                                <Image
                                    source={{ uri: product.variants?.[selectedIndex]?.image_url }}
                                    style={styles.productImage}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            onPress={nextIndex}
                            style={{ opacity: selectedIndex === (product.variants?.length || 1) - 1 ? 0.2 : 1 }}
                        >
                            <Image
                                resizeMode="contain"
                                style={{ width: 40, height: 40 }}
                                source={require('../../assets/right.png')}
                            />
                        </TouchableOpacity>
                    </View>

                    <VariantContainer
                        selectedIndex={selectedIndex}
                        variants={product?.variants || []}
                        setSelectedIndex={setSelectedIndex}
                        setQuantity={setQuantity}
                    />
                </View>

                <ProductDescription description={product.description} />
            </ScrollView>

            <View style={styles.bottomContainer}>
                <ProductQuantitySelector
                    decrementQuantity={decrementQuantity}
                    incrementQuantity={incrementQuantity}
                    quantity={quantity}
                    selectedVariant={product.variants?.[selectedIndex]}
                />

                <AddToCartButton
                    handleAddToCart={handleAddToCart}
                    buttonText="Add to Cart"
                    price={totalPrice}
                    disabled={(product.variants?.[selectedIndex]?.stock || 0) < quantity}
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
        width: '70%',
        fontSize: 16,
        paddingLeft: 20,
    },
    scrollContainer: {
        alignItems: 'center',
    },
    content: {
        gap: 10,
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: '100%',
    },
    imageSlider: {
        marginTop: 50,
        marginBottom: 20,
        width: '100%',
        maxWidth: 500,
        flexDirection: 'row',
        gap: 20,
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    imageContainer: {
        flex: 1,
        height: height * 0.30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    productImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    description: {
        fontSize: 20,
        lineHeight: 24,
        marginBottom: 10
    },
    bottomContainer: {
        gap: 20,
        height: '30%',
        alignItems: 'center',
        paddingBottom: 10,
        backgroundColor: 'transparent'
    },

    // MODAL STYLES
    modalContainer: {
        flex: 1,
        backgroundColor: "black",
    },
    closeButton: {
        position: "absolute",
        top: 50,
        right: 20,
        zIndex: 999,
        backgroundColor: "rgba(255,255,255,0.2)",
        padding: 10,
        borderRadius: 50,
    },
    closeText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
});

export default ProductScreen;