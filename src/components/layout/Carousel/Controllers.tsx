import { styled } from "@mui/material/styles";
import ButtonBase, { ButtonBaseProps } from "@mui/material/ButtonBase";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

interface ControllerProps extends ButtonBaseProps {
  horizontal: "left" | "right";
}

const Controller = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== "horizontal",
})<ControllerProps>(({ horizontal = "left", theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  borderRadius: "50%",
  color: theme.palette.common.white,
  backgroundColor: theme.palette.common.black,
  opacity: 0.5,
  ...(horizontal === "left" ? { left: "1.25rem" } : { right: "1.25rem" }),
}));

interface ControllersProps {
  onPrev: () => void;
  onNext: () => void;
}

function Controllers({ onPrev, onNext }: ControllersProps) {
  return (
    <>
      <Controller horizontal="left" onClick={onPrev}>
        <ArrowLeftIcon />
      </Controller>
      <Controller horizontal="right" onClick={onNext}>
        <ArrowRightIcon />
      </Controller>
    </>
  );
}

export default Controllers;
