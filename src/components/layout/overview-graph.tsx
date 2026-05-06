import { Typography } from "@mui/joy";
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import { capFirstLetter } from "../../utils/typo";
import { DataCard } from "../shared/data-card";
import { Flex } from "../shared/flex";

Chart.register(...registerables);

interface YearsGraphProps {
  data: Array<{ month: string; total: number }>;
}

export const OverviewGraph = ({ data }: YearsGraphProps) => {
  const hasData = data.some(item => item.total > 0);
  const chartData = {
    labels: data.map(item => capFirstLetter(item.month)),
    datasets: [
      {
        label: "Monthly Totals",
        data: data.map(d => d.total),
        borderColor: "#14508c99",
        backgroundColor: "#14508c33",
        fill: true
      }
    ]
  };

  const options = {
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

  return (
    <>
      {hasData && (
        <DataCard>
          <Flex y xc gap2 fullheight fullwidth>
            <Typography level="title-sm">Months Totals</Typography>
            <Flex sx={{ width: { xs: "100%", md: 520 } }}>
              <Line data={chartData} options={options} />
            </Flex>
          </Flex>
        </DataCard>
      )}
    </>
  );
};
