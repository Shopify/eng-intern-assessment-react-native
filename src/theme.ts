import {createTheme} from '@shopify/restyle';

const palette = {

  greenPrimary: '#148F2F',
  bluePrimary: '#3758D0',
  redPrimary: '#B91C1C',

  darkGrey: '#212121',
  black: '#0B0B0B',
  white: '#F0F2F3',
};

const theme = createTheme({
  colors: {
    mainBackground: palette.darkGrey,
    textLight: palette.white,
    textDark: palette.black,

    buttonPrimary: palette.greenPrimary,
    buttonSecondary: palette.bluePrimary,
    buttonRegular: palette.white,
    buttonCritical: palette.redPrimary,


  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    header: {
      fontWeight: 'bold',
      fontSize: 34,
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
    },
    defaults: {
      // We can define a default text variant here.
    },
  },
});

export type Theme = typeof theme;
export default theme;