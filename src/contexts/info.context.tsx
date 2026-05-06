import { createContext, ReactNode, useContext } from "react";
import { useHasTx } from "../api/tx-api";
import { useGetUser } from "../api/users-api";
import { currencies } from "../components/arrays/currency-array";
import { UserModel } from "../models/user.model";
import { AuthContext } from "./auth.context";

type UserProps = {
  data: UserModel;
};

type InfoContextProps = {
  userData: UserProps;
  userHasData: boolean;
  userCurrencySymbol: string;
  loadingUserData: boolean;
  loadingUserHasData: boolean;
};

type InfoContextProviderProps = {
  children: ReactNode;
};

export const InfoContext = createContext({} as InfoContextProps);

export const InfoContextProvider = ({ children }: InfoContextProviderProps) => {
  const { userId } = useContext(AuthContext);
  const { data: userData, loading: loadingUserData } = useGetUser({ userId });
  const { data: userHasData, loading: loadingUserHasData } = useHasTx(userId);
  const userCurrencyCode = userData.data?.wallet_currency ?? "EUR";
  const userCurrencySymbol = currencies.find(c => c.code === userCurrencyCode)?.symbol || userCurrencyCode;

  return (
    <InfoContext.Provider
      value={{
        userData,
        userHasData,
        userCurrencySymbol,
        loadingUserData,
        loadingUserHasData
      }}
    >
      {children}
    </InfoContext.Provider>
  );
};
