import React from "react";
import Container from "@mui/material/Container";

/**
 * Set the maximum width of each breakpoints,
 * center content to make the view of the application consistent.
 */

interface ContentBoundaryProps {
  component?: React.ElementType;
  children: React.ReactNode;
}

function ContentBoundary({
  component = "div",
  children,
}: ContentBoundaryProps) {
  return (
    <Container
      component={component}
      maxWidth="xl"
      sx={(theme) => ({
        width: "calc(100% - 3rem)",
        [theme.breakpoints.up("lg")]: {
          width: "84%",
        },
      })}
    >
      {children}
    </Container>
  );
}

export default ContentBoundary;
