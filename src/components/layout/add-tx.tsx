import { Button, Typography } from "@mui/joy";
import { useState } from "react";
import { AddEditTxModal } from "../modals/add-edit-tx-modal";
import { Flex } from "../shared/flex";

type AddEditTxProps = {
  userId: string;
  status: "tracked" | "planned";
};

export const AddEditTx = ({ userId, status }: AddEditTxProps) => {
  const [addTxModal, setAddTxModal] = useState(false);
  return (
    <Flex x xe>
      <Button onClick={() => setAddTxModal(true)} sx={{ width: { xs: "100%", md: "auto" } }}>
        <Typography sx={{ color: "neutral.50" }}>Add Transaction</Typography>
      </Button>
      <AddEditTxModal open={addTxModal} onClose={() => setAddTxModal(false)} userId={userId} status={status} />
    </Flex>
  );
};
