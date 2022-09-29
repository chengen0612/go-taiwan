import { styled } from "@mui/system";

export const Wrapper = styled("article")(({ theme }) => ({
  borderRadius: "1rem",
  padding: "1.5rem",
  backgroundColor: theme.palette.common.white,
  boxShadow:
    "0px 0px 2px rgba(40, 41, 61, 0.04), 0px 4px 8px rgba(96, 97, 112, 0.16)",
  overflow: "hidden", // Force flex box contents to shrink when there has no space.
}));

export const Root = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  columnGap: "1.5rem",
  [theme.breakpoints.up("sm")]: {
    columnGap: "2.5rem",
  },
}));

export const Detail = styled("div")(({ theme }) => ({
  alignSelf: "start",
  flex: 1,
  width: "33%",
  padding: "0.375rem 0",
  [theme.breakpoints.up("sm")]: {
    width: "unset",
    padding: "0.5rem 0",
  },
}));

export const Title = styled("h4")(({ theme }) => ({
  margin: "unset",
  fontSize: "1rem",
  fontWeight: 500,
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
  [theme.breakpoints.up("sm")]: {
    fontSize: "unset",
    fontWeight: 700,
  },
}));

export const CityValue = styled("p")(({ theme }) => ({
  fontSize: "0.875rem",
  [theme.breakpoints.up("sm")]: {
    fontSize: "1rem",
  },
}));

export const Tags = styled("div")({
  marginTop: "0.125rem",
  display: "flex",
  flexWrap: "wrap",
  gap: "0.25rem",
});
