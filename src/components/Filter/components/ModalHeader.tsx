import React from 'react';
import { getFontSize, scaledSize, scaledY } from '../../../utils/scaleSize';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  View,
} from 'react-native';
import { Icons } from '../../../constants/icons';
import { theme } from '../../../theme/themes';

export const ModalHeader = ({
  title,
  onDismis,
  style = {},
}: {
  title?: string;
  onDismis: () => void;
  style?: ViewStyle;
}) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={onDismis} style={styles.button}>
        <Icons.ChevronLeft width={26} height={26} fill={theme.colors.gray100} />
      </TouchableOpacity>

      <Text style={styles.buttonText}>{title}</Text>

      <View style={[styles.button, styles.end]} />
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    width: scaledSize(40),
    flexDirection: 'row',
    paddingLeft: scaledSize(16),
  },
  end: { justifyContent: 'flex-end' },
  buttonText: {
    fontSize: getFontSize(18),
    color: '#353535',
    fontWeight: '600',
    textAlign: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    minHeight: scaledSize(34),
    paddingBottom: 6,
    borderBottomColor: '#0000000D',
    borderBottomWidth: 1,
    marginBottom: scaledY(16),
  },
});
