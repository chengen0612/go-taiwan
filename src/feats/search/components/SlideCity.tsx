import { memo, useCallback, MouseEventHandler } from "react";
import { styled } from "@mui/material/styles";
import ButtonBase, { ButtonBaseProps } from "@mui/material/ButtonBase";

import { selectSearchCity, SetSearchPayload } from "#/store/slices/search";
import { useAppSelector } from "#/utils/hooks/store";
import { CITY } from "#/utils/constants/city";
import { SearchProperty } from "#/utils/models/search";

import { useOnSearchStart } from "../hooks";

const Wrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  columnGap: "0.5rem",
  overflowX: "scroll",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

interface CityButtonProps extends ButtonBaseProps {
  selected: boolean;
}

const CityButton = memo(
  styled(ButtonBase, {
    shouldForwardProp: (prop) => prop !== "selected",
  })<CityButtonProps>(({ selected, theme }) => ({
    height: "3rem",
    aspectRatio: "1 / 1",
    borderRadius: "50%",
    fontColor: theme.palette.grey[800],
    ...(selected && {
      backgroundColor: theme.palette.grey[200],
    }),
  }))
);

export function SlideCity() {
  const onSearchStart = useOnSearchStart();
  const selectedCity = useAppSelector(selectSearchCity);

  const handleClick = useCallback<MouseEventHandler<HTMLElement>>(
    (event) => {
      if (event.target instanceof HTMLElement) {
        const cityKey = event.target.dataset.key;
        const payload = {
          searchProperty: SearchProperty.City,
          value: cityKey,
        } as SetSearchPayload;

        onSearchStart(payload);
      }
    },
    [onSearchStart]
  );

  return (
    <Wrapper>
      {CITY.all.map((item) => (
        <CityButton
          key={item.key}
          data-key={item.key}
          selected={item.key === selectedCity}
          onClick={handleClick}
        >
          {item.value}
        </CityButton>
      ))}
    </Wrapper>
  );
}
