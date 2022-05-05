import { createTheme } from '@mui/material/styles';
import { CYAN, GREEN, RED, VIOLET, YELLOW } from './constants';

export const theme = createTheme({
  palette: {
    primary: {
      main: VIOLET,
    },
    secondary: {
      main: CYAN,
    },
    text: {
      disabled: RED,
    },
    success: {
      main: GREEN,
    },
    warning: {
      main: YELLOW,
    },
  },
});
