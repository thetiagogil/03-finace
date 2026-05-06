import { Stack, Table } from "@mui/joy";
import { formatNumber } from "../../utils/formatNumber";
import { capFirstLetter } from "../../utils/typo";
import { shortMonths } from "../arrays/months-array";
import { DataCard } from "../shared/data-card";

type YearsTablesProps = {
  data: { incomes: {}; expenses: {} };
};

type YearsTypesTableProps = {
  title: string;
  data: Record<string, Record<string, number>>;
};

export const OverviewTables = ({ data }: YearsTablesProps) => {
  const hasData =
    (data?.incomes && Object.keys(data?.incomes).length > 0) ||
    (data?.expenses && Object.keys(data?.expenses).length > 0);
  const hasIncomes = data?.incomes && Object.keys(data?.incomes).length > 0;
  const hasExpenses = data?.expenses && Object.keys(data?.expenses).length > 0;
  return (
    <>
      {hasData && (
        <>
          {hasIncomes && <OverviewTypesTable title="Incomes" data={data?.incomes} />}
          {hasExpenses && <OverviewTypesTable title="Expenses" data={data?.expenses} />}
        </>
      )}
    </>
  );
};

export const OverviewTypesTable = ({ title, data }: YearsTypesTableProps) => {
  const categories = Array.from(new Set(Object.keys(data).flatMap(month => Object.keys(data[month]))));
  const totalRow: Record<string, number> = {};
  shortMonths.forEach(month => {
    totalRow[month] = categories.reduce((acc, category) => acc + (data[month]?.[category] || 0), 0);
  });

  return (
    <DataCard>
      <Stack
        component="section"
        sx={{
          alignItems: { xs: "normal", md: "center" },
          overflowX: { xs: "auto", md: "visible" },
          width: "100%",
          gap: 8
        }}
      >
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
              textAlign: "center",
              fontWeight: "400"
            },
            "& th:first-of-type, & td:first-of-type": {
              textAlign: "left"
            },
            "& tr:last-child": {
              fontWeight: "700"
            }
          }}
        >
          <thead>
            <tr>
              <th style={{ width: 96, borderRadius: 0 }}>{title}</th>
              {shortMonths.map(month => (
                <th key={month} style={{ borderRadius: month === "dec" ? 0 : "" }}>
                  {capFirstLetter(month)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.sort().map(category => (
              <tr key={category}>
                <td>{capFirstLetter(category)}</td>
                {shortMonths.map((month, index) => (
                  <td key={index}>{data[month]?.[category] ? `${formatNumber(data[month][category])}` : "-"}</td>
                ))}
              </tr>
            ))}
            <tr style={{ borderTop: "1px solid lightgrey" }}>
              <td>
                <strong>Total</strong>
              </td>
              {shortMonths.map((month, index) => (
                <td key={index}>
                  <strong>{totalRow[month] ? `${formatNumber(totalRow[month])}` : "-"}</strong>
                </td>
              ))}
            </tr>
          </tbody>
        </Table>
      </Stack>
    </DataCard>
  );
};
