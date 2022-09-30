import Box from "@mui/material/Box";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "5rem",
        py: "0.5rem",
        textAlign: "center",
        fontSize: "0.875rem",
        color: "common.white",
        bgcolor: "primary.main",
      }}
    >
      © 2022 Evans Wu, All Rights Reserved
    </Box>
  );
}

export default Footer;
