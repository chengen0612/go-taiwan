import { useCallback, FormEvent } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/system/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextFiled from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

import Select from "#/components/search/Select";

import { searchFormTheme } from "#/services/mui/theme";
import { CITIES, GENRES, FieldName } from "#/utils/constants/search";

function SearchForm() {
  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();

    const formNode = event.target as HTMLFormElement;
    const formData = new FormData(formNode);
    console.log(formData.get(FieldName.City));
    console.log(formData.get(FieldName.Genre));
    console.log(formData.get(FieldName.Search));
  }, []);

  return (
    <ThemeProvider theme={searchFormTheme}>
      <Box
        sx={{
          position: "relative",
          top: "76vh",
          margin: "0 2vw 9.4vh",
          height: "fit-content",
          width: "100%",
          paddingBottom: "9.4vh",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "common.white",
          }}
        >
          訂製你的專屬旅程
        </Typography>
        <Stack
          component="form"
          spacing={1.5}
          sx={{ marginTop: "1.25rem" }}
          onSubmit={handleSubmit}
        >
          <Select name={FieldName.City} options={Object.values(CITIES)} />
          <Select name={FieldName.Genre} options={Object.values(GENRES)} />
          <TextFiled
            type="search"
            name={FieldName.Search}
            autoComplete="off"
            placeholder="輸入關鍵字..."
            inputProps={{ sx: { paddingLeft: "1.5rem" } }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ fontSize: "inherit" }}
          >
            <SearchIcon sx={{ marginRight: "0.25rem", fontSize: "1.75rem" }} />
            搜尋
          </Button>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default SearchForm;
