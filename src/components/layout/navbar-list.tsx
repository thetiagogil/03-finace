import { Link, List, ListItem } from "@mui/joy";
import { useContext } from "react";
import { Link as ReactLink, useLocation } from "react-router-dom";
import { InfoContext } from "../../contexts/info.context";
import { MAIN_BORDER_RADIUS } from "../../utils/constants";
import { linksArray } from "../arrays/links-array";

export const NavbarList = () => {
  const { pathname } = useLocation();
  const { userHasData, loadingUserHasData } = useContext(InfoContext);
  return (
    <>
      {!loadingUserHasData && (
        <List
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: { xs: "start", md: "center" },
            py: 0,
            gap: { xs: 1, md: 0 }
          }}
        >
          {linksArray.map((link, index) => {
            const selected = pathname.startsWith(link.path);
            const isDisabled = link.path !== "/transactions" && !userHasData;
            return (
              <ListItem
                key={index}
                sx={{
                  px: 0,
                  py: 0
                }}
              >
                <Link
                  component={ReactLink}
                  color="neutral"
                  underline="none"
                  to={link.path}
                  disabled={isDisabled}
                  sx={{
                    height: "100%",
                    mx: 1,
                    px: 3,
                    bgcolor: selected ? "neutral.200" : "transparent",
                    color: selected ? "primary.400" : "neutral.400",
                    borderRadius: selected ? MAIN_BORDER_RADIUS : 0,
                    fontWeight: selected ? 600 : 400,
                    textDecoration: isDisabled ? "line-through" : "none",
                    transition: "0.3s",
                    "&:hover": { bgcolor: "neutral.300", color: "primary.500", borderRadius: MAIN_BORDER_RADIUS }
                  }}
                >
                  {link.title}
                </Link>
              </ListItem>
            );
          })}
        </List>
      )}
    </>
  );
};
