import { Grid, Stack, Typography } from "@mui/joy";
import { MAIN_WIDTH } from "../../utils/constants";
import { NavbarMobile } from "../navigation/navbar-mobile";
import { Flex } from "../shared/flex";
import { NavbarDropdown } from "./navbar-dropdown";
import { NavbarList } from "./navbar-list";

export const NavbarContent = () => {
  return (
    <Grid container sx={{ width: { xs: "100%", lg: MAIN_WIDTH } }}>
      <Grid xs={4} sx={{ display: { xs: "block", md: "none" }, pl: 2 }}>
        <NavbarMobile />
      </Grid>
      <Grid xs={4} md={2} sx={{ pl: { xs: 2, lg: 0 } }}>
        <Flex x yc fullheight sx={{ justifyContent: { xs: "center", md: "start" } }}>
          <Typography level="title-md">FIN/ACE</Typography>
        </Flex>
      </Grid>
      <Grid md={8} sx={{ display: { xs: "none", md: "block" } }}>
        <NavbarList />
      </Grid>
      <Stack component={Grid} xs={4} md={2} sx={{ alignItems: "end", pr: { xs: 2, lg: 0 } }}>
        <NavbarDropdown />
      </Stack>
    </Grid>
  );
};
