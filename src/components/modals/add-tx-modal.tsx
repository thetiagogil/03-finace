import { Button, Input, Modal, ModalClose, ModalDialog, Option, Select, Textarea, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { useCreateTx, useUpdateTxById } from "../../api/tx-api";
import { TxModel } from "../../models/tx.model";
import { capFirstLetter } from "../../utils/typo";
import { txCategoriesArray, txTypesArray } from "../arrays/tx-array";
import { Flex } from "../shared/flex";

type AddTxModalProps = {
  open: boolean;
  onClose: () => void;
  userId: string;
  status: "tracked" | "planned";
  editMode?: boolean;
  initialData?: TxModel;
  handleDelete?: () => void;
  deleting?: boolean;
};

export const AddTxModal = ({
  open,
  onClose,
  userId,
  status,
  editMode = false,
  initialData,
  handleDelete,
  deleting
}: AddTxModalProps) => {
  const [formData, setFormData] = useState({
    type: "",
    category: "",
    date: "",
    value: 0,
    description: ""
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const { createTx, loading: creating } = useCreateTx();
  const { updateTxById, loading: editing } = useUpdateTxById();

  useEffect(() => {
    if (initialData) {
      setFormData({
        type: initialData.type || "",
        category: initialData.category || "",
        date: initialData.date || "",
        value: initialData.value || 0,
        description: initialData.description || ""
      });
    }
  }, [initialData]);

  useEffect(() => {
    const isValid = formData.type && formData.category && formData.date && formData.value;
    setIsFormValid(!!isValid);
  }, [formData]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (editMode && initialData?.id) {
      await updateTxById(initialData.id, { ...formData, user_id: userId, status });
    } else {
      await createTx({ ...formData, user_id: userId, status });
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog sx={{ width: 500 }}>
        <ModalClose />
        <Flex x>
          <Typography>{editMode ? "Edit Activity" : "Create an Activity"}</Typography>
        </Flex>
        <Flex y gap={2} fullwidth>
          <Flex gap={2}>
            <Select
              name="type"
              placeholder="Type"
              value={formData.type}
              onChange={(_e: any, newValue: any) =>
                setFormData(prevFormData => ({
                  ...prevFormData,
                  type: newValue
                }))
              }
              sx={{ width: 250 }}
            >
              {txTypesArray.map((type, index) => (
                <Option key={index} value={type}>
                  {capFirstLetter(type)}
                </Option>
              ))}
            </Select>
            <Select
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={(_e: any, newValue: any) =>
                setFormData(prevFormData => ({
                  ...prevFormData,
                  category: newValue
                }))
              }
              sx={{ width: "100%" }}
            >
              {txCategoriesArray.sort().map((cat, index) => (
                <Option key={index} value={cat.name}>
                  {capFirstLetter(cat.name)}
                </Option>
              ))}
            </Select>
          </Flex>
          <Flex gap={2}>
            <Input
              name="date"
              type="date"
              placeholder="YYYY-MM-DD"
              value={formData.date}
              onChange={handleChange}
              sx={{ width: 250 }}
            />
            <Input
              name="value"
              type="number"
              placeholder="Value"
              value={formData.value}
              onChange={handleChange}
              fullWidth
            />
          </Flex>
          <Flex>
            <Textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              minRows={2}
              sx={{ width: "100%" }}
            />
          </Flex>
        </Flex>
        <Flex x xe gap={1}>
          {editMode && (
            <Button onClick={handleDelete} loading={deleting} color="danger">
              Delete
            </Button>
          )}
          <Button onClick={handleSubmit} loading={creating || editing} disabled={!isFormValid}>
            {editMode ? "Edit activity" : "Add activity"}
          </Button>
        </Flex>
      </ModalDialog>
    </Modal>
  );
};
