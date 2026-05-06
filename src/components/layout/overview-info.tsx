import { Grid, Option, Select, selectClasses, Typography } from "@mui/joy";
import { IoIosArrowDown } from "react-icons/io";
import { formatNumber } from "../../utils/formatNumber";
import { DataCard } from "../shared/data-card";
import { Flex } from "../shared/flex";

interface YearsInfoProps {
  data: { totalIncome: number; totalExpense: number; trackedCount: number };
  years: number[];
  selectedYear: number;
  setSelectedYear: (year: number) => void;
}

export const OverviewInfo = ({ data, years, selectedYear, setSelectedYear }: YearsInfoProps) => {
  const hasData = data.trackedCount > 0;
  const total = data.totalIncome - data.totalExpense;
  const cardContent = [
    { title: "Year Total", value: Math.round(total) || 0 },
    { title: "Total Income", value: Math.round(data?.totalIncome) || 0 },
    { title: "Total Expense", value: Math.round(data?.totalExpense) || 0 }
  ];

  const styleSelect = {
    bgcolor: "transparent",
    m: 0,
    py: 0,
    px: 1,
    boxShadow: "none",
    transition: "0.3s",
    "&:hover": {
      bgcolor: "neutral.200"
    },
    [`& .${selectClasses.button}`]: {
      fontWeight: 600,
      fontSize: 24
    },
    [`& .${selectClasses.indicator}`]: {
      transition: "0.3s",
      [`&.${selectClasses.expanded}`]: {
        transform: "rotate(-180deg)"
      }
    }
  };

  return (
    <>
      {hasData && (
        <DataCard>
          <Flex x fullwidth>
            <Grid container sx={{ width: "100%" }}>
              <Grid xs={6} sm={3}>
                <DataCard bgcolor="neutral.300">
                  <Flex y gap1>
                    <Typography level="body-sm">Year</Typography>
                    <Flex>
                      <Select
                        value={selectedYear}
                        onChange={(_e, newValue) => setSelectedYear(newValue as number)}
                        indicator={<IoIosArrowDown />}
                        sx={styleSelect}
                      >
                        {years?.map((year, index) => (
                          <Option key={index} value={year}>
                            {year}
                          </Option>
                        ))}
                      </Select>
                    </Flex>
                  </Flex>
                </DataCard>
              </Grid>
              {cardContent.map((item, index) => (
                <Grid xs={6} sm={3} key={index}>
                  <DataCard bgcolor="neutral.300" sx={{ minHeight: 96 }}>
                    <Flex y gap1>
                      <Typography level="body-sm">{item.title}</Typography>
                      <Typography level="h3">{formatNumber(item.value)}</Typography>
                    </Flex>
                  </DataCard>
                </Grid>
              ))}
            </Grid>
          </Flex>
        </DataCard>
      )}
    </>
  );
};
