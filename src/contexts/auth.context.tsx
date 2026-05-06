import { jwtDecode } from "jwt-decode";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHasTx } from "../api/tx-api";
import { DataService } from "../services/data-service";

type AuthContextProps = {
  isAuthenticated: boolean;
  userId: string;
  token: string | null;
  hasData: boolean;
  loadingData: boolean;
  handleSignup: (payload: SignupPayloadProps) => Promise<void>;
  handleLogin: (payload: LoginPayloadProps) => Promise<void>;
  handleLogout: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

type SignupPayloadProps = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

type LoginPayloadProps = {
  email: string;
  password: string;
};

type DecodedTokenProps = {
  aud: string;
  sub: string;
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);
  const { hasData, loading: loadingData } = useHasTx(userId);

  useEffect(() => {
    const storedToken = window.localStorage.getItem("authToken");
    if (storedToken) {
      const decodedStoreToken: DecodedTokenProps = jwtDecode(storedToken);
      userData(storedToken, decodedStoreToken);
    }
  }, []);

  const userData = (token: string, decodedToken: DecodedTokenProps) => {
    if (token) {
      setToken(token);
    }
    if (decodedToken.aud === "authenticated") {
      setIsAuthenticated(true);
    }
    if (decodedToken.sub) {
      setUserId(decodedToken.sub);
    }
  };

  const handleSignup = async (payload: SignupPayloadProps) => {
    try {
      const response = await DataService.postData("/auth/signup", payload);
      if (response.data) {
        const token = response.data.session.access_token;
        window.localStorage.setItem("authToken", token);
        const decodedToken: DecodedTokenProps = jwtDecode(token);
        userData(token, decodedToken);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  const handleLogin = async (payload: LoginPayloadProps) => {
    try {
      const response = await DataService.postData("/auth/login", payload);
      if (response.error) {
        throw new Error(response.error);
      } else if (response.data) {
        const token = response.data.session.access_token;
        window.localStorage.setItem("authToken", token);
        const decodedToken: DecodedTokenProps = jwtDecode(token);
        userData(token, decodedToken);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const handleLogout = async () => {
    setUserId("");
    setToken(null);
    setIsAuthenticated(false);
    window.localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userId,
        token,
        hasData,
        loadingData,
        handleSignup,
        handleLogin,
        handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
