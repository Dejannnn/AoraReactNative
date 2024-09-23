import { View, Text } from "react-native";
import React from "react";
import { router } from "expo-router";
import CustomButton from "./CustomButton";
type EmptyStateProps = {
  title: string;
  subtitle: string;
};

const EmptyState = ({ title, subtitle }: EmptyStateProps) => {
  return (
    <View className="justify-center items-center px-4">
      <Text className="text-gray-100 text-sm">{subtitle}</Text>
      <Text className="text-xl text-center mt-2 text-white">{title}</Text>
      <CustomButton
        isLoading={false}
        containerStyles="w-full my-5"
        title="Add videos"
        handleOnPress={() => router.push("/create")}
      />
    </View>
  );
};

export default EmptyState;
