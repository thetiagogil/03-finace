import { CircularProgress } from "@mui/joy";
import { Flex } from "./flex";

type LoadingProps = {
  size?: "sm" | "md" | "lg";
};

export const Loading = ({ size = "sm" }: LoadingProps) => {
  return (
    <Flex sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress size={size} />
    </Flex>
  );
};
