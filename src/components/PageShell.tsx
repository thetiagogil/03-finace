import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import { AppBar, Avatar, Box, Button, Container, Divider, Drawer, IconButton, Menu, MenuItem, Stack, Toolbar, Typography } from "@mui/material";
import type { SvgIconComponent } from "@mui/icons-material";
import { useState, type ReactNode } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout, useAuth } from "../services/authService";
import { capitalizeFirstLetter } from "../utils/text";

interface PageShellProps {
  children: ReactNode;
}

interface NavItem {
  path: string;
  label: string;
  icon: SvgIconComponent;
}

const navItems: NavItem[] = [
  { path: "/dashboard", label: "Overview", icon: DashboardOutlinedIcon },
  { path: "/records", label: "Records", icon: PlaylistAddOutlinedIcon },
  { path: "/ledger", label: "Ledger", icon: BookOutlinedIcon },
  { path: "/compare", label: "Compare", icon: CompareArrowsOutlinedIcon },
  { path: "/trends", label: "Trends", icon: ShowChartOutlinedIcon },
  { path: "/categories", label: "Categories", icon: CategoryOutlinedIcon }
];

export const PageShell = ({ children }: PageShellProps) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const displayName = user ? capitalizeFirstLetter(user.name) : "";

  const handleLogout = () => {
    logout();
    setAnchor(null);
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
          backdropFilter: "blur(12px)"
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ gap: 2, py: 1 }}>
            {isAuthenticated && (
              <IconButton sx={{ display: { xs: "inline-flex", md: "none" } }} onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
            )}
            <Stack component={Link} to={isAuthenticated ? "/dashboard" : "/"} direction="row" alignItems="center" spacing={1.5} sx={{ color: "text.primary", textDecoration: "none", flexShrink: 0 }}>
              <Avatar variant="rounded" sx={{ width: 32, height: 32, bgcolor: "primary.main", fontWeight: 700 }}>
                F
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ lineHeight: 1, fontWeight: 700, letterSpacing: "-0.03em" }}>
                  FIN<span style={{ color: "#69758a" }}>/</span>ACE
                </Typography>
                <Typography sx={{ color: "text.secondary", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.18em", lineHeight: 1.2 }}>
                  Plan vs. Reality
                </Typography>
              </Box>
            </Stack>
            {isAuthenticated && (
              <Stack component="nav" direction="row" spacing={0.5} sx={{ display: { xs: "none", md: "flex" }, mx: "auto" }}>
                {navItems.map(item => (
                  <NavButton key={item.path} item={item} />
                ))}
              </Stack>
            )}
            <Stack direction="row" spacing={1} sx={{ ml: "auto" }}>
              {isAuthenticated && user ? (
                <>
                  <Button variant="outlined" startIcon={<AccountCircleOutlinedIcon />} onClick={event => setAnchor(event.currentTarget)}>
                    <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                      {displayName}
                    </Box>
                  </Button>
                  <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
                    <Box sx={{ px: 2, py: 1 }}>
                      <Typography fontWeight={600}>{displayName}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {user.email}
                      </Typography>
                    </Box>
                    <Divider />
                    <MenuItem onClick={handleLogout} sx={{ color: "error.main", gap: 1 }}>
                      <LogoutOutlinedIcon fontSize="small" /> Sign out
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button component={Link} to="/login" variant="text">
                    Sign in
                  </Button>
                  <Button component={Link} to="/signup" variant="contained">
                    Get started
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
            {navItems.map(item => (
              <NavButton key={item.path} item={item} onClick={() => setDrawerOpen(false)} />
            ))}
          </Stack>
        </Box>
      </Drawer>
      {children}
    </Box>
  );
};

const NavButton = ({ item, onClick }: { item: NavItem; onClick?: () => void }) => {
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
          color: "text.primary"
        }
      }}
    >
      {item.label}
    </Button>
  );
};
