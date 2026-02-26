import { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

const { width, height } = Dimensions.get('window');

export default function App() {
    const [fontsLoaded] = useFonts({
        ADLaMDisplay: require('../assets/fonts/ADLaMDisplay-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.box}>
            <View style={{
                position: 'relative',
            }}>
                <Image
                    source={require('../assets/logo.png')}
                        style={{
                        width: 300,
                        height: 300,
                    }}
                />
                <Text style={{
                ...styles.text,
                position: 'absolute',
                right: '-10%', 
                bottom: '30%',
                }}>Zhiyuan</Text>
            </View>
        </View>
        <Text style={{...styles.text, marginTop: 40 }}>ENTERPRISE{'\n'}GROUP INC.</Text>
    </View>

}

const styles = StyleSheet.create({
  box: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 35,
    fontFamily: 'ADLaMDisplay',
  }
});