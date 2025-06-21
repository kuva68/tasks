import React, { ReactNode } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { getFontSize, scaledSize } from '../utils/scaleSize';
import { theme } from '../theme/themes';

interface ButtonProps {
  onPress: () => void;
  text?: string;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  text,
  disabled,
  style,
  textStyle,
  children,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, disabled && styles.disabled, style]}
    >
      {children ? (
        children
      ) : (
        <Text
          allowFontScaling={false}
          style={[styles.text, disabled && styles.disabledText, textStyle]}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.gray100,

    borderRadius: 4,
    alignItems: 'center',
    height: scaledSize(36),
    justifyContent: 'center',
    width: '100%',
  },
  disabled: {
    backgroundColor: theme.colors.disabled,
  },
  text: {
    color: '#fff',
    fontSize: getFontSize(16),
    fontWeight: '400',
    lineHeight: getFontSize(22),
  },
  disabledText: {
    color: theme.colors.gray70,
  },
});

export default Button;
