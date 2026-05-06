import { Divider } from "@mui/joy";
import { NAVBAR_HEIGHT } from "../../utils/constants";
import { NavbarContent } from "../layout/navbar-content";
import { Flex } from "../shared/flex";

export const Navbar = () => {
  return (
    <Flex component={"nav"} y>
      <Flex x xc yc sx={{ height: NAVBAR_HEIGHT }}>
        <NavbarContent />
      </Flex>
      <Divider orientation="horizontal" />
    </Flex>
  );
};
