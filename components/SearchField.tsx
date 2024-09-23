import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";

type SearchFieldProps = {
  placeholder?: string;
  initialQuery?: string;
};

const SearchField = ({
  placeholder = "Filed in this",
  initialQuery,
}: SearchFieldProps) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery ?? "");
  return (
    <View className="space-x-4 w-full h-16 border-2 border-black-200 bg-black-100 px-4 focus:border-secondary items-center rounded-2xl flex-row">
      <TextInput
        className="flex-1 text-white text-base mt-0.5"
        value={query}
        placeholder={placeholder}
        placeholderTextColor={"#7b7b8b"}
        onChangeText={(event: string) => setQuery(event)}
      />
      <TouchableOpacity>
        <Ionicons
          name={"search"}
          color="gray"
          size={20}
          style={[{ marginBottom: -3 }]}
          onPress={() => {
            if (!query) {
              Alert.alert("Missing Query", "Please input value in search...");
              return;
            }
            if (pathname.startsWith("/search")) {
              router.setParams({ query });
            } else {
              router.push(`/search/${query}`);
            }
            return;
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchField;
