import { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, Dimensions,} from 'react-native';
import { useLocalSearchParams } from "expo-router";
import AddToCartButton from '@/components/Products/AddToCartButton';
import { products } from '@/constants/data';
import CustomizedText from '@/components/ui/Text';
import QuantitySelector from '@/components/Products/QuantitySelector';

const { width } = Dimensions.get('window');

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const [quantity, setQuantity] = useState<number>(2);

  const product = products.find(product => product.id === Number(id))

  const incrementQuantity = (): void => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = (): void => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = (): void => {
    console.log(`Added ${quantity} items to cart`);
  };

  const totalPrice = useMemo(() => {
    return product?.price || 0 * quantity
  }, [quantity])

  if(!product) return null

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Text style={styles.category}>{product.category}</Text>
          <Image
            source= {product.image}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>

        <CustomizedText 
          style={styles.description} 
          numberOfLines={3}
        >{product.description}</CustomizedText>
      </View>
      <QuantitySelector 
        decrementQuantity={decrementQuantity}
        incrementQuantity={incrementQuantity}
        quantity={quantity}
      />
      <View style={styles.bottomContainer}>
        <AddToCartButton
          onPress={handleAddToCart}
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
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
    backgroundColor: 'transparent',
    width: '100%'
  },
  category: {
    fontSize: 200,
    position: 'absolute',
    top: -100,
    fontWeight: '700',
    color: 'rgba(235, 168, 74, 0.55)'
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: "80%",
    height: "60%",
    maxWidth: 400,
    maxHeight: 400,
    marginBottom: 50,
  },
  productImage: {
    width: '100%',
    height: '100%',
    zIndex: 2,
  },
  description: {
    fontSize: 20,
    color: '#A0A0A0',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 24,
    width: '70%'
  },
  
  bottomContainer: {
    width: '95%',
  },
});

export default ProductDetailsScreen;