import { ReactNode } from "react";
import { MAIN_WIDTH, NAVBAR_HEIGHT } from "../../utils/constants";
import { Navbar } from "../navigation/navbar";
import { SidebarDesktop } from "../navigation/sidebar-desktop";
import { Flex } from "../shared/flex";

type Props = {
  children?: ReactNode;
};

export const HomePageContainer = ({ children }: Props) => {
  return (
    <Flex y xc yc sx={{ height: "80vh" }}>
      {children}
    </Flex>
  );
};

export const FormPageContainer = ({ children }: Props) => {
  return (
    <Flex y xc sx={{ mt: 4 }}>
      {children}
    </Flex>
  );
};

export const AuthPageContainer = ({ children }: Props) => {
  return (
    <Flex y fullwidth fullheight sx={{ bgcolor: "neutral.100", minHeight: "100vh", overflow: "hidden" }}>
      <Navbar />
      <Flex x fullwidth sx={{ height: `calc(100vh - ${NAVBAR_HEIGHT}px)`, overflowX: "hidden" }}>
        <SidebarDesktop />
        <Flex
          x
          xc
          component="main"
          sx={{
            flex: 1,
            overflowY: "auto",
            height: "100%"
          }}
        >
          <Flex y sx={{ height: "100%", width: { xs: "100%", lg: MAIN_WIDTH }, p: 1 }}>
            {children}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
