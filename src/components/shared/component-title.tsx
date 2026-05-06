import { Typography } from "@mui/joy";

type ComponentTitleProps = {
  title: string;
};

export const ComponentTitle = ({ title }: ComponentTitleProps) => {
  return <Typography sx={{ fontSize: 24, fontWeight: 600 }} children={title} />;
};
