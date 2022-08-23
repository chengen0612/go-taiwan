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
