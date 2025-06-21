import React from 'react';
import { StyleSheet, TextStyle, View, ViewStyle, Text } from 'react-native';

const TextField = ({
  title,
  text,
  textStyle,
  titleStyle,
  style = {},
}: {
  title: string;
  text: string;
  textStyle?: TextStyle;
  titleStyle?: TextStyle;
  style?: ViewStyle;
}) => {
  return (
    <View style={[styles.main, style]}>
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
  },
  title: {},
});
