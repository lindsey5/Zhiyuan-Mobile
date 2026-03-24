import { formatToPeso } from '@/utils/format';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';

interface AddToCartButtonProps {
  buttonText?: string;
  price: number;
  disabled?: boolean;
  handleAddToCart: () => void;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  buttonText = 'Add to Cart',
  price,
  disabled = false,
  handleAddToCart
}) => {

  return (
    <TouchableOpacity
      style={[styles.button, { opacity: disabled ? 0.6 : 1 }]}
      onPress={handleAddToCart}
      activeOpacity={0.9}
      disabled={disabled}
    >
      <View style={styles.iconContainer}>
        <Image
          source={require('../../assets/Basket.png')}
          style={styles.cartIcon}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.buttonText}>{buttonText}</Text>
      <Text style={styles.priceText}>{formatToPeso(price)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 40,
    paddingVertical: 14,
    paddingHorizontal: 8,
    paddingRight: 24,
  },
  iconContainer: {
    width: 52,
    height: 52,
    backgroundColor: '#E8B84A',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cartIcon: {
    width: 24,
    height: 24,
  },
  buttonText: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  priceText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default AddToCartButton;
