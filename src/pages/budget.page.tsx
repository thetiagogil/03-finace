import { useContext } from "react";
import { useGetYearCategorySummary } from "../api/years-api";
import { AddEditTx } from "../components/layout/add-tx";
import { BudgetColumn } from "../components/layout/budget-column";
import { AuthPageContainer } from "../components/shared/containers";
import { Flex } from "../components/shared/flex";
import { Loading } from "../components/shared/loading";
import { AuthContext } from "../contexts/auth.context";
import { InfoContext } from "../contexts/info.context";

export const BudgetPage = () => {
  const { userId } = useContext(AuthContext);
  const { loadingUserData } = useContext(InfoContext);
  const { data: categoriesSum, loading: categoriesSumLoading } = useGetYearCategorySummary({
    userId,
    year: 2024,
    month: "feb"
  });
  const isLoading = loadingUserData || categoriesSumLoading;
  return (
    <AuthPageContainer
      leftChildren={
        <Flex y gap2>
          {isLoading ? <Loading /> : <BudgetColumn categoriesSum={categoriesSum} />}
        </Flex>
      }
      rightChildren={
        <Flex y gap2>
          <AddEditTx userId={userId} status="tracked" />
        </Flex>
      }
    />
  );
};
