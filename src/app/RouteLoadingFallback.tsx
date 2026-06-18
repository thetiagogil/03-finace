import { Box, CircularProgress, Typography } from "@mui/material";

export const RouteLoadingFallback = () => {
  return (
    <Box
      aria-live="polite"
      role="status"
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        minHeight: "100vh",
        justifyContent: "center",
      }}
    >
      <CircularProgress aria-hidden="true" size={28} thickness={4} />
      <Typography color="text.secondary" variant="body2">
        Loading page...
      </Typography>
    </Box>
  );
};
