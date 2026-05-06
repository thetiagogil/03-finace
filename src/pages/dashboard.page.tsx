import { Button, Card, Divider, Typography } from "@mui/joy";
import { ComponentTitle } from "../components/shared/component-title";
import { AuthPageContainer } from "../components/shared/containers";
import { Flex } from "../components/shared/flex";

export const DashboardPage = () => {
  return (
    <AuthPageContainer
      leftChildren={
        <Flex y gap={4} fullwidth>
          <ComponentTitle title="Dashboard" />
          {/* Monthly Summary */}
          <Card variant="outlined" sx={{ p: 3, borderRadius: "md" }}>
            <Typography level="h4" mb={2}>
              Monthly Summary
            </Typography>
            <Flex x xs yc gap={4}>
              <Flex y sx={{ flex: 1 }}>
                <Typography level="body-sm">Total Income</Typography>
                <Typography level="body-lg" color="success">
                  $4,200
                </Typography>
              </Flex>
              <Divider orientation="vertical" />
              <Flex y sx={{ flex: 1 }}>
                <Typography level="body-sm">Total Expenses</Typography>
                <Typography level="body-lg" color="danger">
                  $3,200
                </Typography>
              </Flex>
              <Divider orientation="vertical" />
              <Flex y sx={{ flex: 1 }}>
                <Typography level="body-sm">Total Savings</Typography>
                <Typography level="body-lg" color="primary">
                  $1,000
                </Typography>
              </Flex>
            </Flex>
          </Card>

          {/* Quick Actions */}
          <Card variant="outlined" sx={{ p: 3, borderRadius: "md" }}>
            <Typography level="h4" mb={2}>
              Quick Actions
            </Typography>
            <Flex x gap={2}>
              <Button variant="outlined" color="primary">
                Add Income
              </Button>
              <Button variant="outlined" color="danger">
                Add Expense
              </Button>
              <Button variant="outlined" color="neutral">
                Set Budget
              </Button>
            </Flex>
          </Card>

          {/* Recent Transaction Feed */}
          <Card variant="outlined" sx={{ p: 3, borderRadius: "md" }}>
            <Typography level="h4" mb={2}>
              Recent Transaction
            </Typography>
            {/* Here you can add a component to render a list of recent transactions with filters */}
            <Flex y gap={1}>
              <Typography>Transaction 1 - $100 (Groceries)</Typography>
              <Typography>Transaction 2 - $200 (Salary)</Typography>
              <Typography>Transaction 3 - $50 (Transport)</Typography>
              {/* Add more items as needed */}
            </Flex>
          </Card>
        </Flex>
      }
      rightChildren={<></>}
    />
  );
};
