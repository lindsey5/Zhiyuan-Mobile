import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, Dimensions,} from 'react-native';
import * as Font from 'expo-font'; 
import * as SplashScreen from 'expo-splash-screen'; 
import QuantitySelectorButton from '../../../components/ui/QuantitySelectorButton';
import AddToCartButton from '../../../components/ui/AddToCartButton';
import SideBar from "@/components/ui/Sidebar";
import { useLocalSearchParams } from "expo-router";
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const PLACEHOLDER_IMAGES = {
  decrementButton: '../../../assets/QuantityButton.png',
  incrementButton: '../../../assets/QuantityButton.png',
  cartIcon: '../../../assets/Basket.png',
  productImage: '../../../assets/ball.png',
};

const loadFonts = async () => {
  await Font.loadAsync({
    ADLaMDisplay: require('../../../assets/fonts/ADLaMDisplay-Regular.ttf'), 
  });
};

const ProductDetailsScreen: React.FC = () => {
const [quantity, setQuantity] = useState<number>(2);
const { id, name, image, price } = useLocalSearchParams();
const [fontsLoaded, setFontsLoaded] = useState(false);
const navigation = useNavigation();
const [show, setShow] = useState(false);

useLayoutEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: 'none' },
    });

    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: { display: 'flex' },
      });
    };
  }, [navigation]);

  React.useEffect(() => {
    const prepare = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
        await SplashScreen.hideAsync();
      }
    };
     
    prepare();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const incrementQuantity = (): void => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = (): void => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const formatQuantity = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  const handleAddToCart = (): void => {
    console.log(`Added ${quantity} items to cart`);
  };

  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.titleLight}>The Potted</Text>
          <Text style={styles.titleBold}>Head</Text>
        </View>
      <>
        {show && <SideBar setShow={setShow} />}
        <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setShow(true)}
      >
        <View style={styles.menuLine} />
        <View style={styles.menuLine} />
        <View style={styles.menuLine} />
      </TouchableOpacity>
      </>
      </View>

      <View style={styles.content}>
        <Image
            source={require("../../../assets/Balls-Text.png")}
        /> 
        <View style={styles.imageContainer}>
          <Image
            source= {require("../../../assets/ball.png")}
            style={styles.productImage}
            resizeMode="contain"
          />
          <View style={styles.imageShadow} />
        </View>

        <Text style={styles.text}>
          Perfect for beginners or anyone{'\n'}looking for a stick stick
        </Text>

        <View style={styles.quantityContainer}>
          <QuantitySelectorButton
            onPress={decrementQuantity}
            imageSource={require("../../../assets/SubtrButton.png")}
            disabled={quantity <= 1}
            size={180}
          />

        <View style={styles.quantityWrapper}>
    <Text style={styles.quantityText}>{formatQuantity(quantity)}</Text>
        </View>

          <QuantitySelectorButton   
            onPress={incrementQuantity}
            imageSource={require("../../../assets/AddButton.png")}
            size={180}
          />
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <AddToCartButton
          onPress={handleAddToCart}
          cartIconSource={require("../../../assets/Basket.png")}
          buttonText="Add to Cart"
          price="$50.00"
        />
      </View>
    </SafeAreaView>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 45,
    paddingBottom: 90,
  },
  menuButton: {
    width: 48,
    height: 48,
    backgroundColor: '#F5F0E8',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  menuLine: {
    width: 20,
    height: 2,
    backgroundColor: '#C4B89E',
    borderRadius: 1,
    marginVertical: 2,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    marginBottom: 1,
    marginTop: -90,
  },
  productImage: {
    width: width * 0.75,
    height: width * 0.75,
  },
  imageShadow: {
    width: width * 0.5,
    height: 40,
    backgroundColor: '#808588',
    borderRadius: 100,
    opacity: 0.6,
    marginTop: -65,
  },
  titleLight: {
    fontSize: 32,
    fontWeight: '300',
    color: '#1A1A1A',
    letterSpacing: -0.5,
    fontFamily: 'ADLaMDisplay',     
  },
  titleBold: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A1A1A',
    letterSpacing: -0.5,
    fontFamily: 'ADLaMDisplay', 
  },
  backgroundText: {
    position: 'absolute',
    top: '5%',
    fontSize: 120,
    fontWeight: '700',
    color: '#F5E6D3',
    letterSpacing: 8,
    opacity: 0.8,
    zIndex: 0,
    fontFamily: 'ADLaMDisplay', 
  },
  content: {
    flex: 1,
    alignItems: 'stretch', 
    justifyContent: 'center',
    position: 'relative',
    paddingBottom: 1,
    paddingTop: 1,
    marginBottom: -50,
    marginTop: -50,
  },
  text: {
    fontSize: 16,
    color: '#A0A0A0',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 24,
    marginTop: 10,
    marginBottom: 30,
    paddingHorizontal: 40,
    fontFamily: 'ADLaMDisplay',
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    width: "125%",
    marginTop: -70,
    marginHorizontal: -50,
    marginBottom: 80,
  },
  quantityWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  quantityText: {
    fontSize: 64,
    fontWeight: '300',
    color: '#1A1A1A',
    minWidth: 100,
    textAlign: 'center',
    letterSpacing: 2,
    fontFamily: 'ADLaMDisplay', 
  },
  bottomContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 16,
  },
});

export default ProductDetailsScreen;