import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
  Text,
} from 'react-native';
import AnimatedCheckbox from '../../AnimatedCheckbox';
import { getFontSize, scaledSize } from '../../../utils/scaleSize';
import { theme } from '../../../theme/themes';

interface Checkbox {
  isChecked: boolean;
  onToggle: () => void;
  text: string;
  style?: ViewStyle;
  square?: boolean;
  isActive?: boolean;
}

const Checkbox: React.FC<Checkbox> = ({
  isChecked,
  onToggle,
  text,
  style = {},

  square,
  isActive = true,
}) => {
  return (
    <TouchableOpacity
      onPress={onToggle}
      style={[styles.container, style, !isActive && { opacity: 0.3 }]}
    >
      <AnimatedCheckbox
        square={square}
        isChecked={isChecked}
        onToggle={onToggle}
      />
      <View style={styles.view}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaledSize(12),
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
  },
  small: { fontSize: 8 },
  text: {
    fontSize: getFontSize(16),
    color: theme.colors.gray100,
    lineHeight: getFontSize(20),
  },
  view: { flexDirection: 'row', gap: 8 },
});

export default Checkbox;
