import { View, Text, TextInput } from "react-native";
import React from "react";

type FormFieldProps = {
  title: string;
  value: string;
  handleChangeText: (event: string) => void;
  componentStyle?: string;
  keyboardType?: string;
  placeholder?: string;
};
const FormField = ({
  title,
  value,
  handleChangeText,
  componentStyle,
  keyboardType,
  placeholder = "Filed in this",
  ...props
}: FormFieldProps) => {
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
        />
      </View>
    </View>
  );
};

export default FormField;
