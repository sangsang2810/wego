import { NativeBaseProvider, extendTheme } from 'native-base';

export default Theme = extendTheme({
    colors: {
      // Add new color
      primary: {
        50: '#7879F1',
        100: '#7879F1',
        200: '#7879F1',
        300: '#7879F1',
        400: '#7879F1',
        500: '#7879F1',
        600: '#7879F1',
        700: '#7879F1',
        800: '#7879F1',
        900: '#7879F1',
      },
      // Redefinig only one shade, rest of the color will remain same.
      alo: {
        400: '#7879F1',
      },
    },
    fontSizes: {},
    fonts: {},
    config: {},
  });

