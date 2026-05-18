import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { RecordDialog } from "./RecordDialog";
import type { RecordMode, RecordType } from "../types";

interface NewRecordButtonProps {
  label?: string;
  defaultType?: RecordType;
  defaultMode?: RecordMode;
}

export const NewRecordButton = ({
  label = "New record",
  defaultType,
  defaultMode,
}: NewRecordButtonProps) => (
  <RecordDialog
    defaultType={defaultType}
    defaultMode={defaultMode}
    trigger={
      <Button variant="contained" startIcon={<AddIcon />}>
        {label}
      </Button>
    }
  />
);
