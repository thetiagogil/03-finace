import { Container, Stack } from "@mui/material";
import { TrendCharts } from "../../features/finance/components/TrendCharts";
import { PageHeader } from "../../shared/components/layout/PageHeader";
import { EmptyState } from "../../shared/components/ui/EmptyState";
import { useTrendsPage } from "./hooks/useTrendsPage";

export const TrendsPage = () => {
  const { monthly, hasRecords } = useTrendsPage();

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Stack spacing={4}>
        <PageHeader
          eyebrow="Across time"
          title="Trends"
          description="How your year is unfolding."
        />
        {hasRecords ? (
          <TrendCharts data={monthly} />
        ) : (
          <EmptyState
            title="No trends yet"
            description="Add records across one or more months to see income, expense, and net movement over time."
          />
        )}
      </Stack>
    </Container>
  );
};
