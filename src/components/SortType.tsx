import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { getFontSize, scaledSize } from '../utils/scaleSize';
import CheckboxWithText from './CheckboxWithText';
import { EnSortType } from '../types/enums';
import { Icons } from '../constants/icons';
import { selectSort, setSort } from '../store/settings/settingsSlice';
import { useDispatch, useSelector } from 'react-redux';

const SortType = ({ onDismiss }: { onDismiss: () => void }) => {
  const dispatch = useDispatch();
  const type = useSelector(selectSort);
  const changeType = (sortType: EnSortType) => {
    dispatch(setSort(sortType));
    onDismiss();
  };
  return (
    <View style={styles.container}>
      <View style={styles.top} />
      <TouchableOpacity style={styles.button} onPress={onDismiss}>
        <Icons.Close
          width={scaledSize(24)}
          height={scaledSize(24)}
          fill={'#00000090'}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Sorting</Text>
      <View style={styles.separator} />
      <CheckboxWithText
        style={styles.check}
        isChecked={type === EnSortType.PRIORITY}
        onToggle={() => changeType(EnSortType.PRIORITY)}
        text={EnSortType.PRIORITY}
      />
      <View style={styles.separator} />
      <CheckboxWithText
        style={styles.check}
        isChecked={type === EnSortType.DEDLINE}
        onToggle={() => changeType(EnSortType.DEDLINE)}
        text={EnSortType.DEDLINE}
      />
      <View style={styles.separator} />
      <CheckboxWithText
        style={styles.check}
        isChecked={type === EnSortType.STATUS}
        onToggle={() => changeType(EnSortType.STATUS)}
        text={EnSortType.STATUS}
      />
      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: scaledSize(36),
    alignItems: 'center',
    paddingBottom: scaledSize(32),
    width: scaledSize(375),
  },
  check: { paddingHorizontal: scaledSize(16), height: scaledSize(22) },
  title: {
    fontSize: getFontSize(16),
    lineHeight: getFontSize(22),
    color: '#000000',
    marginBottom: scaledSize(24),
    fontWeight: '600',
  },
  top: {
    width: scaledSize(30),
    height: scaledSize(2),
    borderRadius: 2,
    backgroundColor: '#00000033',
    position: 'absolute',
    top: scaledSize(10),
    alignSelf: 'center',
  },
  button: {
    alignSelf: 'flex-end',
    padding: 10,
    position: 'absolute',
    top: scaledSize(10),
    right: scaledSize(10),
  },
  separator: {
    width: '100%',
    height: scaledSize(1),
    backgroundColor: '#DDDDDD',
    marginVertical: scaledSize(8),
  },
});

export default SortType;
