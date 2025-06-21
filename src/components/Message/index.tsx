import React, { useCallback, useEffect, useState } from 'react';
import Animated, {
  SlideInUp,
  SlideOutUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { EnMessagePreset } from '../../types/enums';
import eventEmitter from '../../services/event-emitter';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';
import { theme } from '../../theme/themes';
import { scaledSize, scaledY } from '../../utils/scaleSize';

export const Message = () => {
  const [visible, setVisible] = useState(false);
  const [preset, setPreset] = useState<EnMessagePreset>(EnMessagePreset.INFO);
  const [text, setText] = useState('');
  const top = useSharedValue(0);
  const animStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: top.value }],
    };
  });
  const hide = useCallback(() => {
    top.value = withTiming(-100, { duration: 500 });
  }, [top]);

  useEffect(() => {
    const showMessage = (
      presetName: EnMessagePreset,
      messageText: string,
      duration: number = 4000,
    ) => {
      setPreset(presetName);
      setText(messageText);
      setVisible(true);
      if (duration > 0) {
        setTimeout(() => {
          setVisible(false);
        }, duration);
      }
    };

    eventEmitter.addListener('message', showMessage);
    return () => {
      eventEmitter.off('message', showMessage);
    };
  }, [hide, top]);
  useEffect(() => {
    eventEmitter.addListener('hideMessage', () => setVisible(false));
    return () => {
      eventEmitter.off('hideMessage', () => setVisible(false));
    };
  }, [hide, top]);
  return (
    <>
      {visible && (
        <Animated.View
          style={[styles.container, styles[preset], animStyle]}
          entering={SlideInUp.duration(400)}
          exiting={SlideOutUp}
        >
          <Text style={[styles.textStyle]}>{text}</Text>
          {preset === EnMessagePreset.LOADING && (
            <ActivityIndicator color="#ffffff" size="large" />
          )}
        </Animated.View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  [EnMessagePreset.ERROR]: { backgroundColor: theme.colors.danger },
  [EnMessagePreset.INFO]: { backgroundColor: theme.colors.black },
  [EnMessagePreset.SUCCESS]: { backgroundColor: theme.colors.green },
  [EnMessagePreset.LOADING]: { backgroundColor: theme.colors.black },
  textStyle: {
    color: theme.colors.white,
  },
  container: {
    position: 'absolute',
    top: scaledY(56),
    alignSelf: 'center',
    width: scaledSize(343),
    paddingHorizontal: scaledSize(16),
    paddingVertical: scaledSize(12),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: scaledSize(8),
    borderRadius: scaledSize(8),
    zIndex: 10000,
  },
});
