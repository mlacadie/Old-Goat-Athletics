import { createTheme } from '@mui/material/styles'

export const colors = {
  navy: '#003264',
  navyDark: '#001c3a',
  navyDarker: '#00142a',
  gray: '#9d9d9d',
  grayLight: '#e4e3e1',
  bone: '#f6f4ef',
  gold: '#c9982f',
}

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.navy,
      dark: colors.navyDark,
      light: '#2c5a8a',
      contrastText: '#ffffff',
    },
    secondary: {
      main: colors.gray,
      contrastText: '#ffffff',
    },
    warning: {
      main: colors.gold,
      contrastText: colors.navyDarker,
    },
    background: {
      default: colors.bone,
      paper: '#ffffff',
    },
    text: {
      primary: colors.navyDarker,
      secondary: '#5a6270',
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontFamily: '"Bebas Neue", "Inter", sans-serif',
      fontWeight: 400,
      letterSpacing: '0.02em',
      lineHeight: 1.05,
    },
    h2: {
      fontFamily: '"Bebas Neue", "Inter", sans-serif',
      fontWeight: 400,
      letterSpacing: '0.02em',
      lineHeight: 1.1,
    },
    h3: {
      fontFamily: '"Bebas Neue", "Inter", sans-serif',
      fontWeight: 400,
      letterSpacing: '0.02em',
      lineHeight: 1.15,
    },
    h4: {
      fontFamily: '"Bebas Neue", "Inter", sans-serif',
      fontWeight: 400,
      letterSpacing: '0.02em',
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
    button: {
      fontWeight: 700,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: '1.6em',
          paddingBlock: '0.7em',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: 24,
          paddingRight: 24,
        },
      },
    },
  },
})

export default theme
