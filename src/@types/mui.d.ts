/**
 * If you encounter any issues, review the following documentation.
 * @see https://mui.com/material-ui/customization/theming/#custom-variables
 */

export declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    [key: string]: number;
  }

  interface Palette {
    kind: {
      attraction: string;
      food: string;
      hotel: string;
      activity: string;
    };
  }
}
