import { NAVBAR_HEIGHT } from "../../utils/constants";
import { NavbarContent } from "../layout/navbar-content";
import { Flex } from "../shared/flex";

export const Navbar = () => {
  return (
    <Flex x yc fullwidth sx={{ bgcolor: "primary.800", height: NAVBAR_HEIGHT }}>
      <NavbarContent />
    </Flex>
  );
};
