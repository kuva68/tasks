import React, { ReactNode } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { scaledSize } from '../utils/scaleSize';
const height = Dimensions.get('screen').height;
const CategoryModal = ({
  children,
  onDismis,
  isvisible,
  ...props
}: {
  children: ReactNode;
  onDismis: () => void;
  isvisible: boolean;
}) => {
  return (
    <ReactNativeModal
      {...props}
      onSwipeComplete={onDismis}
      deviceHeight={height}
      style={styles.container}
      onBackdropPress={onDismis}
      backdropColor="#00000050"
      animationOut="slideOutDown"
      animationIn="slideInUp"
      isVisible={isvisible}
    >
      {children}
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 0,
    width: scaledSize(375),
    marginHorizontal: 0,
    paddingHorizontal: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
});

export default CategoryModal;
