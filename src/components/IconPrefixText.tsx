import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SvgIcon from "@mui/material/SvgIcon";
import PlaceIcon from "@mui/icons-material/Place";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PhoneIcon from "@mui/icons-material/Phone";

type PrefixIconType = "city" | "date" | "time" | "address" | "phone";

const typeIconMap: Record<PrefixIconType, typeof SvgIcon> = {
  city: PlaceIcon,
  date: DateRangeIcon,
  time: AccessTimeIcon,
  address: DirectionsCarIcon,
  phone: PhoneIcon,
};

interface IconPrefixTextProps {
  type: PrefixIconType;
  value: string;
}

function IconPrefixText({ type, value }: IconPrefixTextProps) {
  const Icon = typeIconMap[type];

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
      <Icon />
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
export type { IconPrefixTextProps };
