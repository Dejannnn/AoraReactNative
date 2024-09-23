import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getCurrentUser } from "@/lib/appwrite";
const GlobalContext = createContext<any>(null); // You can specify a more precise type instead of 'any'

export const useGlobalContext = () => useContext(GlobalContext);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const value = {
    isLoggedIn,
    user,
    isLoading,
    setIsLoading,
    setUser,
    setIsLoggedIn,
  };

  useEffect(() => {
    setIsLoading(true);
    getCurrentUser()
      .then((userData) => {
        if (userData) {
          setIsLoggedIn(true);
          setUser(userData);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setIsLoggedIn(false);
        console.log("error get current user", error);
      }).finally(() => {
          setIsLoading(false);
      });
  }, []);
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
