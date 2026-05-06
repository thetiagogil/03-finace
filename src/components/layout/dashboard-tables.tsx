import { Stack, Table } from "@mui/joy";
import { formatNumber } from "../../utils/formatNumber";
import { capFirstLetter } from "../../utils/typo";
import { DataCard } from "../shared/data-card";

type TypesTableProps = {
  type: "income" | "expense";
  data: object;
};

type DashboardTablesProps = {
  data: { incomes: {}; expenses: {} };
};

export const DashboardTables = ({ data }: DashboardTablesProps) => {
  const hasData =
    (data?.incomes && Object.keys(data?.incomes).length > 0) ||
    (data?.expenses && Object.keys(data?.expenses).length > 0);
  const hasIncomes = data?.incomes && Object.keys(data?.incomes).length > 0;
  const hasExpenses = data?.expenses && Object.keys(data?.expenses).length > 0;
  return (
    <>
      {hasData && (
        <DataCard sx={{ gap: 4 }}>
          <Stack
            component="section"
            sx={{
              alignItems: { xs: "normal", md: "center" },
              overflowX: { xs: "auto", md: "visible" },
              width: "100%",
              gap: 4
            }}
          >
            {hasIncomes && <DashboardTypesTable type="income" data={data?.incomes} />}
            {hasExpenses && <DashboardTypesTable type="expense" data={data?.expenses} />}
          </Stack>
        </DataCard>
      )}
    </>
  );
};

const DashboardTypesTable = ({ type, data }: TypesTableProps) => {
  const notzero = (value: number) => {
    return value > 0 ? true : false;
  };
  return (
    <Table
      size="sm"
      borderAxis="none"
      variant="plain"
      hoverRow
      stickyHeader
      sx={{
        width: { xs: 900, md: "100%" },
        borderCollapse: "collapse",
        "& th": {
          height: 16,
          textAlign: "center",
          bgcolor: "neutral.300"
        },
        "& td": {
          height: 16,
          textAlign: "center",
          fontWeight: 400
        },
        "& th:first-of-type, & td:first-of-type": {
          textAlign: "left"
        }
      }}
    >
      <thead>
        <tr>
          <th style={{ borderRadius: 0 }}>{capFirstLetter(type)}</th>
          <th>Tracked</th>
          <th>Planned</th>
          <th>%</th>
          <th>Remaining</th>
          <th style={{ borderRadius: 0 }}>Excess</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(([category, values]: [string, any]) => {
          const tracked = notzero(values.tracked) ? formatNumber(values.tracked) : "-";
          const planned = notzero(values.planned) ? formatNumber(values.planned) : "-";
          const percentage = notzero(values.planned) ? Math.round((values.tracked / values.planned) * 100) + "%" : "-";
          const remaining = notzero(values.planned - values.tracked)
            ? formatNumber(Math.max(0, values.planned - values.tracked))
            : "-";
          const excess = notzero(values.tracked - values.planned)
            ? formatNumber(Math.max(0, values.tracked - values.planned))
            : "-";
          return (
            <tr key={category}>
              <td>{capFirstLetter(category)}</td>
              <td>{tracked}</td>
              <td>{planned}</td>
              <td>{percentage}</td>
              <td>{remaining}</td>
              <td>{excess}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
