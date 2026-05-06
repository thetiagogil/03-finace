import { Avatar, Stack, Typography } from "@mui/joy";
import { useContext } from "react";
import { InfoContext } from "../../contexts/info.context";
import { capFirstLetter } from "../../utils/typo";
import { txCategoriesArray } from "../arrays/tx-array";
import { Flex } from "../shared/flex";

type TxItemCardProps = {
  onClick: () => void;
  tx: { value: number; category: string; description?: string; type: string };
};

export const TxItemCard = ({ onClick, tx }: TxItemCardProps) => {
  const { userCurrencySymbol } = useContext(InfoContext);
  const category = txCategoriesArray.find(cat => cat.name === tx.category);
  const Icon = category ? category.icon : null;
  const reducedDescription = tx.description
    ? tx.description.length > 50
      ? `${tx.description.slice(0, 50)}...`
      : tx.description
    : "";

  return (
    <Stack
      onClick={onClick}
      sx={{
        bgcolor: "neutral.50",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 2,
        px: 3,
        py: 1.5,
        cursor: "pointer",
        transition: "0.3s",
        "&:hover": { bgcolor: "neutral.200" }
      }}
    >
      <Flex x yc gap2>
        <Flex x yc gap2 sx={{ minWidth: 160 }}>
          <Avatar
            variant="outlined"
            size="md"
            sx={{
              color: tx.type === "income" ? "success.400" : "danger.400",
              borderColor: tx.type === "income" ? "success.400" : "danger.400"
            }}
          >
            {Icon && <Icon size={20} />}
          </Avatar>
          <Typography level="body-md">{capFirstLetter(tx.category)}</Typography>
        </Flex>
        <Flex sx={{ display: { xs: "none", md: "block" } }}>
          <Typography level="body-sm">{reducedDescription}</Typography>
        </Flex>
      </Flex>
      <Typography level="title-md">{userCurrencySymbol + tx.value}</Typography>
    </Stack>
  );
};
