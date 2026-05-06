import { ChartDoughnut } from "../shared/chart-doughnut";
import { DataCard } from "../shared/data-card";
import { Flex } from "../shared/flex";

type DashboardChartsProps = {
  data: { incomes: {}; expenses: {} };
};

export const DashboardCharts = ({ data }: DashboardChartsProps) => {
  const hasIncomes = data?.incomes && Object.keys(data?.incomes).length > 0;
  const hasExpenses = data?.expenses && Object.keys(data?.expenses).length > 0;
  const styleCard = { width: { md: "100%" }, alignItems: "center" };
  return (
    <Flex fullwidth sx={{ flexDirection: { xs: "column", md: "row" } }}>
      {hasIncomes && (
        <DataCard sx={styleCard}>
          <ChartDoughnut data={data?.incomes} title="Tracked Incomes" />
        </DataCard>
      )}
      {hasExpenses && (
        <DataCard sx={styleCard}>
          <ChartDoughnut data={data?.expenses} title="Tracked Expenses" />
        </DataCard>
      )}
    </Flex>
  );
};
