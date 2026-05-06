"use client";
import { extendTheme } from "@mui/joy/styles";
import { MAIN_BORDER_RADIUS } from "./constants";

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {}
    },
    dark: {
      palette: {}
    }
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: {
          borderRadius: MAIN_BORDER_RADIUS,
          transition: "0.3s"
        }
      }
    }
  }
});
