import { Box, Card, LinearProgress, Stack, Typography } from "@mui/material";
import { FINANCE_COLORS } from "../../../features/finance/lib/colors";
import { PreviewMetricTile } from "./PreviewMetricTile";

const previewExpenses = [
  { label: "Groceries", planned: 450, tracked: 510 },
  { label: "Dining", planned: 200, tracked: 285 },
  { label: "Transport", planned: 120, tracked: 95 },
];

export const LandingPreviewCard = () => (
  <Card variant="outlined" sx={{ p: 3, borderRadius: 4 }}>
    <Stack sx={{ mb: 2 }}>
      <Typography
        variant="caption"
        sx={{
          color: "text.secondary",
          textTransform: "uppercase",
          letterSpacing: "0.18em",
        }}
      >
        April 2026
      </Typography>
    </Stack>
    <Stack direction="row" spacing={1.5}>
      <PreviewMetricTile
        label="Tracked"
        value="€3,580"
        color={FINANCE_COLORS.trackedIncome}
        delta="+12% vs plan"
      />
      <PreviewMetricTile
        label="Planned"
        value="€3,200"
        color={FINANCE_COLORS.plannedIncome}
      />
    </Stack>
    <Stack spacing={2} sx={{ mt: 3 }}>
      {previewExpenses.map((item) => {
        const percent = Math.min(100, (item.tracked / item.planned) * 100);
        return (
          <Box key={item.label}>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mb: 0.75 }}
            >
              <Typography variant="body2" fontWeight={600}>
                {item.label}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                €{item.tracked} / €{item.planned}
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={percent}
              sx={{
                height: 6,
                borderRadius: 999,
                bgcolor: "rgba(105,117,138,0.16)",
                "& .MuiLinearProgress-bar": {
                  bgcolor:
                    item.tracked > item.planned
                      ? FINANCE_COLORS.trackedExpense
                      : FINANCE_COLORS.plannedExpense,
                },
              }}
            />
          </Box>
        );
      })}
    </Stack>
  </Card>
);
