import { Box, Card, Typography } from "@mui/material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { EmptyState } from "../../../shared/components/ui/EmptyState";
import type { CompareRow } from "../lib/calculations";
import { getFinanceColor } from "../lib/colors";
import { formatChartValue, formatCurrencyAxis } from "../lib/formatters";
import type { RecordType } from "../types";

interface CompareCategoryChartProps {
  rows: CompareRow[];
  type: RecordType;
  emptyTitle: string;
  emptyDescription: string;
}

export const CompareCategoryChart = ({
  rows,
  type,
  emptyTitle,
  emptyDescription,
}: CompareCategoryChartProps) => (
  <Card variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
    <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
      By category
    </Typography>
    {rows.length === 0 ? (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        compact
        variant="plain"
      />
    ) : (
      <Box sx={{ height: 360 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={rows} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e7ef"
              horizontal={false}
            />
            <XAxis
              type="number"
              stroke="#69758a"
              fontSize={12}
              tickFormatter={formatCurrencyAxis}
            />
            <YAxis
              dataKey="category"
              type="category"
              stroke="#69758a"
              fontSize={12}
              width={110}
            />
            <Tooltip formatter={formatChartValue} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar
              dataKey="tracked"
              fill={getFinanceColor(type, "tracked")}
              name="Tracked"
              radius={[0, 4, 4, 0]}
            />
            <Bar
              dataKey="planned"
              fill={getFinanceColor(type, "planned")}
              name="Planned"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    )}
  </Card>
);
