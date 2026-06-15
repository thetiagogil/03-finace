import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import type { SvgIconComponent } from "@mui/icons-material";
import { useState, type ReactNode } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { logout } from "../../../features/auth/storage/auth-storage";

interface PageShellProps {
  children: ReactNode;
}

interface NavItem {
  path: string;
  label: string;
  icon: SvgIconComponent;
}

const navItems: NavItem[] = [
  { path: "/dashboard", label: "Dashboard", icon: DashboardOutlinedIcon },
  { path: "/records", label: "Records", icon: ReceiptLongOutlinedIcon },
  { path: "/ledger", label: "Ledger", icon: TableChartOutlinedIcon },
  { path: "/compare", label: "Compare", icon: CompareArrowsOutlinedIcon },
  { path: "/trends", label: "Trends", icon: ShowChartOutlinedIcon },
  { path: "/categories", label: "Categories", icon: CategoryOutlinedIcon },
];

export const PageShell = ({ children }: PageShellProps) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          backgroundColor: "rgba(255, 255, 255, 0.84)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ gap: { xs: 1, sm: 2 }, minWidth: 0, py: 1 }}
          >
            {isAuthenticated && (
              <IconButton
                sx={{ display: { xs: "inline-flex", md: "none" } }}
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Stack
              component={Link}
              to={isAuthenticated ? "/dashboard" : "/"}
              direction="row"
              alignItems="center"
              spacing={1.5}
              sx={{
                color: "text.primary",
                textDecoration: "none",
                minWidth: 0,
                flexShrink: 1,
              }}
            >
              <Box
                component="img"
                src="/favicon.svg"
                alt=""
                aria-hidden="true"
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "8px",
                  display: "block",
                  flexShrink: 0,
                }}
              />
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  variant="h6"
                  sx={{
                    lineHeight: 1,
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                  }}
                >
                  FIN<span style={{ color: "#69758a" }}>/</span>ACE
                </Typography>
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    lineHeight: 1.2,
                  }}
                >
                  Plan vs. Reality
                </Typography>
              </Box>
            </Stack>
            {isAuthenticated && (
              <Stack
                component="nav"
                direction="row"
                spacing={0.5}
                sx={{ display: { xs: "none", md: "flex" }, mx: "auto" }}
              >
                {navItems.map((item) => (
                  <NavButton key={item.path} item={item} />
                ))}
              </Stack>
            )}
            <Stack
              direction="row"
              spacing={{ xs: 0.5, sm: 1 }}
              sx={{ ml: "auto", flexShrink: 0 }}
            >
              {isAuthenticated ? (
                <Tooltip title="Log out">
                  <IconButton
                    aria-label="Log out"
                    color="primary"
                    onClick={handleLogout}
                    sx={{
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <LogoutOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              ) : (
                <>
                  <Button
                    component={Link}
                    to="/login"
                    variant="text"
                    sx={{ px: { xs: 1, sm: 1.5 } }}
                  >
                    Log in
                  </Button>
                  <Button
                    component={Link}
                    to="/signup"
                    variant="contained"
                    sx={{ px: { xs: 1.25, sm: 2 } }}
                  >
                    Sign up
                  </Button>
                </>
              )}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 280, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            FIN/ACE
          </Typography>
          <Stack spacing={0.5}>
            {navItems.map((item) => (
              <NavButton
                key={item.path}
                item={item}
                onClick={() => setDrawerOpen(false)}
              />
            ))}
          </Stack>
        </Box>
      </Drawer>
      {children}
    </Box>
  );
};

const NavButton = ({
  item,
  onClick,
}: {
  item: NavItem;
  onClick?: () => void;
}) => {
  const Icon = item.icon;
  return (
    <Button
      component={NavLink}
      to={item.path}
      onClick={onClick}
      startIcon={<Icon />}
      sx={{
        color: "text.secondary",
        px: 1.5,
        "&.active": {
          bgcolor: "rgba(36, 61, 115, 0.08)",
          color: "text.primary",
        },
      }}
    >
      {item.label}
    </Button>
  );
};
