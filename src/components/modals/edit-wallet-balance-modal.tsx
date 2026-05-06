import { Button, Input, Modal, ModalClose, ModalDialog, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { useUpdateUserWallet } from "../../api/users-api";
import { Flex } from "../shared/flex";

type EditWalletModalProps = {
  open: boolean;
  onClose: () => void;
  userId?: string;
  walletType: "initial" | "current" | "currency";
  walletValue: number;
};

export const EditWalletBalanceModal = ({ open, onClose, userId, walletType, walletValue }: EditWalletModalProps) => {
  const [value, setValue] = useState<number>(walletValue);
  const { updateUserWallet, loading: updating } = useUpdateUserWallet({
    userId,
    payload: walletType === "initial" ? { wallet_initial_balance: value } : { wallet_current_balance: value }
  });

  useEffect(() => {
    if (open) {
      setValue(walletValue);
    }
  }, [open, walletValue]);

  const handleSaveChanges = async () => {
    await updateUserWallet();
    onClose();
    location.reload();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog sx={{ width: 500 }}>
        <ModalClose />
        <Flex x>
          <Typography>Edit {walletType} value.</Typography>
        </Flex>
        <Flex x gap1>
          <Input
            type="number"
            placeholder={String(walletValue)}
            value={value || ""}
            onChange={e => setValue(Number(e.target.value))}
            fullWidth
          />
          <Button onClick={handleSaveChanges} loading={updating}>
            Save
          </Button>
        </Flex>
      </ModalDialog>
    </Modal>
  );
};
