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
    listBorder: palette.white,
    
    textLight: palette.white,
    textDark: palette.black,

    buttonPrimary: palette.greenPrimary,
    buttonSecondary: palette.bluePrimary,
    buttonRegular: palette.white,
    buttonCritical: palette.redPrimary,
    buttonShadow: palette.black,

  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  border: {

  },
  textVariants: {
    header: {
      fontWeight: 'bold',
      fontSize: 42,
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
    },
    defaults: {
      fontSize: 20,
      color: 'textLight',
    },
    start: {
      color: 'textLight',
      
    },
    stop: {
      color: 'textLight',
    },
    lap: {
      color: 'textLight',
    },
    reset: {
      color: 'textDark',
    }
  },
  buttonVariants: {
    defaults: {
      backgroundColor: 'buttonRegular',
      width: 106,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'l',

      shadowColor: 'buttonShadow',
      shadowOffset: {width: 4, height: 4},
      shadowOpacity: 0.5,
      shadowRadius: 3,
    },
    start: {
      backgroundColor: 'buttonPrimary',
      
    },
    stop: {
      backgroundColor: 'buttonCritical',
    },
    lap: {
      backgroundColor: 'buttonSecondary',
    },
    reset: {
      backgroundColor: 'buttonRegular',
      color: 'textDark',
    }
  }
});

export type Theme = typeof theme;
export default theme;