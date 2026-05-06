import { Button, Typography } from "@mui/joy";
import { Link } from "react-router-dom";
import { HomePageContainer } from "../components/shared/containers";
import { Flex } from "../components/shared/flex";

export const HomePage = () => {
  const buttonStyle = { width: { xs: "90%", lg: 400 } };
  return (
    <HomePageContainer>
      <Flex y xc gap={6} fullwidth>
        <Flex y xc>
          <Typography level="h2">FIN/ACE</Typography>
          <Typography level="h4">Ace your finances</Typography>
        </Flex>
        <Flex y xc gap2 fullwidth>
          <Button component={Link} to="/signup" variant="solid" size="lg" sx={buttonStyle}>
            Sign up
          </Button>
          <Button component={Link} to="/login" variant="outlined" size="lg" sx={buttonStyle}>
            Log in
          </Button>
        </Flex>
      </Flex>
    </HomePageContainer>
  );
};
