import { Card, Typography } from "@mui/joy";
import { Chart, registerables } from "chart.js";
import { useMemo } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { AuthPageContainer } from "../components/shared/containers";
import { Flex } from "../components/shared/flex";

Chart.register(...registerables);

export const InsightsPage = () => {
  // Memoized data for the charts
  const lineData = useMemo(
    () => ({
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        { data: [200, 400, 300, 500, 700, 600], label: "Expenses", borderColor: "#14508c", fill: false },
        { data: [500, 700, 600, 800, 900, 1000], label: "Income", borderColor: "#501464", fill: false }
      ]
    }),
    []
  );

  const doughnutData = useMemo(
    () => ({
      labels: ["Groceries", "Transport", "Entertainment", "Bills"],
      datasets: [{ data: [30, 20, 25, 25], backgroundColor: ["#14508c", "#501464", "#f3a683", "#fc5c65"] }]
    }),
    []
  );

  const barData = useMemo(
    () => ({
      labels: ["Jan", "Feb", "Mar", "Apr"],
      datasets: [
        { data: [500, 700, 600, 800], label: "Income", backgroundColor: "#14508c" },
        { data: [400, 500, 450, 550], label: "Expenses", backgroundColor: "#501464" }
      ]
    }),
    []
  );

  return (
    <AuthPageContainer
      leftChildren={
        <Flex y gap={3} fullwidth>
          {/* Spending Trends */}
          <Card variant="outlined" sx={{ p: 3, borderRadius: "md" }}>
            <Typography level="h4" mb={2}>
              Spending vs. Income Trends
            </Typography>
            <Line data={lineData} />
          </Card>

          {/* Category Breakdown */}
          <Card variant="outlined" sx={{ p: 3, borderRadius: "md" }}>
            <Typography level="h4" mb={2}>
              Expense Breakdown
            </Typography>
            <Doughnut data={doughnutData} />
          </Card>

          {/* Cash Flow Analysis */}
          <Card variant="outlined" sx={{ p: 3, borderRadius: "md" }}>
            <Typography level="h4" mb={2}>
              Cash Flow Analysis
            </Typography>
            <Bar data={barData} />
          </Card>
        </Flex>
      }
      rightChildren={<></>}
    />
  );
};
