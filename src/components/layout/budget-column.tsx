import { LinearProgress, Typography } from "@mui/joy";
import { ComponentTitle } from "../shared/component-title";
import { DataCard } from "../shared/data-card";
import { Flex } from "../shared/flex";

type BudgetColumnProps = {
  categoriesSum: {
    incomes: Record<string, { tracked: number; planned: number }>;
    expenses: Record<string, { tracked: number; planned: number }>;
  };
};

export const BudgetColumn = ({ categoriesSum }: BudgetColumnProps) => {
  return (
    <>
      <ComponentTitle title="Budget Overview" />
      <Flex gap2 sx={{ flexDirection: { xs: "column", md: "row" } }}>
        {renderTransactionList("Income", categoriesSum.incomes, "success.500", "No income planned.")}
        {renderTransactionList("Expenses", categoriesSum.expenses, "danger.500", "No expenses planned.")}
      </Flex>
    </>
  );
};

const renderTransactionList = (
  title: string,
  data: Record<string, { tracked: number; planned: number }>,
  positiveColor: string,
  noDataText: string
) => {
  const calculateProgress = (tracked: number, planned: number) => {
    const percentage = (tracked / planned) * 100;
    return planned > 0 ? (percentage < 100 ? percentage : 100) : 0;
  };
  return (
    <Flex y fullwidth>
      <DataCard>
        <Typography level="title-sm" sx={{ mb: 2 }}>
          {title}
        </Typography>
        <Flex y gap2 fullwidth>
          {Object.keys(data).length > 0 ? (
            Object.entries(data).map(([category, { tracked, planned }]) => {
              const percentage = Number(((Math.abs(tracked) / Math.abs(planned)) * 100).toFixed(0));
              return (
                <Flex key={category} y gap1>
                  <Flex x yc xsb>
                    <Typography level="body-sm">{category}</Typography>
                    <Typography level="body-sm" sx={{ color: percentage > 100 ? positiveColor : null }}>
                      {percentage}%
                    </Typography>
                  </Flex>
                  <LinearProgress determinate value={calculateProgress(tracked, planned)} />
                </Flex>
              );
            })
          ) : (
            <Typography level="body-sm">{noDataText}</Typography>
          )}
        </Flex>
      </DataCard>
    </Flex>
  );
};
