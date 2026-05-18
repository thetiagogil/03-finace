import { Container, Stack } from "@mui/material";
import { NewRecordButton } from "../../features/finance/components/NewRecordButton";
import { RecordsFilterPanel } from "../../features/finance/components/RecordsFilterPanel";
import { RecordsTable } from "../../features/finance/components/RecordsTable";
import { PageHeader } from "../../shared/components/layout/PageHeader";
import { RecordsTotalsGrid } from "./_components/RecordsTotalsGrid";
import { useRecordsPage } from "./hooks/useRecordsPage";

export const RecordsPage = () => {
  const page = useRecordsPage();

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Stack spacing={3}>
        <PageHeader
          eyebrow={`Records - ${page.periodLabel}`}
          title="Records"
          description="Create, filter, edit, and review every planned or tracked movement."
          actions={<NewRecordButton />}
        />
        <RecordsTotalsGrid totals={page.totals} />
        <RecordsFilterPanel
          year={page.year}
          month={page.month}
          years={page.years}
          mode={page.mode}
          type={page.type}
          search={page.search}
          onPeriodChange={page.setPeriod}
          onModeChange={page.setMode}
          onTypeChange={page.setType}
          onSearchChange={page.setSearch}
        >
          <RecordsTable
            records={page.filteredRecords}
            emptyTitle={page.emptyTitle}
            emptyDescription={page.emptyDescription}
          />
        </RecordsFilterPanel>
      </Stack>
    </Container>
  );
};
