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
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '10%',
  },
});

export default QuantitySelectorButton;
