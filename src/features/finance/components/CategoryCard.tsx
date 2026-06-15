import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Box,
  Card,
  Chip,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { ConfirmAction } from "../../../shared/components/ui/ConfirmAction";
import { getFinanceColor } from "../lib/colors";
import { formatCurrency } from "../lib/formatters";
import type { RecordType } from "../types";

interface CategoryCardProps {
  category: string;
  type: RecordType;
  recordCount: number;
  total: number;
  isDefault: boolean;
  isEditing: boolean;
  editName: string;
  canSaveEdit: boolean;
  onBeginEdit: () => void;
  onEditNameChange: (value: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onRemove: () => void;
}

export const CategoryCard = ({
  category,
  type,
  recordCount,
  total,
  isDefault,
  isEditing,
  editName,
  canSaveEdit,
  onBeginEdit,
  onEditNameChange,
  onSaveEdit,
  onCancelEdit,
  onRemove,
}: CategoryCardProps) => (
  <Card variant="outlined" sx={{ p: 2.5, borderRadius: 3 }}>
    <Stack spacing={2}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={1.5}
      >
        <Box sx={{ minWidth: 0, flex: 1 }}>
          {isEditing ? (
            <TextField
              size="small"
              label="Category name"
              value={editName}
              onChange={(event) => onEditNameChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && canSaveEdit) {
                  onSaveEdit();
                }
                if (event.key === "Escape") {
                  onCancelEdit();
                }
              }}
              autoFocus
              fullWidth
            />
          ) : (
            <>
              <Typography fontWeight={700}>{category}</Typography>
              <Chip
                size="small"
                variant="outlined"
                label={isDefault ? "Default" : "Custom"}
                sx={{ mt: 0.75 }}
              />
            </>
          )}
        </Box>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            whiteSpace: "nowrap",
          }}
        >
          {recordCount} records
        </Typography>
      </Stack>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography
          variant="h4"
          sx={{
            color: getFinanceColor(type, "tracked"),
            fontWeight: 700,
          }}
        >
          {formatCurrency(total)}
        </Typography>
        {!isDefault ? (
          <CategoryActions
            category={category}
            type={type}
            isEditing={isEditing}
            canSaveEdit={canSaveEdit}
            onBeginEdit={onBeginEdit}
            onSaveEdit={onSaveEdit}
            onCancelEdit={onCancelEdit}
            onRemove={onRemove}
          />
        ) : null}
      </Stack>
    </Stack>
  </Card>
);

const CategoryActions = ({
  category,
  type,
  isEditing,
  canSaveEdit,
  onBeginEdit,
  onSaveEdit,
  onCancelEdit,
  onRemove,
}: {
  category: string;
  type: RecordType;
  isEditing: boolean;
  canSaveEdit: boolean;
  onBeginEdit: () => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onRemove: () => void;
}) => {
  if (isEditing) {
    return (
      <Stack direction="row" spacing={0.5}>
        {canSaveEdit ? (
          <Tooltip title="Save category">
            <IconButton
              size="small"
              color="primary"
              aria-label={`Save ${category} category`}
              onClick={onSaveEdit}
            >
              <CheckIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        ) : (
          <IconButton
            size="small"
            color="primary"
            aria-label={`Save ${category} category`}
            disabled
          >
            <CheckIcon fontSize="small" />
          </IconButton>
        )}
        <Tooltip title="Cancel edit">
          <IconButton
            size="small"
            aria-label={`Cancel editing ${category} category`}
            onClick={onCancelEdit}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    );
  }

  return (
    <Stack direction="row" spacing={0.5}>
      <Tooltip title="Edit category">
        <IconButton
          size="small"
          aria-label={`Edit ${category} category`}
          onClick={onBeginEdit}
        >
          <EditOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <ConfirmAction
        title="Remove category?"
        description={`${category} will be removed from your custom ${typeLabel(type)} categories if it is not used by any records.`}
        confirmLabel="Remove"
        onConfirm={onRemove}
        tooltip="Remove category"
      >
        <IconButton
          size="small"
          color="error"
          aria-label={`Remove ${category} category`}
        >
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      </ConfirmAction>
    </Stack>
  );
};

const typeLabel = (type: RecordType) =>
  type === "income" ? "income" : "expense";
