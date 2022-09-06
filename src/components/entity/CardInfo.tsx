import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SvgIcon from "@mui/material/SvgIcon";
import PlaceIcon from "@mui/icons-material/Place";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PhoneIcon from "@mui/icons-material/Phone";

interface CardInfoProps {
  type: "city" | "date" | "time" | "address" | "phone";
  value?: string;
}

const typeIconMap: Record<CardInfoProps["type"], typeof SvgIcon> = {
  city: PlaceIcon,
  date: DateRangeIcon,
  time: AccessTimeIcon,
  address: DirectionsCarIcon,
  phone: PhoneIcon,
};

/**
 * The main mission of this component is to map information
 * with corresponding icon.
 */
function CardInfo({ type, value }: CardInfoProps) {
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
        sx={{ pt: 0.25, verticalAlign: "super", fontSize: "inherit" }}
      >
        {value || "無資訊"}
      </Typography>
    </Box>
  );
}

export default CardInfo;
