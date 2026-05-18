import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import type { ReactNode } from "react";
import { appTheme } from "../theme/theme";

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(23,32,51,0.06) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          },
        }}
      />
      {children}
    </ThemeProvider>
  );
};
