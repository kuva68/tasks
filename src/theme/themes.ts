import { isIOS } from '../utils';

export const palette = {
  primary: '#CD2414',
  secondary: '#FFFFFF',
  background: '#FFFFFF',
  secondaryBackground: '#EEEEEE',
  white: '#fff',
  black: '#101214',
  realBlack: '#000',
  text: '#262626',
  secondaryText: '#7B7B7B',
  gray70: '#8D8D8D',
  gray40: '#CDCDCD',
  gray50: '#BCBCBC',
  gray100: '#353535',
  placeholder: '#a1a1a1',
  highlight: 'rgb(199, 198, 203)',
  iconBlack: '#101214',
  transparent: '#00000000',
  halfContrast: '#00000060',
  green: '#009821CC',
  danger: '#BE2C4B',
  danger30: '#BE2C4B30',
  blue: '#1D7CCC',
  yellow: '#FFC080',
  bgBlack: '#121212',
  darkGray: '#1B1B1B',
  violet: '#9747FF',
  disabled: '#BCBCBC',
  white6: '#ffffff09',
  white15: '#ffffff15',
  red: '#BE2C4B',
  success: '#57FF72',
  lineBg: '#151515',
};

export const LightTheme = {
  dark: false,
  colors: {
    ...palette,
    contrast: '#000000',
    themeColor: palette.white,
    half: '#ffffff60',
  },
};

export const DarkTheme = {
  dark: true,
  colors: {
    ...LightTheme.colors,
    contrast: '#ffffff',
    themeColor: palette.black,
    background: '#000000',
    half: '#00000060',
    text: palette.white,
    themeGradient: ['#ffffff', '#ffffff80', '#ffffff00'],
    themeGradientReverse: ['#ffffff00', '#ffffff80', '#ffffff'],
    // tabBar: palette.black,
    // iconWhite: palette.black,
    // iconBlack: palette.white,
    // dynamicBackground: palette.dynamicBlack,
    // shadow: palette.transparent,
    // borderColor: palette.borderColorDark,
    halfContrast: '#FFFFFF60',
    // cardBackground: '#FFFFFF05',
  },
};
export const theme = LightTheme;
export const fonts = {
  fontFamilySF: {
    light: 'SFProText-Light',
    regular: 'SFProText-Regular',
    medium: 'SFProText-Medium',
    semiBold: 'Rubik-SemiBold',
    bold: 'SFProText-Bold',
    extraBold: 'SFProText-Heavy',
  },
  fontFamilyOpenSans: isIOS ? 'Open Sans' : 'OpenSans-VariableFont_wdth,wght',
  fontFamilyOranienbaum: 'Oranienbaum-Regular',
};
