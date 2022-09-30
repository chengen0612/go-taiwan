import { memo } from "react";
import { styled } from "@mui/system";
import Container from "@mui/material/Container";
import Tab, { TabProps } from "@mui/material/Tab";

import { Kind } from "#/utils/constants/kind";

const Root = styled(Container)({
  marginTop: "2.5rem",
  width: "calc(100% - 3rem)",
  maxWidth: "48rem",
});

interface StyledTabProps extends TabProps {
  value: Kind;
}

const StyledTab = memo(
  styled((props: StyledTabProps) => <Tab {...props} />)({
    width: "25%",
    minWidth: "unset",
    maxWidth: "7.5rem",
  })
);

const CardList = styled("div")({
  marginTop: "1.75rem",
  display: "grid",
  rowGap: "1rem",
});

export { Root, CardList, StyledTab as Tab };
