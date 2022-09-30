import { styled } from "@mui/material";
import Container, { ContainerProps } from "@mui/material/Container";

const Root = styled((props: ContainerProps) => (
  <Container {...props} component="nav" />
))({
  paddingTop: "1rem",
  bgcolor: "common.white",
  boxShadow:
    "0px 0px 2px rgba(40, 41, 61, 0.04), 0px 4px 8px rgba(96, 97, 112, 0.16)",
});

const UpperHalf = styled("div")({
  height: "3.25rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  columnGap: "1.5rem",
});

const SearchBar = styled("div")({
  flex: "1",
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "min-content auto",
  columnGap: "0.5rem",
});

const LowerHalf = styled("div")({
  height: "4rem",
  display: "flex",
  columnGap: "0.75rem",
});

export { Root, UpperHalf, SearchBar, LowerHalf };
