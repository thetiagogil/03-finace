import { ChartDoughnut } from "../shared/chart-doughnut";
import { DataCard } from "../shared/data-card";
import { Flex } from "../shared/flex";

type YearsChartsProps = {
  data: { incomes: {}; expenses: {} };
};

export const OverviewCharts = ({ data }: YearsChartsProps) => {
  const hasIncomes = data?.incomes && Object.keys(data?.incomes).length > 0;
  const hasExpenses = data?.expenses && Object.keys(data?.expenses).length > 0;
  const styleCard = { width: { md: "100%" }, alignItems: "center" };
  return (
    <Flex fullwidth sx={{ flexDirection: { xs: "column", md: "row" } }}>
      {hasIncomes && (
        <DataCard sx={styleCard}>
          <ChartDoughnut data={data?.incomes} title="Top Income Months" />
        </DataCard>
      )}
      {hasExpenses && (
        <DataCard sx={styleCard}>
          <ChartDoughnut data={data?.expenses} title="Top Expense Months" />
        </DataCard>
      )}
    </Flex>
  );
};
