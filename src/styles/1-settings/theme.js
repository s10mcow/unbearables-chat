// @flow
const BASE_BORDER_RADIUS = '2px';
const BASE_PADDING = '20px';

const GREEN = '#264223';
const LIGHT_GREEN = '#5E8F59';
const LIGHTER_GREEN = '#aef1a7';
const PURPLE = '#574E9C';
const BROWN = '#5C4230';
const LIGHT_BROWN = '#DBBC8F';
const GREY = '#333333';
const LIGHTISH_GREY = '#777';
const LIGHT_GREY = '#E7E2DE';
const LIGHTER_GREY = '#F2EFED';
const WHITE = '#FFFFFF';
const BLACK = '#000000';
const RED = '#ff1200';

const flexboxgrid = {
  // Defaults
  gridSize: 12, // columns
  gutterWidth: 0.63, // rem
  outerMargin: 2, // rem
  mediaQuery: 'only screen',
  container: {
    sm: 46, // rem
    md: 61, // rem
    lg: 76, // rem
  },
  breakpoints: {
    xs: 0, // em
    sm: 48, // em
    md: 64, // em
    lg: 75, // em
  },
};

const theme = {
  baseBorderRadius: BASE_BORDER_RADIUS,
  basePadding: BASE_PADDING,
  colors: {
    GREEN,
    LIGHT_GREEN,
    LIGHTER_GREEN,
    LIGHTISH_GREY,
    PURPLE,
    BROWN,
    LIGHT_BROWN,
    GREY,
    LIGHT_GREY,
    LIGHTER_GREY,
    WHITE,
    BLACK,
    RED,
  },
  buttonBorderRadius: BASE_BORDER_RADIUS,
  buttonPaddingLarge: '15px 20px',
  buttonPaddingMedium: '10px 20px',
  buttonPaddingSmall: '2px 15px',
  flexboxgrid,
};

export default theme;

export type ThemeProps = { theme: typeof theme };
