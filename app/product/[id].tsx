import { useMemo, useState } from 'react';
import { View, StyleSheet, Image, ScrollView, Dimensions} from 'react-native';
import { useLocalSearchParams } from "expo-router";
import AddToCartButton from '@/components/Products/AddToCartButton';
import { products } from '@/constants/data';
import CustomizedText from '@/components/ui/Text';
import QuantitySelector from '@/components/Products/QuantitySelector';
import MenuButton from '@/components/ui/Menu';

const { height } = Dimensions.get('screen');

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const [quantity, setQuantity] = useState<number>(1);

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
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={{ 
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
       <View style={styles.header}>
        <CustomizedText style={styles.headerText}>{product.name}</CustomizedText>
      </View>
      <MenuButton />
      <View style={styles.content}>
        <View style={styles.imageContainer}>
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
    </ScrollView>
  );

};

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  header: {
    width: '100%',
    paddingTop: 60,
  },
  headerText: {
    width: '40%',
    fontSize: 32,
    paddingLeft: 20,
  },
  content: {
    gap: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
    backgroundColor: 'transparent',
    width: '100%',
  },
  imageContainer: {
    width: "80%",
    height: height * 0.25,
    justifyContent: "center",
    alignItems: "center",
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
    width: '70%'
  },
  
  bottomContainer: {
    width: '95%',
    marginBottom: 10,
  },
});

export default ProductDetailsScreen;