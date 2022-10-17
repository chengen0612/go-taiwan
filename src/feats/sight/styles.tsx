import { styled } from "@mui/system";
import Container from "@mui/material/Container";

export const Main = styled(Container)({
  marginTop: "2.5rem",
  width: "calc(100% - 3rem)",
  maxWidth: "48rem",
  display: "grid",
  rowGap: "1.75rem",
});

export const Header = styled("header")({
  aspectRatio: "3 / 2",
  borderRadius: "1.5rem",
  boxShadow:
    "0px 0px 2px rgba(40, 41, 61, 0.04), 0px 4px 8px rgba(96, 97, 112, 0.16)",
  overflow: "hidden",
  // Fix the inconsistent border radius between animations on safari.
  // Below is a different solution to similar issues.
  // https://gist.github.com/ayamflow/b602ab436ac9f05660d9c15190f4fd7b
  isolation: "isolate",
});

export const Heading = styled("section")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const Section = styled("section")({
  display: "flex",
  flexDirection: "column",
  rowGap: "1.25rem",
});

export const Title = styled("h2")({ margin: 0, fontSize: "1.75rem" });

export const Subtitle = styled("h3")({ margin: 0, fontSize: "1.375rem" });

export const Details = styled("section")({
  padding: "1rem 1.25rem",
  borderRadius: "0.5rem",
  backgroundColor: "#f1f8ea",
});

export const Recommendations = styled("div")(({ theme }) => ({
  display: "grid",
  gap: "1.5rem",
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
}));
