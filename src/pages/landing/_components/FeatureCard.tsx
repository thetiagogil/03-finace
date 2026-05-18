import { Box, Card, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  text: string;
}

export const FeatureCard = ({ icon, title, text }: FeatureCardProps) => (
  <Card variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
    <Box
      sx={{
        width: 42,
        height: 42,
        display: "grid",
        placeItems: "center",
        bgcolor: "#f1f4f8",
        borderRadius: 1.5,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      {icon}
    </Box>
    <Typography variant="h6" sx={{ mt: 2, fontWeight: 700 }}>
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
      {text}
    </Typography>
  </Card>
);
