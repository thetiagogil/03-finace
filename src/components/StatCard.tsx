import { Box, Card, Chip, LinearProgress, Stack, Typography } from "@mui/material";
import { formatCurrency } from "../utils/formatters";

interface StatCardProps {
  label: string;
  planned: number;
  tracked: number;
  tone?: "income" | "expense" | "neutral";
}

export const StatCard = ({ label, planned, tracked, tone = "neutral" }: StatCardProps) => {
  const diff = tracked - planned;
  const diffGood = tone === "expense" ? diff <= 0 : diff >= 0;
  const percent = planned !== 0 ? (tracked / planned) * 100 : 0;
  const accent = tone === "income" ? "success.main" : tone === "expense" ? "error.main" : "primary.main";

  return (
    <Card variant="outlined" sx={{ p: 2.5, borderRadius: 3 }}>
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="caption" sx={{ color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.16em" }}>
            {label}
          </Typography>
          <Chip
            size="small"
            label={`${diff >= 0 ? "+" : ""}${formatCurrency(diff)}`}
            sx={{
              bgcolor: diffGood ? "success.light" : "error.light",
              color: diffGood ? "success.main" : "error.main",
              fontWeight: 700
            }}
          />
        </Stack>
        <Box>
          <Typography variant="h4" sx={{ color: accent, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
            {formatCurrency(tracked)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Planned <Box component="span" sx={{ color: "text.primary" }}>{formatCurrency(planned)}</Box>
          </Typography>
        </Box>
        <Box>
          <LinearProgress
            variant="determinate"
            value={Math.min(100, Math.max(0, percent))}
            sx={{
              height: 6,
              borderRadius: 999,
              bgcolor: "rgba(105, 117, 138, 0.16)",
              "& .MuiLinearProgress-bar": { bgcolor: accent }
            }}
          />
          <Typography variant="caption" color="text.secondary">
            {Math.round(percent)}% of plan
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
};
