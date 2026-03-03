import React from 'react';
import { Text, StyleSheet, TextProps, TextStyle } from 'react-native';

type CustomizedTextProps = TextProps & {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
};

export default function CustomizedText({ children, style, ...textProps }: CustomizedTextProps) {
  return (
    <Text style={[styles.text, style]} {...textProps}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
    fontFamily: 'ADLaMDisplay',
  },
});