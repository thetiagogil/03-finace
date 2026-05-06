import { Grid, Stack, Typography } from "@mui/joy";
import { SIDEBAR_WIDTH } from "../../utils/constants";
import { SidebarMobile } from "../navigation/sidebar-mobile";
import { Flex } from "../shared/flex";
import { NavbarDropdown } from "./navbar-dropdown";

export const NavbarContent = () => {
  return (
    <Grid container sx={{ width: "100%" }}>
      <Grid xs={4} sx={{ pl: 1, display: { xs: "block", lg: "none" } }}>
        <SidebarMobile />
      </Grid>
      <Grid xs={4} lg={6}>
        <Flex x xc yc fullheight sx={{ width: { xs: "100%", lg: SIDEBAR_WIDTH } }}>
          <Typography level="title-md" sx={{ color: "neutral.50" }}>
            FIN/ACE
          </Typography>
        </Flex>
      </Grid>
      <Stack component={Grid} xs={4} lg={6} sx={{ pr: 1, alignItems: "end" }}>
        <NavbarDropdown />
      </Stack>
    </Grid>
  );
};
