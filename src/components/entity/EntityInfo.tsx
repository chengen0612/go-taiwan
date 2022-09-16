import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SvgIcon from "@mui/material/SvgIcon";
import PlaceIcon from "@mui/icons-material/Place";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PhoneIcon from "@mui/icons-material/Phone";

interface EntityInfoProps {
  type: "city" | "date" | "time" | "address" | "phone";
  value?: string;
}

export type EntityInfoType = EntityInfoProps["type"];

const typeIconMap: Record<EntityInfoProps["type"], typeof SvgIcon> = {
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
function EntityInfo({ type, value }: EntityInfoProps) {
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

export default EntityInfo;
