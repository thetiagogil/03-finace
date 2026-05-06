import { Drawer, IconButton, Typography } from "@mui/joy";
import { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { SidebarContent } from "../layout/sidebar-content";
import { Flex } from "../shared/flex";

export const SidebarMobile = () => {
  const [open, setOpen] = useState(false);
  return (
    <Flex x>
      <IconButton variant="plain" color="neutral" onClick={() => setOpen(true)}>
        <IoIosMenu size={30} color="white" />
      </IconButton>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Flex x xc yc fullwidth>
          <Typography level="title-md" py={1.5}>
            FIN/ACE
          </Typography>
        </Flex>
        <SidebarContent />
      </Drawer>
    </Flex>
  );
};
