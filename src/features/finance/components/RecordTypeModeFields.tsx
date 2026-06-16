import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import {
  getFinanceColor,
  getFinanceSoftColor,
  getFinanceToggleSx,
  getModeColor,
  getModeSoftColor,
} from "../lib/colors";
import type { RecordMode, RecordType } from "../types";

interface RecordTypeModeFieldsProps {
  type: RecordType;
  mode: RecordMode;
  onTypeChange: (type: RecordType) => void;
  onModeChange: (mode: RecordMode) => void;
}

export const RecordTypeModeFields = ({
  type,
  mode,
  onTypeChange,
  onModeChange,
}: RecordTypeModeFieldsProps) => (
  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
    <Stack spacing={1} flex={1}>
      <Typography variant="body2" fontWeight={600}>
        Type
      </Typography>
      <ToggleButtonGroup
        exclusive
        fullWidth
        value={type}
        onChange={(_, value: RecordType | null) => value && onTypeChange(value)}
      >
        <ToggleButton
          value="income"
          sx={getFinanceToggleSx(
            getFinanceColor("income", "tracked"),
            getFinanceSoftColor("income", "tracked"),
          )}
        >
          Income
        </ToggleButton>
        <ToggleButton
          value="expense"
          sx={getFinanceToggleSx(
            getFinanceColor("expense", "tracked"),
            getFinanceSoftColor("expense", "tracked"),
          )}
        >
          Expense
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
    <Stack spacing={1} flex={1}>
      <Typography variant="body2" fontWeight={600}>
        Mode
      </Typography>
      <ToggleButtonGroup
        exclusive
        fullWidth
        value={mode}
        onChange={(_, value: RecordMode | null) => value && onModeChange(value)}
      >
        <ToggleButton
          value="tracked"
          sx={getFinanceToggleSx(
            getModeColor("tracked"),
            getModeSoftColor("tracked"),
          )}
        >
          Tracked
        </ToggleButton>
        <ToggleButton
          value="planned"
          sx={getFinanceToggleSx(
            getModeColor("planned"),
            getModeSoftColor("planned"),
          )}
        >
          Planned
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  </Stack>
);
