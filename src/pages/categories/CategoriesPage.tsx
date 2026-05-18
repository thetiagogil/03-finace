import { Container, Stack } from "@mui/material";
import { CategoryManager } from "../../features/finance/components/CategoryManager";
import { ResetRecordsButton } from "../../features/finance/components/ResetRecordsButton";
import { PageHeader } from "../../shared/components/layout/PageHeader";
import { useCategoriesPage } from "./hooks/useCategoriesPage";

export const CategoriesPage = () => {
  const { records } = useCategoriesPage();

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Stack spacing={4}>
        <PageHeader
          eyebrow="Taxonomy"
          title="Categories"
          description="Organize your income and expenses."
          actions={<ResetRecordsButton />}
        />
        <CategoryManager records={records} />
      </Stack>
    </Container>
  );
};
