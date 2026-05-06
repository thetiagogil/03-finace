import { Box, Typography } from "@mui/joy";
import { Chart, registerables } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { formatNumber } from "../../utils/formatNumber";
import { capFirstLetter } from "../../utils/typo";
import { Flex } from "./flex";

Chart.register(...registerables);

type ChartDoughnutProps = {
  data: { [key: string]: number };
  title: string;
};

export const ChartDoughnut = ({ data, title }: ChartDoughnutProps) => {
  const shades = title.includes("Income")
    ? ["#14508ccc", "#14508c99", "#14508c66", "#14508c33", "#00000033"]
    : ["#501464cc", "#50146499", "#50146466", "#50146433", "#00000033"];

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: title,
        data: Object.values(data),
        backgroundColor: shades,
        hoverOffset: 8
      }
    ]
  };

  const chartOptions = {
    cutout: "60%",
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${" "}${capFirstLetter(tooltipItem.label)}: ${tooltipItem.raw}`;
          }
        }
      }
    }
  };

  const total = Object.values(data).reduce((sum, value) => sum + value, 0);
  const styleBox = { height: 12, width: 12, borderRadius: 4 };
  const colors = shades.slice(0, Object.keys(data).length);

  return (
    <Flex y xc gap2>
      <Typography level="title-sm">{title}</Typography>
      {Object.keys(data).length > 0 ? (
        <Flex x xc yc gap3 fullwidth sx={{ flexDirection: { xs: "row", md: "column" } }}>
          <Flex x yc sx={{ width: 112 }}>
            <Doughnut data={chartData} options={chartOptions} />
          </Flex>

          <Flex y ysb fullheight sx={{ width: 160, height: 136 }}>
            <Flex y>
              {Object.entries(data).map(([category, value], index) => (
                <Flex x xsb key={category}>
                  <Flex x yc gap1>
                    <Box sx={{ ...styleBox, bgcolor: colors[index] }} />
                    <Typography level="body-sm">{capFirstLetter(category)}</Typography>
                  </Flex>
                  <Typography level="body-sm">{formatNumber(value)}</Typography>
                </Flex>
              ))}
            </Flex>
            <Flex x xsb sx={{ fontWeight: 700, borderTop: "1px solid lightgrey" }}>
              <Flex x yc gap1>
                <Box sx={{ ...styleBox }} />
                <Typography level="body-sm">Total</Typography>
              </Flex>
              <Typography level="body-sm">{formatNumber(total)}</Typography>
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <Typography level="body-sm">
          <i>no data</i>
        </Typography>
      )}
    </Flex>
  );
};
