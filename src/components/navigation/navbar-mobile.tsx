import { Drawer, IconButton, Typography } from "@mui/joy";
import { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { NavbarList } from "../layout/navbar-list";
import { Flex } from "../shared/flex";

export const NavbarMobile = () => {
  const [open, setOpen] = useState(false);
  return (
    <Flex x>
      <IconButton variant="plain" color="neutral" onClick={() => setOpen(true)}>
        <IoIosMenu size={30} />
      </IconButton>
      <Drawer open={open} onClose={() => setOpen(false)} sx={{ display: { xs: "block", lg: "none" } }}>
        <Flex x xc yc fullwidth>
          <Typography level="title-md" py={1.5}>
            FIN/ACE
          </Typography>
        </Flex>
        <NavbarList />
      </Drawer>
    </Flex>
  );
};
