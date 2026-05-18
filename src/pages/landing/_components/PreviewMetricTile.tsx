import { Card, Typography } from "@mui/material";

interface PreviewMetricTileProps {
  label: string;
  value: string;
  color: string;
  delta?: string;
}

export const PreviewMetricTile = ({
  label,
  value,
  color,
  delta,
}: PreviewMetricTileProps) => (
  <Card
    variant="outlined"
    sx={{ flex: 1, p: 2, bgcolor: "#f1f4f8", borderRadius: 2 }}
  >
    <Typography
      variant="caption"
      sx={{
        color: "text.secondary",
        textTransform: "uppercase",
        letterSpacing: "0.18em",
      }}
    >
      {label}
    </Typography>
    <Typography variant="h4" sx={{ color, fontWeight: 700, mt: 0.5 }}>
      {value}
    </Typography>
    {delta && (
      <Typography variant="caption" color="text.secondary">
        {delta}
      </Typography>
    )}
  </Card>
);
