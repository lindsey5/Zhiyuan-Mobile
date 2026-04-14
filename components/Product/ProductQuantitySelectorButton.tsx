import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';

interface ProductQuantitySelectorButtonProps {
  onPress: () => void;
  imageSource: ImageSourcePropType; 
  disabled?: boolean;
  size?: number;
}

const ProductQuantitySelectorButton: React.FC<ProductQuantitySelectorButtonProps> = ({
  onPress,
  imageSource,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          opacity: disabled ? 0.5 : 1,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <Image
        source={imageSource}
        resizeMode="stretch"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductQuantitySelectorButton;
