import { Button, Modal, ModalClose, ModalDialog, Option, Select, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { useUpdateUserWallet } from "../../api/users-api";
import { currencies } from "../arrays/currency-array";
import { Flex } from "../shared/flex";

type EditWalletCurrencyModalProps = {
  open: boolean;
  onClose: () => void;
  userId?: string;
  walletValue: string;
};

export const EditWalletCurrencyModal = ({ open, onClose, userId, walletValue }: EditWalletCurrencyModalProps) => {
  const [value, setValue] = useState<string>(walletValue || "EUR");
  const { updateUserWallet, loading: updating } = useUpdateUserWallet({
    userId,
    payload: { wallet_currency: value }
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
          <Typography>Edit Currency</Typography>
        </Flex>
        <Flex x gap={1}>
          <Select
            placeholder={walletValue}
            value={value || walletValue}
            onChange={(_e, newValue) => setValue(newValue as string)}
          >
            {currencies.map(currency => (
              <Option key={currency.code} value={currency.code}>
                {`${currency.code} (${currency.symbol})`}
              </Option>
            ))}
          </Select>
          <Button onClick={handleSaveChanges} loading={updating}>
            Save
          </Button>
        </Flex>
      </ModalDialog>
    </Modal>
  );
};
