import { TextField } from "@mui/material";

interface RecordDescriptionFieldProps {
  description: string;
  onDescriptionChange: (description: string) => void;
}

export const RecordDescriptionField = ({
  description,
  onDescriptionChange,
}: RecordDescriptionFieldProps) => (
  <TextField
    label="Description"
    value={description}
    onChange={(event) => onDescriptionChange(event.target.value)}
    multiline
    minRows={2}
    fullWidth
  />
);
