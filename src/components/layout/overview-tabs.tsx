import { useContext, useState } from "react";
import {
  useGetYearCategoriesByMonths,
  useGetYearInfo,
  useGetYearMonthsTotalsSummary,
  useGetYears,
  useGetYearTopMonths
} from "../../api/years-api";
import { AuthContext } from "../../contexts/auth.context";
import { Flex } from "../shared/flex";
import { Loading } from "../shared/loading";
import { OverviewCharts } from "./overview-charts";
import { OverviewGraph } from "./overview-graph";
import { OverviewInfo } from "./overview-info";
import { OverviewTables } from "./overview-tables";

type OverviewTabsProps = {
  status: "tracked" | "planned";
};
export const OverviewTabs = ({ status }: OverviewTabsProps) => {
  const { userId } = useContext(AuthContext);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const { data: years, loading: yearsLoading } = useGetYears({ userId });
  const { data: infoData, loading: infoLoading } = useGetYearInfo({ userId, status, year: selectedYear });
  const { data: chartData, loading: chartLoading } = useGetYearTopMonths({ userId, status, year: selectedYear });
  const { data: graphData, loading: graphLoading } = useGetYearMonthsTotalsSummary({
    userId,
    status,
    year: selectedYear
  });
  const { data: tableData, loading: tableLoading } = useGetYearCategoriesByMonths({
    userId,
    status,
    year: selectedYear
  });
  const isLoading = yearsLoading || infoLoading || graphLoading || tableLoading || chartLoading;
  return (
    <>
      {isLoading ? (
        <Loading size="md" />
      ) : (
        <>
          <Flex y fullwidth>
            <OverviewInfo data={infoData} years={years} selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
            <Flex x fullwidth sx={{ flexDirection: { xs: "column", md: "row" } }}>
              <OverviewCharts data={chartData} />
              <OverviewGraph data={graphData} />
            </Flex>
          </Flex>
          <OverviewTables data={tableData} />
        </>
      )}
    </>
  );
};
