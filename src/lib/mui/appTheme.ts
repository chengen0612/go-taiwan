import { createTheme } from "@mui/material/styles";

import { PALETTE } from "#/utils/constants/theme";

const appTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 1140,
      xl: 1366,
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    body1: {
      fontSize: "1.125rem",
    },
  },
  palette: {
    primary: {
      main: PALETTE.primary,
    },
    secondary: {
      main: PALETTE.secondary,
      contrastText: "#fff",
    },
    favorite: {
      main: PALETTE.favorite,
      contrastText: "#fff",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        body: {
          backgroundColor: theme.palette.grey["50"],
        },
        "p, figure": {
          margin: "unset",
        },
        a: {
          textDecoration: "unset",
          color: "inherit",
        },
      }),
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: false,
        disableGutters: true,
      },
    },
  },
});

export default appTheme;
