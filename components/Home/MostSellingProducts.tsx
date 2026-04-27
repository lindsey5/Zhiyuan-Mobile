import {
    View,
    Dimensions,
    Image,
    StyleSheet,
    TouchableOpacity,
    Text,
} from "react-native";
import Animated, {
    useAnimatedStyle,
    interpolate,
} from "react-native-reanimated";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import CustomizedText from "../ui/Text";
import useResponsiveFontSize from "@/hooks/useResponsiveFont";
import { useRouter } from "expo-router";
import { formatToPeso } from "@/utils/format";
import COLOR from "@/lib/contants/color";
import usePulseAnimation from "@/hooks/usePulseAnimation";
import { useGetMostSellingProducts } from "@/hooks/Product/use-get-most-selling-products.hook";
import Chip from "../ui/Chip";

export default function MostSellingProductsCarousel() {
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;
    const progress = useSharedValue<number>(0);

    const font22 = useResponsiveFontSize(22);
    const font16 = useResponsiveFontSize(16);

    const itemWidth = windowWidth * 0.7;
    const sideSpacing = (windowWidth - itemWidth) / 0.8;

    const router = useRouter();
    const pulseStyle = usePulseAnimation();

    const { data, isFetching } = useGetMostSellingProducts();
    
    function renderItem(info: { item: MostSellingProduct; index: number }) {
        const product = info.item;
        const index = info.index;

        const animatedStyle = useAnimatedStyle(() => {
        const distance = progress.value - index;
        const perspective = 600;

        const scale = interpolate(Math.abs(distance), [0, 1], [1, 0.9]);
        const rotateY = interpolate(distance, [-1, 0, 1], [10, 0, -10]);
        const opacity = interpolate(Math.abs(distance), [0, 1], [1, 0.7]);

        return {
            transform: [{ perspective }, { scale }, { rotateY: `${rotateY}deg` }],
            opacity,
        };
        });

        const handleAddToCart = () => {
            router.push(`/product/${product?.variant.product?._id}`);
        };

        if (isFetching || !data) {
        return (
            <Animated.View style={[styles.itemContainer, animatedStyle]}>
            <Animated.View style={[styles.skeletonImage, pulseStyle]} />
            <Animated.View style={[styles.skeletonTitle, pulseStyle]} />
            <Animated.View style={[styles.skeletonButton, pulseStyle]} />
            </Animated.View>
        );
        }

        return (
            <Animated.View style={[styles.itemContainer, animatedStyle]}>
                <Image
                    source={{ uri: product.variant.image_url }}
                    style={styles.image}
                />

                <CustomizedText
                    style={{
                        fontSize: font22,
                        marginTop: 20,
                        textAlign: "center",
                    }}
                >
                {product.variant.product?.product_name}
                </CustomizedText>

                <View style={{ marginTop: 10 }}>
                    <Chip label={product.variant.variant_name} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                    <CustomizedText style={{ fontSize: font22, marginTop: 10 }}>
                    {formatToPeso(product.variant.price)}
                    </CustomizedText>

                    <CustomizedText style={{ fontSize: font16, marginTop: 10, color: "#888", }}>
                    Total Sold: {product.totalSold}
                    </CustomizedText>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleAddToCart}
                    activeOpacity={0.85}
                >
                <View style={styles.buttonContent}>
                    <Image
                        source={require("../../assets/Basket.png")}
                        style={styles.icon}
                        resizeMode="contain"
                    />

                    <Text style={[styles.buttonText, { fontSize: font22 }]}>Add to Cart</Text>
                </View>

                <Text style={[styles.arrow, { fontSize: font22 }]}>›</Text>
                </TouchableOpacity>
            </Animated.View>
        );
    }

    const placeholderProduct: MostSellingProduct = {
      "_id": "",
      "totalSold": 0,
      "totalRevenue": 0,
      "variant": {
        "_id": "",
        "product_id": "",
        "variant_name": "",
        "image_url": "",
        "image_public_id": "",
        "stock": 1,
        "price": 0,
        "sku": "Bag-Pinkbag2.0",
        "product": {
          "_id": "",
          "product_name": "",
          "description": "",
          "thumbnail_public_id": "",
          "thumbnail_url": "",
          "category": "",
        }
      }
    };

    return (
        <View style={styles.carouselContainer}>
        <Carousel
            data={
            isFetching
                ? Array.from({ length: 3 }, () => placeholderProduct)
                : data?.mostSellingProducts || []
            }
            loop
            width={windowWidth >= 768 ? itemWidth : windowWidth * 0.9}
            height={Math.max(windowHeight * 0.6, 500)}
            mode="parallax"
            modeConfig={{
                parallaxScrollingScale: 0.8,
                parallaxScrollingOffset: sideSpacing,
            }}
            pagingEnabled
            snapEnabled
            onProgressChange={(_, absoluteProgress) => progress.value = absoluteProgress}
            renderItem={renderItem}
        />
        </View>
    );
}

const styles = StyleSheet.create({
    carouselContainer: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },

    itemContainer: {
        flex: 1,
        borderRadius: 25,
        padding: 30,
        backgroundColor: COLOR.panel,
        alignItems: "center",
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 4 },
    },

    image: {
        width: "100%",
        flex: 1,
        borderRadius: 12,
        resizeMode: "contain",
    },

    button: {
        marginTop: 20,
        width: "100%",
        maxWidth: 400,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        paddingVertical: 16,
        paddingHorizontal: 20,

        borderRadius: 20,
        backgroundColor: "#000000", 

        borderWidth: 1,
        borderColor: "#eee",
    },

    buttonContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    icon: {
        width: 32,
        height: 32,
        tintColor: COLOR.accent,
    },

    buttonText: {
        fontWeight: "600",
        color: "white",
    },

    arrow: {
        color: "#bbb",
        fontWeight: "300",
    },

    /* Skeleton */
    skeletonImage: {
        width: "100%",
        flex: 1,
        borderRadius: 12,
        backgroundColor: COLOR.skeleton,
    },

    skeletonTitle: {
        width: "70%",
        height: 20,
        borderRadius: 10,
        marginTop: 20,
        backgroundColor: COLOR.skeleton,
    },

    skeletonButton: {
        maxWidth: 400,
        marginTop: 20,
        backgroundColor: COLOR.skeleton,
        paddingVertical: 30,
        width: "100%",
        borderRadius: 16,
    },
});