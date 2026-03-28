import CartBottomSheet from "@/components/Home/CartBottomSheet";
import GradientBackground from "@/components/ui/GradientBackgroud";
import MenuButton from "@/components/ui/Menu";
import { Slot, useRouter } from "expo-router";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function Layout () {
    const router = useRouter();

    return (
        <GradientBackground>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.push('/')}>
                        <Image 
                            style={{ width: 70, height: 70 }}
                            resizeMode="contain"
                            source={require('../../assets/header-logo.png')}
                        />
                    </TouchableOpacity>
                </View>

                <MenuButton />

                <Slot />

                <CartBottomSheet />
            </View>
        </GradientBackground>
    )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        gap: 10,
        paddingTop: 50,
        paddingBottom: 10,
    },
    headertext: {
        fontWeight: 'bold',
        fontSize: 20
    },
    text: {
        marginTop: 20,
        marginLeft: 20,
        fontWeight: 'bold',
        width: '100%',
        fontSize: 24,
    }
});