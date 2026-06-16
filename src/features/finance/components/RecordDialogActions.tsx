import { Button, DialogActions } from "@mui/material";

interface RecordDialogActionsProps {
  isEditing: boolean;
  isValid: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

export const RecordDialogActions = ({
  isEditing,
  isValid,
  onCancel,
  onSubmit,
}: RecordDialogActionsProps) => (
  <DialogActions sx={{ px: 3, pb: 3 }}>
    <Button onClick={onCancel} variant="text">
      Cancel
    </Button>
    <Button onClick={onSubmit} variant="contained" disabled={!isValid}>
      {isEditing ? "Save changes" : "Add record"}
    </Button>
  </DialogActions>
);
