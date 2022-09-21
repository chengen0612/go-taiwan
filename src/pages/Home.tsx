import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import Graphic from "#/components/layout/Graphic";
import SearchForm from "#/components/search/SearchForm";

import LogoPath from "#/assets/images/logo.svg";

const Wrapper = styled("div")({
  position: "relative",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  paddingRight: "1.5rem",
  paddingLeft: "1.5rem",
  background: "center / cover url(src/assets/images/cover.png)",
  overflowX: "hidden",
});

const Moon = styled("div")(({ theme }) => ({
  position: "absolute",
  right: "16vw",
  top: "-20vh",
  width: "210%",
  aspectRatio: "1 / 1",
  borderRadius: "100%",
  backgroundColor: theme.palette.secondary.main,
}));

function Home() {
  return (
    <Wrapper>
      <Moon />
      <Graphic
        src="./src/assets/images/character.png"
        alt="character"
        aspectRatio="1 / 1"
        width="120%"
        sx={{ position: "absolute", top: "6vh" }}
      />
      <img
        src={LogoPath}
        alt="logo"
        style={{
          position: "absolute",
          top: "8vh",
          left: "12vw",
          width: "53vw",
        }}
      />
      <Typography
        variant="h1"
        sx={{
          position: "absolute",
          top: "50vh",
          fontFamily: "Noto Serif JP",
          fontSize: "40vw",
          fontWeight: "regular",
          color: "common.white",
        }}
      >
        台灣
      </Typography>
      <SearchForm />
    </Wrapper>
  );
}

export default Home;
