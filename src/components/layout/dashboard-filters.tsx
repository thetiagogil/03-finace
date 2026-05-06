import { Option, Select, selectClasses, Typography } from "@mui/joy";
import { IoIosArrowDown } from "react-icons/io";
import { UserModel } from "../../models/user.model";
import { capFirstLetter } from "../../utils/typo";
import { fullMonths, shortMonths } from "../arrays/months-array";
import { DataCard } from "../shared/data-card";
import { Flex } from "../shared/flex";

type DashboardFiltersProps = {
  userData: { data: UserModel };
  years: number[];
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  isMonthDisabled: (shortMonth: string) => boolean;
};

export const DashboardFilters = ({
  userData,
  years,
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth,
  isMonthDisabled
}: DashboardFiltersProps) => {
  const hasData = userData.data && years && years.length > 0;
  const styleSelect = {
    width: { xs: "100%", sm: 128 },
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
        <DataCard
          width={"100%"}
          sx={{
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Typography level="h3">Welcome back, {userData.data?.firstname}!</Typography>
          <Flex gap2 sx={{ width: { xs: "100%", sm: "auto" } }}>
            <Select
              value={selectedYear}
              onChange={(_e: any, newValue: any) => setSelectedYear(newValue)}
              placeholder="Select Year"
              indicator={<IoIosArrowDown />}
              sx={styleSelect}
            >
              {years?.map((year, index) => (
                <Option key={index} value={year}>
                  {year}
                </Option>
              ))}
            </Select>
            <Select
              value={selectedMonth}
              onChange={(_e: any, newValue: any) => setSelectedMonth(newValue)}
              placeholder="Select Month"
              indicator={<IoIosArrowDown />}
              sx={styleSelect}
            >
              <Option value="">All Year</Option>
              {shortMonths.map((shortMonth, index) => (
                <Option key={index} value={shortMonth} disabled={isMonthDisabled(shortMonth)}>
                  {capFirstLetter(fullMonths[index])}
                </Option>
              ))}
            </Select>
          </Flex>
        </DataCard>
      )}
    </>
  );
};
