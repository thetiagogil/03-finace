import { Select } from "@mui/joy";
import { MAIN_BORDER_RADIUS } from "../../utils/constants";
import { Flex } from "../shared/flex";

export const TxFilters = () => {
  const stylesSelect = { width: { xs: "100%", md: 200 }, borderRadius: MAIN_BORDER_RADIUS };
  return (
    <Flex gap2 sx={{ width: { xs: "100%", md: "auto" } }}>
      <Select placeholder="Mock Filter" sx={stylesSelect} />
      <Select placeholder="Mock Filter" sx={stylesSelect} />
    </Flex>
  );
};
