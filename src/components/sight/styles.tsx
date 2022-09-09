import { styled } from "@mui/system";

export const Header = styled("header")({ height: "40vh", border: "1px solid" });

export const Body = styled("main")({
  display: "grid",
  rowGap: "1.5rem",
  marginTop: "2.5rem",
  paddingRight: "1rem",
  paddingLeft: "1rem",
});

export const Title = styled("h2")({ margin: 0, fontSize: "1.75rem" });

export const Details = styled("section")(({ theme }) => ({
  padding: "1rem 1.25rem",
  borderRadius: "0.5rem",
  backgroundColor: theme.palette.secondary.light,
}));
