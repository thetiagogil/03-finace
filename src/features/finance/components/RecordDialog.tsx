import { Dialog, Tooltip } from "@mui/material";
import {
  cloneElement,
  type MouseEvent,
  type MouseEventHandler,
  type ReactElement,
} from "react";
import { useRecordDialog } from "../hooks/useRecordDialog";
import type { FinanceRecord, RecordMode, RecordType } from "../types";
import { RecordDialogActions } from "./RecordDialogActions";
import { RecordDialogContent } from "./RecordDialogContent";
import { RecordDialogHeader } from "./RecordDialogHeader";

interface RecordDialogTriggerProps {
  onClick?: MouseEventHandler<HTMLElement>;
  "aria-haspopup"?: "dialog";
}

interface RecordDialogProps {
  trigger: ReactElement<RecordDialogTriggerProps>;
  defaultType?: RecordType;
  defaultMode?: RecordMode;
  initialRecord?: FinanceRecord;
  triggerTooltip?: string;
}

export const RecordDialog = ({
  trigger,
  defaultType = "income",
  defaultMode = "tracked",
  initialRecord,
  triggerTooltip,
}: RecordDialogProps) => {
  const dialog = useRecordDialog({ defaultType, defaultMode, initialRecord });
  const isEditing = Boolean(initialRecord);

  const handleTriggerClick = (event: MouseEvent<HTMLElement>) => {
    trigger.props.onClick?.(event);
    dialog.openDialog();
  };

  const triggerElement = cloneElement(trigger, {
    onClick: handleTriggerClick,
    "aria-haspopup": "dialog",
  });

  return (
    <>
      {triggerTooltip ? (
        <Tooltip title={triggerTooltip}>{triggerElement}</Tooltip>
      ) : (
        triggerElement
      )}
      <Dialog
        open={dialog.open}
        onClose={() => dialog.setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <RecordDialogHeader isEditing={isEditing} />
        <RecordDialogContent dialog={dialog} />
        <RecordDialogActions
          isEditing={isEditing}
          isValid={dialog.isValid}
          onCancel={() => dialog.setOpen(false)}
          onSubmit={dialog.handleSubmit}
        />
      </Dialog>
    </>
  );
};
