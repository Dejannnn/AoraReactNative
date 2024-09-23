import { useEffect, useState } from "react";
import { Alert } from "react-native";
//Types
import {Post} from "@/types/index"

export const useAppwrite = (fn: any) => {
  const [data, setData] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await fn();
      setData(data);
    } catch (error: any) {
      Alert.alert("Error fetch", error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const refersh = () => getData();
  return { data, isLoading, refersh };
};
