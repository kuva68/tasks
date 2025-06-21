import { StyleSheet, View, Text, ViewStyle } from 'react-native';
import React from 'react';
import { getFontSize, scaledSize } from '../utils/scaleSize';
export const Label = ({
  color,
  text,
  style = {},
}: {
  color: string;
  text: string;
  style?: ViewStyle;
}) => (
  <View style={[styles.label, { backgroundColor: color }, style]}>
    <Text style={styles.labelText}>{text}</Text>
  </View>
);
const styles = StyleSheet.create({
  label: {
    flexGrow: 0,
    paddingHorizontal: scaledSize(4),
    paddingVertical: scaledSize(2),
    borderRadius: scaledSize(2),
    alignSelf: 'flex-start',
  },
  labelText: {
    color: '#ffffff',
    fontSize: getFontSize(10),
    lineHeight: getFontSize(14),
    textTransform: 'uppercase',
  },
});
