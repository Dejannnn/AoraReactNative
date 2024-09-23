import { TouchableOpacity, Text } from "react-native";
import React from "react";
import { isLoaded } from "expo-font";

type ButtonProps = {
  title: string;
  handleOnPress: any;
  containerStyles: string;
  isLoading: boolean;
};

const CustomButton = ({
  title,
  handleOnPress,
  containerStyles,
  isLoading,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handleOnPress}
      activeOpacity={0.7}
      className={`bg-orange-400 rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className="text-primary font-bold text-lg">{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
