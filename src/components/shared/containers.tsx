import { Box } from "@mui/joy";
import { ReactNode } from "react";
import { MAIN_BGCOLOR, MAIN_WIDTH } from "../../utils/constants";
import { Navbar } from "../navigation/navbar";
import { Flex } from "../shared/flex";

type Props = {
  children?: ReactNode;
};

type ContentProps = {
  position: "left" | "right";
  children?: ReactNode;
};

type AuthPageContainerProps = {
  leftChildren?: ReactNode;
  rightChildren?: ReactNode;
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

export const Content = ({ position, children }: ContentProps) => {
  return (
    <Box
      component={"section"}
      sx={{
        width: position === "left" ? { xs: "100%", md: "80%" } : { xs: "100%", md: "20%" },
        py: 4,
        pl: position === "left" ? { xs: 2, lg: 0 } : 2,
        pr: position === "left" ? 2 : { xs: 2, lg: 0 },
        order: { xs: position === "left" ? 2 : 1, md: 0 }
        /* overflowY: { xs: "none", lg: "auto" } */
      }}
    >
      {children}
    </Box>
  );
};

export const AuthPageContainer = ({ leftChildren, rightChildren }: AuthPageContainerProps) => {
  return (
    <Flex y fullwidth fullheight sx={{ bgcolor: MAIN_BGCOLOR, height: "100vh" }}>
      <Navbar />
      <Flex component="main" x fullwidth sx={{ overflowX: "hidden" }}>
        <Flex x xc fullwidth>
          <Flex
            sx={{
              width: { xs: "100%", lg: MAIN_WIDTH },
              flexDirection: { xs: "column", md: "row" }
            }}
          >
            <Content position="left">{leftChildren}</Content>
            <Content position="right">{rightChildren}</Content>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
