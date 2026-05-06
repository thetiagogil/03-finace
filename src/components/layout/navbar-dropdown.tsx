import { Dropdown, Menu, MenuButton, MenuItem, Typography } from "@mui/joy";
import { useCallback, useContext, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoPersonCircle } from "react-icons/io5";
import { PiSignOutThin, PiUserThin } from "react-icons/pi";
import { AuthContext } from "../../contexts/auth.context";
import { ProfileDrawer } from "../navigation/profile-drawer";
import { Flex } from "../shared/flex";

type CallbackProps = {
  isOpen: boolean | ((prevState: boolean) => boolean);
};

export const NavbarDropdown = () => {
  const { handleLogout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const handleOpenChange = useCallback(({ isOpen }: CallbackProps) => {
    setOpen(isOpen);
  }, []);

  return (
    <>
      <Dropdown open={open} onOpenChange={(_event, isOpen) => handleOpenChange({ isOpen })}>
        <MenuButton variant="plain" sx={{ py: 0, px: 1, transition: "0.3s", "&:hover": { bgcolor: "primary.900" } }}>
          <Flex x xc yc>
            <IoPersonCircle size={30} color="white" />
            {!open ? <IoIosArrowDown color="white" /> : <IoIosArrowUp color="white" />}
          </Flex>
        </MenuButton>
        <Menu placement="bottom-end">
          <MenuItem onClick={() => setOpenProfile(true)}>
            <Typography startDecorator={<PiUserThin />}>Profile</Typography>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Typography color="danger" startDecorator={<PiSignOutThin />}>
              Log Out
            </Typography>
          </MenuItem>
        </Menu>
      </Dropdown>
      <ProfileDrawer open={openProfile} onClose={() => setOpenProfile(false)} />
    </>
  );
};
