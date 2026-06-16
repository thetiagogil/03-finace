import { DialogTitle, Typography } from "@mui/material";

interface RecordDialogHeaderProps {
  isEditing: boolean;
}

export const RecordDialogHeader = ({ isEditing }: RecordDialogHeaderProps) => (
  <DialogTitle component="div" sx={{ pb: 0 }}>
    <Typography variant="h5" component="h2" fontWeight={700}>
      {isEditing ? "Edit record" : "New record"}
    </Typography>
    <Typography variant="body2" component="p" color="text.secondary">
      Capture income or expenses, planned or actual.
    </Typography>
  </DialogTitle>
);
