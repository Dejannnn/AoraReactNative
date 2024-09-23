import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
//Context
import { useGlobalContext } from "@/context/GlobalpProvider";


const App = () => {
  const {isLoading, isLoggedIn} = useGlobalContext()
  if(!isLoading && isLoggedIn) return <Redirect href="/home" />

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="min-h-[25vh] w-full justify-center items-center">
          {/* {ANOTHER_CONFIG} */}
          <Image
            resizeMode="contain"
            className="w-[130px] h-[84px]"
            source={require("@/assets/images/react-logo.png")}
          />
        </View>
        <View className="w-full itmes-center h-full px-4">
          <Image
            resizeMode="contain"
            className="max-w-[380px] w-full h-[250px]"
            source={require("@/assets/images/icon.png")}
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discoiver and Enjoy in
              <Text className="text-orange-400"> Aora</Text>
            </Text>
          </View>
          <CustomButton
            isLoading={false}
            title="Continue with Email"
            handleOnPress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="orange" style="light"></StatusBar>
    </SafeAreaView>
  );
};

export default App;
