import { createTheme } from "@mui/material/styles";

export const globalTheme = createTheme({
  breakpoints: {
    values: {
      sm: 480,
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: 18,
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
});

export const searchFormTheme = createTheme(
  {
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
  },
  globalTheme
);
