import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import {
  cloneElement,
  useState,
  type MouseEvent,
  type MouseEventHandler,
  type ReactElement,
} from "react";

interface ConfirmActionTriggerProps {
  onClick?: MouseEventHandler<HTMLElement>;
  "aria-haspopup"?: "dialog";
}

interface ConfirmActionProps {
  title: string;
  description: string;
  confirmLabel: string;
  onConfirm: () => boolean | void;
  children: ReactElement<ConfirmActionTriggerProps>;
  errorMessage?: string;
  tooltip?: string;
}

export const ConfirmAction = ({
  title,
  description,
  confirmLabel,
  onConfirm,
  children,
  errorMessage = "This action could not be completed. Check browser storage and try again.",
  tooltip,
}: ConfirmActionProps) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const handleConfirm = () => {
    try {
      const result = onConfirm();

      if (result === false) {
        setError(errorMessage);
        return;
      }
    } catch {
      setError(errorMessage);
      return;
    }

    setError("");
    setOpen(false);
  };

  const handleTriggerClick = (event: MouseEvent<HTMLElement>) => {
    children.props.onClick?.(event);
    setError("");
    setOpen(true);
  };

  const trigger = cloneElement(children, {
    onClick: handleTriggerClick,
    "aria-haspopup": "dialog",
  });

  return (
    <>
      {tooltip ? <Tooltip title={tooltip}>{trigger}</Tooltip> : trigger}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleConfirm}>
            {confirmLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
