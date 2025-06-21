import React from 'react';
import { Text, StyleSheet, TouchableOpacity, TextStyle } from 'react-native';
import { scaledSize } from '../utils/scaleSize';

const MenuItem = ({
  title,
  titleStyle = {},
  isSmall = false,
}: {
  title: string;
  isOpen?: boolean;
  titleStyle?: TextStyle;
  isArrowDown?: boolean;
  isSmall?: boolean;
}) => {
  return (
    <TouchableOpacity style={[styles.button, isSmall && styles.small]}>
      <Text style={[styles.buttonText, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: scaledSize(48),
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  small: {
    height: scaledSize(36),
  },
  chevron: { transform: [{ rotate: '180deg' }] },
  buttonText: {
    fontSize: 16,
    fontWeight: '400',
  },
});

export default MenuItem;
