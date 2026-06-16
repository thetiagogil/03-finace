import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

interface RecordCategoryFieldsProps {
  category: string;
  subcategory: string;
  categories: readonly string[];
  categoryIsValid: boolean;
  onCategoryChange: (category: string) => void;
  onSubcategoryChange: (subcategory: string) => void;
}

export const RecordCategoryFields = ({
  category,
  subcategory,
  categories,
  categoryIsValid,
  onCategoryChange,
  onSubcategoryChange,
}: RecordCategoryFieldsProps) => (
  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
    <FormControl fullWidth>
      <InputLabel>Category</InputLabel>
      <Select
        label="Category"
        value={category}
        onChange={(event) => onCategoryChange(event.target.value)}
        error={Boolean(category) && !categoryIsValid}
      >
        {categories.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <TextField
      label="Subcategory"
      value={subcategory}
      onChange={(event) => onSubcategoryChange(event.target.value)}
      fullWidth
    />
  </Stack>
);
