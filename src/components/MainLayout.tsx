import React, { ReactNode } from 'react';

import { Keyboard, Pressable, StyleSheet } from 'react-native';

import { scaledSize } from '../utils/scaleSize';

import { SafeAreaView, Edges } from 'react-native-safe-area-context';
import { isIOS } from '../utils';

export const MainLayout = ({
  children,
  isDisable,
  isTopEdge,
}: {
  children: ReactNode;
  isDisable: boolean;
  isTopEdge?: boolean;
}) => {
  const topEdge = isIOS ? ['top'] : ['top', 'bottom'];
  const bottomEdge = isIOS ? [] : ['bottom'];
  return (
    <Pressable
      onPress={() => Keyboard.dismiss()}
      disabled={isDisable}
      style={styles.main}
    >
      <SafeAreaView
        edges={isTopEdge ? (topEdge as Edges) : (bottomEdge as Edges)}
        // edges={[]}
        style={styles.container}
      >
        {children}
      </SafeAreaView>
    </Pressable>
  );
};
export default MainLayout;
const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: '#ffffff' },
  title: { color: 'white', alignSelf: 'center' },

  lSize: {
    width: scaledSize(60),
  },
  redBg: {
    backgroundColor: 'red',
  },
  container: {
    flex: 1,
  },
  touch: {
    width: scaledSize(50),
  },
});
