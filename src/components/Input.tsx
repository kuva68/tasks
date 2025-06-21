import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
  Text,
} from 'react-native';

import { scaledSize, scaledY } from '../utils/scaleSize';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

interface InputProps {
  value: string;
  setValue?: (value: string) => void;
  description: string;
  [key: string]: any;
  error?: string;
  style?: StyleProp<TextStyle>;
  withStar?: boolean;
  containerStyle?: ViewStyle;
}

const Input: React.FC<InputProps> = ({
  value,
  setValue,
  description,
  error,
  style,
  containerStyle = {},
  ...props
}) => {
  const errorTextStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(error ? 36 : 0),
    };
  });
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.row}>
        <Text style={styles.description}>{description}</Text>
      </View>

      <TextInput
        style={[styles.input, style, !!error && styles.errorInput]}
        value={value}
        onChangeText={setValue}
        placeholderTextColor="#7B7B7B"
        {...props}
      />

      <Animated.Text style={[styles.errorText, errorTextStyle]}>
        {error}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: scaledY(8), width: '100%' },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    padding: 8,
    fontSize: 14,
    height: scaledSize(48),
    color: '#363636',
    width: '100%',
  },
  errorInput: {
    borderColor: '#D32B55',
  },
  row: {
    flexDirection: 'row',
    gap: scaledSize(8),
  },
  description: {
    marginTop: 4,
    fontSize: scaledSize(14),
    color: '#000000',
    fontWeight: '400',
  },
  errorText: {
    position: 'absolute',
    bottom: scaledSize(-32),
    fontSize: scaledSize(10),
    color: '#D32B55',
    fontWeight: '400',
    alignSelf: 'flex-start',
    lineHeight: scaledSize(16),
  },
});

export default Input;
