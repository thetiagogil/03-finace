import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Button } from "@mui/material";
import { ConfirmAction } from "../../../shared/components/ui/ConfirmAction";
import { clearAllRecords } from "../storage/finance-storage";

export const ResetRecordsButton = () => (
  <ConfirmAction
    title="Reset all data?"
    description="This removes every local record for the current user. Categories stay available, but the records cannot be restored."
    confirmLabel="Reset data"
    onConfirm={clearAllRecords}
  >
    <Button variant="outlined" color="error" startIcon={<DeleteOutlineIcon />}>
      Reset all data
    </Button>
  </ConfirmAction>
);
