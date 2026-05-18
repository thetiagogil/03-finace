import { Box, Container, Stack } from "@mui/material";
import { DashboardCallouts } from "../../features/finance/components/DashboardCallouts";
import { MonthlyNetChart } from "../../features/finance/components/MonthlyNetChart";
import { MonthlySummaryCards } from "../../features/finance/components/MonthlySummaryCards";
import { NewRecordButton } from "../../features/finance/components/NewRecordButton";
import { TopExpensesPanel } from "../../features/finance/components/TopExpensesPanel";
import { PageHeader } from "../../shared/components/layout/PageHeader";
import { EmptyState } from "../../shared/components/ui/EmptyState";
import { useDashboardPage } from "./hooks/useDashboardPage";

export const DashboardPage = () => {
  const { records, currentDate, hasRecords } = useDashboardPage();

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Stack spacing={5}>
        <PageHeader
          eyebrow={currentDate.toLocaleString(undefined, {
            month: "long",
            year: "numeric",
          })}
          title="Dashboard"
          titleVariant="h2"
          titleTopMargin={1}
          titleMaxWidth={760}
          descriptionMaxWidth={620}
          description="Track what you actually earn and spend, and see how it stacks up against what you intended."
          actions={<NewRecordButton />}
        />

        {hasRecords ? (
          <>
            <MonthlySummaryCards records={records} currentDate={currentDate} />

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
                gap: 3,
              }}
            >
              <MonthlyNetChart records={records} currentDate={currentDate} />
              <TopExpensesPanel records={records} currentDate={currentDate} />
            </Box>

            <DashboardCallouts records={records} currentDate={currentDate} />
          </>
        ) : (
          <EmptyState
            title="No finance records yet"
            description="Create your first planned or tracked record to unlock dashboard totals, charts, and monthly comparisons."
          />
        )}
      </Stack>
    </Container>
  );
};
