import { Card, Typography } from "@mui/material";

interface RecordsSummaryProps {
  label: string;
  value: string;
  color: string;
}

export const RecordsSummary = ({
  label,
  value,
  color,
}: RecordsSummaryProps) => (
  <Card variant="outlined" sx={{ p: 2.5, borderRadius: 3 }}>
    <Typography
      variant="caption"
      sx={{
        color: "text.secondary",
        textTransform: "uppercase",
        letterSpacing: "0.16em",
      }}
    >
      {label}
    </Typography>
    <Typography variant="h4" sx={{ mt: 1, color, fontWeight: 700 }}>
      {value}
    </Typography>
  </Card>
);
