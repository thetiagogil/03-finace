import { Box, Card } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";
import { ReactNode } from "react";

type DataCardProps = {
  children?: ReactNode;
  onClick?: () => void;
  bgcolor?: string;
  width?: number | string;
  height?: number | string;
  sx?: SxProps;
};

export const DataCard = ({ children, onClick, bgcolor, width, height, sx }: DataCardProps) => {
  const styles = {
    bgcolor: bgcolor,
    width: width,
    height: height,
    m: 1,
    border: "none",
    cursor: onClick ? "pointer" : "default",
    transition: "0.3s",
    "&:hover": {
      bgcolor: onClick ? "neutral.200" : bgcolor
    },
    ...sx
  };
  return (
    <Card component={onClick ? Box : Card} onClick={onClick} sx={styles}>
      {children}
    </Card>
  );
};
