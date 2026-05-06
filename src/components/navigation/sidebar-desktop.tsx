import { Box, Divider } from "@mui/joy";
import { SIDEBAR_WIDTH } from "../../utils/constants";
import { SidebarContent } from "../layout/sidebar-content";

export const SidebarDesktop = () => {
  return (
    <Box
      component="nav"
      sx={{
        display: { xs: "none", lg: "flex" },
        minWidth: SIDEBAR_WIDTH
      }}
    >
      <SidebarContent />
      <Divider orientation="vertical" />
    </Box>
  );
};
