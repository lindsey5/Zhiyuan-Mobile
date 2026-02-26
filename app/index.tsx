import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { View, Text } from 'react-native';
import { Image, StyleSheet } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepareApp() {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsReady(true);
      await SplashScreen.hideAsync();
    }

    prepareApp();
  }, []);

  if (!isReady) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.box}>
            <Image
                source={require('../assets/logo.png')}
                  style={{
                    width: 300,
                    height: 300,
                }}
            />
            <Text style={styles.text}>Zhiyuan</Text>
    </View>
    </View>
  }

  return (
    <View>
      <Text>App Loaded</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold'

  }
});