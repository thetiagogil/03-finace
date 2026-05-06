import { Avatar, Stack, Typography } from "@mui/joy";
import { capFirstLetter } from "../../utils/typo";
import { txCategoriesArray } from "../arrays/tx-array";
import { Flex } from "../shared/flex";

type ActivityItemCardProps = {
  onClick: () => void;
  tx: { value: number; category: string; type: string };
};

export const ActivityItemCard = ({ onClick, tx }: ActivityItemCardProps) => {
  const category = txCategoriesArray.find(cat => cat.name === tx.category);
  const Icon = category ? category.icon : null;

  return (
    <Stack
      onClick={onClick}
      sx={{
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
        <Avatar
          variant="outlined"
          size="sm"
          sx={{
            color: tx.type === "income" ? "#14508ccc" : "#501464cc",
            bgcolor: tx.type === "income" ? "#14508c33" : "#50146433"
          }}
        >
          {Icon && <Icon size={20} />}
        </Avatar>
        <Typography level="title-sm">{capFirstLetter(tx.category)}</Typography>
      </Flex>
      <Typography
        level="title-sm"
        sx={{ display: "flex", alignItems: "center", color: tx.type === "income" ? "#14508ccc" : "#501464cc" }}
      >
        {tx.type === "income" ? "+" + tx.value : "-" + tx.value}
      </Typography>
    </Stack>
  );
};
