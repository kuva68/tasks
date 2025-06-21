import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { theme } from '../theme/themes';
import { getFontSize, scaledSize, scaledY } from '../utils/scaleSize';
import { Icons } from '../constants/icons';
import { useNavigation } from '@react-navigation/native';
import { EnScreens } from '../types/enums';
import { useDispatch } from 'react-redux';
import { setActiveTask } from '../store/tasks/tasksSlice';
export const ListEmptyComponent = ({
  style = {},
  size = 100,
  textStyle = {},
}: {
  style?: ViewStyle;
  size?: number;
  textStyle?: TextStyle;
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const deleteActiveTask = () => {
    dispatch(setActiveTask(null));
  };
  return (
    <View style={[styles.main, style]}>
      <TouchableOpacity
        onPress={() => {
          deleteActiveTask();
          navigation.navigate(EnScreens.TASK_EDIT);
        }}
        style={styles.opasity}
      >
        <Icons.Add
          width={scaledSize(size)}
          height={scaledSize(size)}
          fill={theme.colors.success}
          style={{ ...styles.icon, borderRadius: size }}
        />
        <Text style={[styles.text, textStyle]}>Add task</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaledY(200),
  },
  icon: {
    elevation: 8,
    shadowColor: theme.colors.success,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: theme.colors.white,
  },
  opasity: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: getFontSize(28),
    fontWeight: '600',
    color: theme.colors.success,
    marginTop: scaledSize(16),
  },
});
