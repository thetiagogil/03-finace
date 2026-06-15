import {
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
  onConfirm: () => void;
  children: ReactElement<ConfirmActionTriggerProps>;
  tooltip?: string;
}

export const ConfirmAction = ({
  title,
  description,
  confirmLabel,
  onConfirm,
  children,
  tooltip,
}: ConfirmActionProps) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  const handleTriggerClick = (event: MouseEvent<HTMLElement>) => {
    children.props.onClick?.(event);
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
