import { Container, Stack } from "@mui/material";
import {
  LedgerNetSection,
  LedgerPivotSection,
} from "../../features/finance/components/LedgerSections";
import { PageHeader } from "../../shared/components/layout/PageHeader";
import { EmptyState } from "../../shared/components/ui/EmptyState";
import { LedgerHeaderControls } from "./_components/LedgerHeaderControls";
import { useLedgerPage } from "./hooks/useLedgerPage";

export const LedgerPage = () => {
  const page = useLedgerPage();

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Stack spacing={4}>
        <PageHeader
          eyebrow={`Ledger - ${page.year}`}
          title="Ledger"
          description="Review income, expenses, and net totals by category across the year."
          actions={
            <LedgerHeaderControls
              year={page.year}
              years={page.years}
              mode={page.mode}
              onYearChange={page.setYear}
              onModeChange={page.setMode}
            />
          }
        />
        {page.yearRecords.length === 0 ? (
          <EmptyState
            title={page.emptyTitle}
            description={page.emptyDescription}
          />
        ) : (
          <>
            <LedgerPivotSection
              title="Income"
              type="income"
              records={page.yearRecords}
              mode={page.mode}
            />
            <LedgerPivotSection
              title="Expenses"
              type="expense"
              records={page.yearRecords}
              mode={page.mode}
            />
            <LedgerNetSection records={page.yearRecords} mode={page.mode} />
          </>
        )}
      </Stack>
    </Container>
  );
};
