import { Container, Stack } from "@mui/material";
import { CompareCategoryChart } from "../../features/finance/components/CompareCategoryChart";
import { CompareCategoryTable } from "../../features/finance/components/CompareCategoryTable";
import { CompareStats } from "../../features/finance/components/CompareStats";
import { formatCurrency } from "../../features/finance/lib/formatters";
import { PageHeader } from "../../shared/components/layout/PageHeader";
import { CompareHeaderControls } from "./_components/CompareHeaderControls";
import { useComparePage } from "./hooks/useComparePage";

export const ComparePage = () => {
  const page = useComparePage();

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Stack spacing={4}>
        <PageHeader
          eyebrow={`Side by side - ${page.periodLabel}`}
          title="Compare"
          description="See where reality drifted from your plan, category by category."
          actions={
            <CompareHeaderControls
              year={page.year}
              month={page.month}
              years={page.years}
              type={page.type}
              onPeriodChange={page.setPeriod}
              onTypeChange={page.setType}
            />
          }
        />
        <CompareStats
          trackedTotal={page.totals.tracked}
          plannedTotal={page.totals.planned}
          riskCount={page.riskCount}
          riskLabel={page.riskLabel}
          formatValue={formatCurrency}
        />
        <CompareCategoryChart
          rows={page.rows}
          type={page.type}
          emptyTitle={page.emptyTitle}
          emptyDescription={page.emptyDescription}
        />
        <CompareCategoryTable
          rows={page.rows}
          type={page.type}
          emptyTitle={page.emptyTitle}
          emptyDescription={page.emptyDescription}
        />
      </Stack>
    </Container>
  );
};
