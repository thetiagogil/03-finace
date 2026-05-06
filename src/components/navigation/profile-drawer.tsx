import { Button, CircularProgress, Drawer, IconButton, ModalClose, Typography } from "@mui/joy";
import { useContext, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { useGetUser } from "../../api/users-api";
import { AuthContext } from "../../contexts/auth.context";
import { currencies } from "../arrays/currency-array";
import { DeleteUserModal } from "../modals/delete-user-modal";
import { EditWalletBalanceModal } from "../modals/edit-wallet-balance-modal";
import { EditWalletCurrencyModal } from "../modals/edit-wallet-currency-modal";
import { Flex } from "../shared/flex";

type ProfileDrawerProps = {
  open: boolean;
  onClose: () => void;
};

type WalletType = "initial" | "current" | "currency";

type ModalStateProps = {
  open: boolean;
  type: WalletType;
  value: number | string;
};

type WalletItem = {
  type: WalletType;
  value: number | string;
  label: string;
};

export const ProfileDrawer = ({ open, onClose }: ProfileDrawerProps) => {
  const { userId } = useContext(AuthContext);
  const { data: userData, loading: userLoading } = useGetUser({ userId });
  const initialBalance = userData.data?.wallet_initial_balance ?? 0;
  const currentBalance = userData.data?.wallet_current_balance ?? 0;
  const currencyCode = userData.data?.wallet_currency ?? "EUR";
  const currencySymbol = currencies.find(c => c.code === currencyCode)?.symbol || currencyCode;

  const [editWalletBalanceModalState, setEditWalletBalanceModalState] = useState<ModalStateProps>({
    open: false,
    type: "initial",
    value: 0
  });
  const [editWalletCurrencyModalState, setEditWalletCurrencyModalState] = useState<ModalStateProps>({
    open: false,
    type: "currency",
    value: currencyCode
  });
  const [deleteUserModalState, setDeleteUserModalState] = useState(false);

  const handleEditModal = ({ open = false, type, value }: ModalStateProps) => {
    if (type === "currency") {
      setEditWalletCurrencyModalState({ open: open === true, type, value: value as string });
    } else {
      setEditWalletBalanceModalState({ open: open === true, type, value: value as number });
    }
  };

  const wallet: WalletItem[] = [
    { type: "initial", value: initialBalance, label: "Initial balance" },
    { type: "current", value: currentBalance, label: "Current balance" },
    { type: "currency", value: `${currencyCode} (${currencySymbol})`, label: "Currency" }
  ];

  return (
    <Drawer open={open} onClose={onClose} anchor="right" size="sm">
      <Flex y sx={{ px: 2 }}>
        <Typography level="title-lg" sx={{ textAlign: "center", pt: 1.5, mb: 4 }}>
          Profile
        </Typography>
        <ModalClose />
        <Flex y gap={4}>
          <Flex y gap2 fullwidth>
            <Flex y yc fullheight>
              <Typography level="body-md">Name</Typography>
              {userLoading ? (
                <CircularProgress size="sm" />
              ) : (
                <Typography level="title-md">
                  {userData.data?.firstname} {userData.data?.lastname}
                </Typography>
              )}
            </Flex>
            {wallet.map(item => (
              <Flex key={item.type} y yc fullheight>
                <Typography level="body-md">{item.label}</Typography>
                <Flex x yc gap1>
                  {userLoading ? (
                    <CircularProgress size="sm" />
                  ) : (
                    <Typography level="title-md">{item.value}</Typography>
                  )}
                  <IconButton
                    size="sm"
                    onClick={() => handleEditModal({ open: true, type: item.type, value: item.value ?? "" })}
                    sx={{ p: 0, "--IconButton-size": "26px" }}
                  >
                    <MdOutlineEdit />
                  </IconButton>
                </Flex>
              </Flex>
            ))}
          </Flex>
          <Flex>
            <Button color="danger" onClick={() => setDeleteUserModalState(true)}>
              Delete Account
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <EditWalletBalanceModal
        open={editWalletBalanceModalState.open}
        onClose={() => handleEditModal({ open: false, type: editWalletBalanceModalState.type, value: 0 })}
        userId={userId}
        walletType={editWalletBalanceModalState.type as "initial" | "current"}
        walletValue={editWalletBalanceModalState.value as number}
      />
      <EditWalletCurrencyModal
        open={editWalletCurrencyModalState.open}
        onClose={() => handleEditModal({ open: false, type: "currency", value: "" })}
        userId={userId}
        walletValue={editWalletCurrencyModalState.value as string}
      />
      <DeleteUserModal open={deleteUserModalState} onClose={() => setDeleteUserModalState(false)} userId={userId} />
    </Drawer>
  );
};
