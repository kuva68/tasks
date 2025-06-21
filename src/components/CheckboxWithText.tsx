import React from 'react';
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  Text,
} from 'react-native';

import AnimatedCheckbox from './AnimatedCheckbox';
import { getFontSize, scaledSize } from '../utils/scaleSize';

interface CheckboxWithTextProps {
  isChecked: boolean;
  onToggle: () => void;
  text: string;
  style?: ViewStyle;
  numberOfLines?: number;
  textStyle?: TextStyle;
}

const CheckboxWithText: React.FC<CheckboxWithTextProps> = ({
  isChecked,
  onToggle,
  text,
  style = {},
  numberOfLines = 2,
  textStyle = {},
}) => {
  return (
    <TouchableOpacity onPress={onToggle} style={[styles.container, style]}>
      <Text numberOfLines={numberOfLines} style={[styles.text, textStyle]}>
        {text}
      </Text>
      <AnimatedCheckbox isChecked={isChecked} onToggle={onToggle} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaledSize(12),
    width: '100%',
    justifyContent: 'space-between',
    minHeight: scaledSize(22),
  },
  text: {
    fontSize: getFontSize(16),
    color: '#000000',
    lineHeight: getFontSize(20),
    maxWidth: scaledSize(280),
  },
});

export default CheckboxWithText;
