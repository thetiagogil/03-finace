import { Link, List, ListItem } from "@mui/joy";
import { useContext } from "react";
import { Link as ReactLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";
import { linksArray } from "../arrays/links-array";
import { Flex } from "../shared/flex";

export const SidebarContent = () => {
  const { pathname } = useLocation();
  const { hasData, loadingData } = useContext(AuthContext);

  return (
    <Flex y fullwidth>
      {!loadingData && (
        <List sx={{ py: 0 }}>
          {linksArray.map((link, index) => {
            const selected = pathname.startsWith(link.path);
            const isDisabled = (link.path === "/dashboard" || link.path === "/overview") && !hasData;
            return (
              <ListItem
                key={index}
                sx={{
                  py: 1.5,
                  px: 4,
                  bgcolor: selected ? "neutral.300" : "transparent",
                  transition: "0.3s",
                  "&:hover": { bgcolor: "neutral.200" }
                }}
              >
                <Link
                  component={ReactLink}
                  underline="none"
                  to={link.path}
                  startDecorator={link.icons && (selected ? link.icons?.iconSelected : link.icons?.icon)}
                  disabled={isDisabled}
                  sx={{ width: "100%", color: "neutral.900" }}
                >
                  {link.icons && link.title}
                </Link>
              </ListItem>
            );
          })}
        </List>
      )}
    </Flex>
  );
};
