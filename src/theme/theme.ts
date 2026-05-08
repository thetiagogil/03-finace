import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f8f9fb",
      paper: "#ffffff",
    },
    text: {
      primary: "#172033",
      secondary: "#69758a",
    },
    primary: {
      main: "#243d73",
      contrastText: "#f8f9fb",
    },
    success: {
      main: "#2f9d68",
      light: "#d6f0df",
    },
    error: {
      main: "#c44a36",
      light: "#f4d6cb",
    },
    divider: "#e2e7ef",
  },
  typography: {
    fontFamily:
      '"Inter", "Geist", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: "-0.04em",
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.035em",
    },
    h3: {
      fontWeight: 700,
      letterSpacing: "-0.03em",
    },
    h4: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderColor: "#e2e7ef",
          boxShadow: "none",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: "#ffffff",
        },
      },
    },
  },
});
