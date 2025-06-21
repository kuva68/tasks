import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { getFontSize, scaledSize } from '../../../utils/scaleSize';
import { theme } from '../../../theme/themes';

export const ListEmptyComponent = ({ title }: { title: string }) => {
  return (
    <View style={styles.main}>
      <TouchableOpacity style={styles.main}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaledSize(100),
  },
  text: {
    fontSize: getFontSize(28),
    fontWeight: '600',
    color: theme.colors.success,
    marginTop: scaledSize(16),
  },
});
