import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { scaledSize } from '../utils/scaleSize';
import { Icons } from '../constants/icons';
interface AnimatedCheckboxProps {
  isChecked: boolean;
  onToggle: () => void;
  square?: boolean;
}

const AnimatedCheckbox: React.FC<AnimatedCheckboxProps> = ({
  isChecked,
  onToggle,
  square,
}) => {
  const scaleValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(scaleValue, {
      toValue: isChecked ? 1 : 0,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]);
  return (
    <TouchableOpacity onPress={onToggle}>
      <View style={[styles.checkbox, square && styles.square]}>
        <Animated.View
          style={[
            styles.innerCheckbox,
            {
              transform: [{ scale: scaleValue }],
            },
            square && styles.squareInner,
          ]}
        >
          {square && <Icons.Check width={24} height={24} />}
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: scaledSize(19.5),
    height: scaledSize(19.5),
    borderWidth: 2,
    borderColor: '#454545',
    borderRadius: scaledSize(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    width: scaledSize(18),
    height: scaledSize(18),
    borderWidth: 1,
    borderColor: '#BCBCBC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
  },
  innerCheckbox: {
    width: scaledSize(12),
    height: scaledSize(12),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: 30,
  },
  squareInner: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
    backgroundColor: 'transparent',
  },
});

export default AnimatedCheckbox;
