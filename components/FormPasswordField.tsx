import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

type FormFieldProps = {
  title: string;
  value: string;
  handleChangeText: (event: string) => void;
  componentStyle: string;
  keyboardType?: string;
  placeholder?: string;
};
const FormField = ({
  title,
  value,
  handleChangeText,
  componentStyle,
  keyboardType,
  placeholder = "Filed in password",
  ...props
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <View className={`${componentStyle} space-y-2`}>
      <Text className="text-base text-gray-100 ">{title}</Text>
      <View className="w-full h-16 border-2 border-black-200 bg-black-100 px-4 focus:border-secondary items-center rounded-2xl flex-row">
        <TextInput
          className="flex-1 text-white text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor={"#7b7b8b"}
          onChangeText={handleChangeText}
          secureTextEntry={!showPassword}
        />
        <Ionicons
          name={!showPassword ? "eye" : "eye-outline"}
          color="gray"
          size={20}
          style={[{ marginBottom: -3 }]}
          onPress={() => {
            setShowPassword(prevSate => !prevSate);
          }}
        />
      </View>
    </View>
  );
};

export default FormField;
