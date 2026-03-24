import COLOR from '@/lib/contants/color';
import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLOR.highlight} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingScreen;