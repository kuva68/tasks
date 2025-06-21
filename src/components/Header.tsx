import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { getFontSize, scaledSize } from '../utils/scaleSize';
import { theme } from '../theme/themes';
import { useNavigation } from '@react-navigation/native';
import { Icons } from '../constants/icons';

const Header = ({
  title,
  isBackBtn,
  onSortPress,
  onFilterPress,
  style = {},
  onBackPress,
  onAddPress,
  onSearchPress,
}: {
  title?: string;
  isBackBtn?: boolean;
  onSortPress?: () => void;
  onFilterPress?: () => void;
  style?: ViewStyle;
  onBackPress?: () => void;
  onAddPress?: () => void;
  onSearchPress?: () => void;
}) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        disabled={!isBackBtn}
        onPress={() => (onBackPress ? onBackPress() : navigation.goBack())}
        style={[styles.button, { justifyContent: 'flex-start', gap: 10 }]}
      >
        <TouchableOpacity onPress={onSearchPress} style={styles.press}>
          <Icons.Shape width={20} height={20} stroke={theme.colors.gray100} />
        </TouchableOpacity>
        {!!onAddPress && (
          <TouchableOpacity onPress={onAddPress} style={styles.press}>
            <Icons.Add width={26} height={26} fill={theme.colors.gray70} />
          </TouchableOpacity>
        )}
        {isBackBtn && (
          <Icons.ChevronLeft
            width={16}
            height={16}
            fill={theme.colors.gray100}
          />
        )}
      </TouchableOpacity>

      <Text numberOfLines={2} style={styles.buttonText}>
        {title}
      </Text>

      <View style={[styles.button, styles.end]}>
        {!!onSortPress && (
          <TouchableOpacity onPress={onSortPress} style={styles.press}>
            <Icons.Swap width={20} height={20} fill={theme.colors.gray70} />
          </TouchableOpacity>
        )}
        {!!onFilterPress && (
          <TouchableOpacity onPress={onFilterPress} style={styles.press}>
            <Icons.Filter width={24} height={24} fill={theme.colors.gray70} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    width: scaledSize(110),
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  search: { marginRight: scaledSize(8) },
  title: {
    fontSize: scaledSize(16),
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  backButton: {
    justifyContent: 'center',
    position: 'absolute',
    right: scaledSize(0),
    alignSelf: 'center',
    width: scaledSize(40),
    height: scaledSize(40),
  },
  press: {
    paddingHorizontal: 1,
    zIndex: 100,
    paddingVertical: 1,
    backgroundColor: '#00000015',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
  },
  end: { gap: 10 },
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
  },
});

export default Header;
