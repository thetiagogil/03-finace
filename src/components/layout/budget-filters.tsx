import { Button, Select, Typography } from "@mui/joy";
import { useState } from "react";
import { MAIN_BORDER_RADIUS } from "../../utils/constants";
import { AddEditTxModal } from "../modals/add-edit-tx-modal";
import { Flex } from "../shared/flex";

type BudgetFiltersProps = {
  userId: string;
  status: "tracked" | "planned";
};

export const BudgetFilters = ({ userId, status }: BudgetFiltersProps) => {
  const [addTxModal, setAddTxModal] = useState(false);
  const stylesSelect = { width: { xs: "100%", sm: 200 }, borderRadius: MAIN_BORDER_RADIUS };
  return (
    <Flex gap2 sx={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Flex gap2 sx={{ width: { xs: "100%", sm: "auto" } }}>
        <Select placeholder="Mock Filter" sx={stylesSelect} />
        <Select placeholder="Mock Filter" sx={stylesSelect} />
      </Flex>
      <Flex>
        <Button onClick={() => setAddTxModal(true)} sx={{ width: { xs: "100%", sm: "auto" } }}>
          <Typography sx={{ color: "neutral.50", display: { xs: "none", sm: "block" } }}>Add Budget</Typography>
          <Typography sx={{ color: "neutral.50", display: { xs: "block", sm: "none" } }}>+</Typography>
        </Button>
        <AddEditTxModal open={addTxModal} onClose={() => setAddTxModal(false)} userId={userId} status={status} />
      </Flex>
    </Flex>
  );
};
