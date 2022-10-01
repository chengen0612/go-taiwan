/**
 * If you encounter any issues, review the following documentation.
 * @see https://mui.com/material-ui/customization/palette/
 */

import "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    favorite: Palette["primary"];
  }

  interface PaletteOptions {
    favorite?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Badge" {
  interface BadgePropsColorOverrides {
    favorite: true;
  }
}
