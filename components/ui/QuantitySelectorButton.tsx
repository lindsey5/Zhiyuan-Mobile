import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';

interface QuantitySelectorButtonProps {
  onPress: () => void;
  imageSource: ImageSourcePropType; 
  disabled?: boolean;
  size?: number;
}

const QuantitySelectorButton: React.FC<QuantitySelectorButtonProps> = ({
  onPress,
  imageSource,
  disabled = false,
  size = 56,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          opacity: disabled ? 0.5 : 1,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <Image
        source={imageSource}
        style={[styles.buttonImage, { width: size, height: size }]}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  buttonImage: {
  },
});

export default QuantitySelectorButton;
