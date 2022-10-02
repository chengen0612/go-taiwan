/**
 * Implement animation keyframes in material V5.
 * @see https://github.com/mui/material-ui/issues/24851
 */

import { keyframes } from "@mui/material/styles";

export type SlideEffect = "slide-left" | "slide-right";

export const slideLeft = keyframes`
   from {
     transform: translate(0);
   }
 
   to {
     transform: translate(-100%);
   }
 `;

export const slideRight = keyframes`
   from {
     transform: translate(-100%);
   }
 
   to {
     transform: translate(0);
   }
 `;
