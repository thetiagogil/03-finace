import { useContext } from "react";
import { useGetTxByStatus } from "../api/tx-api";
import { AddEditTx } from "../components/layout/add-tx";
import { TxColumn } from "../components/layout/tx-column";
import { AuthPageContainer } from "../components/shared/containers";
import { Flex } from "../components/shared/flex";
import { Loading } from "../components/shared/loading";
import { AuthContext } from "../contexts/auth.context";
import { InfoContext } from "../contexts/info.context";

export const TransactionsPage = () => {
  const { userId } = useContext(AuthContext);
  const { loadingUserData } = useContext(InfoContext);
  const { data: transactions, loading: transactionsLoading } = useGetTxByStatus({ userId, status: "tracked" });
  const isLoading = loadingUserData || transactionsLoading;

  return (
    <AuthPageContainer
      leftChildren={
        <Flex y gap3>
          {isLoading ? <Loading /> : <TxColumn transactions={transactions} />}
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
