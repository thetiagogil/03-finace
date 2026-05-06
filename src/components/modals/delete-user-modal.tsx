import { Button, Input, Modal, ModalClose, ModalDialog, Typography } from "@mui/joy";
import { useContext, useState } from "react";
import { useDeleteUser } from "../../api/users-api";
import { AuthContext } from "../../contexts/auth.context";
import { Flex } from "../shared/flex";

type EditWalletModalProps = {
  open: boolean;
  onClose: () => void;
  userId: string;
};

export const DeleteUserModal = ({ open, onClose, userId }: EditWalletModalProps) => {
  const [confirmation, setConfirmation] = useState("");
  const { handleLogout } = useContext(AuthContext);
  const { deleteUser, loading: deleting } = useDeleteUser({
    userId
  });

  const handleSaveChanges = async () => {
    if (confirmation === "I want to delete my account") {
      await deleteUser();
      onClose();
      handleLogout();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog sx={{ width: 500 }}>
        <ModalClose />
        <Flex y>
          <Typography>Are you sure you want to delete your account?</Typography>
          <Typography>
            Please type <strong>I want to delete my account</strong> bellow to confirm.
          </Typography>
        </Flex>
        <Flex x gap1>
          <Input type="text" value={confirmation} onChange={e => setConfirmation(e.target.value)} fullWidth />
          <Button
            color="danger"
            onClick={handleSaveChanges}
            disabled={confirmation === "I want to delete my account" ? false : true}
            loading={deleting}
          >
            Confirm
          </Button>
        </Flex>
      </ModalDialog>
    </Modal>
  );
};
