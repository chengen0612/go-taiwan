import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PlaceIcon from "@mui/icons-material/Place";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PhoneIcon from "@mui/icons-material/Phone";

type PrefixIconType = "city" | "date" | "time" | "address" | "phone";

export interface IconPrefixTextProps {
  type: PrefixIconType;
  value: string;
}

const getPrefixIcon = (type: PrefixIconType) =>
  ({
    city: PlaceIcon,
    date: DateRangeIcon,
    time: AccessTimeIcon,
    address: DirectionsCarIcon,
    phone: PhoneIcon,
  }[type]);

function IconPrefixText({ type, value }: IconPrefixTextProps) {
  const PrefixIcon = getPrefixIcon(type);

  return (
    <Box
      sx={{
        mt: 0.25,
        display: "grid",
        gridTemplateColumns: "min-content auto",
        columnGap: 0.75,
        fontSize: "1rem",
        color: "grey.500",
      }}
    >
      <PrefixIcon />
      <Typography
        component="p"
        sx={{
          pt: 0.25,
          fontSize: "inherit",
          overflowWrap: "anywhere",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

export default IconPrefixText;
