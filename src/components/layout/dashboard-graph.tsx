import { Box, Typography } from "@mui/joy";
import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import { capFirstLetter } from "../../utils/typo";
import { DataCard } from "../shared/data-card";
import { Flex } from "../shared/flex";

Chart.register(...registerables);

type DashboardGraphProps = {
  graphData: {
    month: string;
    totalIncomesTracked: number;
    totalExpensesTracked: number;
    totalIncomesPlanned: number;
    totalExpensesPlanned: number;
  }[];
  selectedMonth?: string;
};

export const DashboardGraph = ({ graphData, selectedMonth }: DashboardGraphProps) => {
  const hasData = graphData.some(
    item =>
      item.totalIncomesTracked > 0 ||
      item.totalExpensesTracked > 0 ||
      item.totalIncomesPlanned > 0 ||
      item.totalExpensesPlanned > 0
  );
  const getColors = (isSelected: boolean) => {
    return isSelected
      ? {
          incomesTracked: "#14508ccc",
          incomesPlanned: "#14508c99",
          expensesTracked: "#501464cc",
          expensesPlanned: "#50146499"
        }
      : {
          incomesTracked: "#14508c66",
          incomesPlanned: "#14508c33",
          expensesTracked: "#50146466",
          expensesPlanned: "#50146433"
        };
  };
  const isMonthSelected = (month: string) => selectedMonth === month;
  const getBackgroundColor = (
    dataType: "incomesTracked" | "incomesPlanned" | "expensesTracked" | "expensesPlanned"
  ) => {
    return graphData.map(item => {
      const colors = getColors(selectedMonth ? isMonthSelected(item.month) : true);
      return colors[dataType];
    });
  };
  const data = {
    labels: graphData.map(item => capFirstLetter(item.month)),
    datasets: [
      {
        label: "Incomes Tracked",
        backgroundColor: getBackgroundColor("incomesTracked"),
        data: graphData.map(item => item.totalIncomesTracked)
      },
      {
        label: "Incomes Planned",
        backgroundColor: getBackgroundColor("incomesPlanned"),
        data: graphData.map(item => item.totalIncomesPlanned)
      },
      {
        label: "Expenses Tracked",
        backgroundColor: getBackgroundColor("expensesTracked"),
        data: graphData.map(item => item.totalExpensesTracked)
      },
      {
        label: "Expenses Planned",
        backgroundColor: getBackgroundColor("expensesPlanned"),
        data: graphData.map(item => item.totalExpensesPlanned)
      }
    ]
  };
  const options = {
    maintainAspectRatio: true,
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)"
        },
        ticks: {
          callback: function (value: string | number) {
            return value;
          }
        }
      }
    }
  };
  const styleBox = { height: 12, width: 12, borderRadius: 4 };
  const legendItems = [
    { label: "Incomes Tracked", color: getColors(true).incomesTracked },
    { label: "Incomes Planned", color: getColors(true).incomesPlanned },
    { label: "Expenses Tracked", color: getColors(true).expensesTracked },
    { label: "Expenses Planned", color: getColors(true).expensesPlanned }
  ];
  return (
    <>
      {hasData && (
        <DataCard>
          <Flex y xc gap2 fullheight fullwidth>
            <Typography level="title-sm">Yearly Totals</Typography>
            <Flex sx={{ width: { xs: "100%", md: 520 } }}>
              <Bar data={data} options={options} />
            </Flex>
            <Flex x xc gap1 wrap>
              {legendItems.map(item => (
                <Flex key={item.label} x yc gap1>
                  <Box sx={{ ...styleBox, bgcolor: item.color }} />
                  <Typography level="body-xs" sx={{ fontWeight: 400 }}>
                    {item.label}
                  </Typography>
                </Flex>
              ))}
            </Flex>
          </Flex>
        </DataCard>
      )}
    </>
  );
};
