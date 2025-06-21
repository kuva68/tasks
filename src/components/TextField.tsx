import React from 'react';
import { StyleSheet, TextStyle, View, ViewStyle, Text } from 'react-native';
import { theme } from '../theme/themes';

const TextField = ({
  title,
  text,
  textStyle,
  titleStyle,
  style = {},
  isDeadLine = false,
}: {
  title: string;
  text: string;
  textStyle?: TextStyle;
  titleStyle?: TextStyle;
  style?: ViewStyle;
  isDeadLine?: boolean;
}) => {
  return (
    <View style={[styles.main, isDeadLine && styles.deadline, style]}>
      <Text allowFontScaling={false} style={[styles.copiedText, textStyle]}>
        {title}
      </Text>
      <Text allowFontScaling={false} style={[styles.title, titleStyle]}>
        {text}
      </Text>
    </View>
  );
};
export default TextField;
const styles = StyleSheet.create({
  copiedText: {},
  main: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  deadline: {
    backgroundColor: theme.colors.danger30,
    borderWidth: 0.6,
    borderRadius: 4,
    borderColor: theme.colors.danger,
  },
  title: {},
});
