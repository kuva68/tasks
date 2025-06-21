import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Icons } from '../constants/icons';
import { getFontSize, scaledSize } from '../utils/scaleSize';
import { theme } from '../theme/themes';

interface InputProps {
  value: string;
  setValue: (value: string) => void;
}
export const Searchbar: React.FC<InputProps> = ({
  value,
  setValue,
  ...props
}) => {
  return (
    <View style={styles.main}>
      <Icons.Shape
        width={scaledSize(18)}
        height={scaledSize(18)}
        stroke={theme.colors.gray70}
      />

      <TextInput
        {...props}
        value={value}
        onChangeText={setValue}
        style={styles.input}
        // autoFocus
      />
      <Icons.ClearIcon
        width={scaledSize(18)}
        height={scaledSize(18)}
        onPress={() => setValue('')}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: scaledSize(9),
    borderRadius: 8,
  },
  input: {
    flex: 1,
    height: scaledSize(36),
    color: theme.colors.gray100,
    fontSize: getFontSize(14),
  },
});
