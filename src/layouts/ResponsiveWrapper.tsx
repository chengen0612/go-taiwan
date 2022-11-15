import React from "react";
import { Theme, Breakpoint } from "@mui/material";
import Container, { ContainerProps } from "@mui/material/Container";

interface ResponsiveWrapperProps extends ContainerProps {
  component?: React.ElementType;
  maxWidth?: Extract<Breakpoint, "md" | "xl">;
  children: React.ReactNode;
}

// Return the styles based on breakpoints.
const getAdditionalStyles = (
  theme: Theme,
  maxWidth: ResponsiveWrapperProps["maxWidth"]
) => {
  if (maxWidth === "xl") {
    return {
      [theme.breakpoints.up("lg")]: {
        width: "84%",
      },
    };
  }

  return {};
};

/**
 * Specify how content responds across devices to create a consistent layout.
 */
function ResponsiveWrapper({
  component = "div",
  maxWidth = "xl",
  sx = [],
  children,
}: ResponsiveWrapperProps) {
  return (
    <Container
      component={component}
      maxWidth={maxWidth}
      sx={[
        (theme) => ({
          mt: "2.5rem",
          width: "calc(100% - 3rem)",
          ...getAdditionalStyles(theme, maxWidth),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Container>
  );
}

export default ResponsiveWrapper;
