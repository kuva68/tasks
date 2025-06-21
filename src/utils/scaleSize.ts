import { Platform, Dimensions, PixelRatio } from 'react-native';
export const isAndroid = Platform.OS === 'android';
export type DeviseType = 'phone' | 'tablet';
const fontConfig = {
  phone: {
    small: { min: 0.8, max: 1 },
    medium: { min: 0.9, max: 1.1 },
    large: { min: 1, max: 1.2 },
  },
  tablet: {
    small: { min: 1.3, max: 1.4 },
    medium: { min: 1.4, max: 1.5 },
    large: { min: 1.5, max: 1.7 },
  },
};
export const isIOS = Platform.OS === 'ios';
const { width, height } = Dimensions.get('screen');
export const getDeviceType = (): DeviseType => {
  const pixelDensity = PixelRatio.get();
  const adjustedWidth = width * pixelDensity;
  const adjustedHeight = height * pixelDensity;
  if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
    return 'tablet';
  } else if (
    pixelDensity === 2 &&
    (adjustedWidth >= 1920 || adjustedHeight >= 1920)
  ) {
    return 'tablet';
  } else {
    return 'phone';
  }
};

const shortDimension = width < height ? width : height;
const longDimensions = width > height ? width : height;
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;
const getScreenSizeCategory = (): 'small' | 'medium' | 'large' => {
  if (shortDimension < 350) {
    return 'small';
  }
  if (shortDimension > 500) {
    return 'large';
  }
  return 'medium';
};

export const scaledSize = (size: number) =>
  (shortDimension / guidelineBaseWidth) * size;
export const scaledY = (size: number) =>
  (longDimensions / guidelineBaseHeight) * size;
export const getFontSize = (size: number): number => {
  const deviceType = getDeviceType();
  const screenCategory = getScreenSizeCategory();
  const config = fontConfig[deviceType][screenCategory];

  const scaleFactor = shortDimension / guidelineBaseWidth;
  const clampedScaleFactor = Math.min(
    Math.max(scaleFactor, config.min),
    config.max,
  );
  let newSize = size * clampedScaleFactor;
  if (deviceType === 'tablet') {
    newSize *= 1.1; // Increase tablet font sizes by an additional 10%
  }
  return (
    Math.round(PixelRatio.roundToNearestPixel(newSize)) /
    PixelRatio.getFontScale()
  );
};
