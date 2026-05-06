import { CssBaseline } from "@mui/joy";
import { CssVarsProvider } from "@mui/joy/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./contexts/auth.context";
import { InfoContextProvider } from "./contexts/info.context.js";
import "./main.css";
import { App } from "./router/app.jsx";
import { theme } from "./utils/theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssVarsProvider theme={theme} defaultMode="light">
      <CssBaseline />
      <BrowserRouter>
        <AuthContextProvider>
          <InfoContextProvider>
            <App />
          </InfoContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </CssVarsProvider>
  </React.StrictMode>
);
