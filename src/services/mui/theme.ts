import { createTheme, ThemeOptions } from "@mui/material/styles";

// eslint-disable-next-line import/no-mutable-exports
let globalTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
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
      light: "#67EEFF",
      main: "#00BBF0",
      dark: "#008BBD",
    },
    secondary: {
      light: "#FFE67B",
      main: "#FDB44B",
      dark: "#C68417",
    },
    success: {
      main: "#00BA88",
      dark: "#00966D",
    },
    error: {
      main: "#EB5757",
      dark: "#D32F2F",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        body: {
          backgroundColor: theme.palette.grey["50"],
        },
      }),
    },
  },
});

globalTheme = createTheme(globalTheme, {
  palette: {
    kind: {
      attraction: globalTheme.palette.primary.main,
      food: "#FF6F6E",
      hotel: globalTheme.palette.secondary.main,
      activity: "#7879F1",
    },
  },
});

export { globalTheme };

export const searchFormTheme = createTheme(globalTheme, {
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          height: "3.25rem",
          borderRadius: 40,
          backgroundColor: theme.palette.common.white,
        }),
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          height: "1.75rem",
          width: "1.75rem",
          translate: "-1rem 0.125rem",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          height: "3.25rem",
          borderRadius: 40,
          color: theme.palette.common.white,
        }),
      },
    },
  },
} as ThemeOptions);
