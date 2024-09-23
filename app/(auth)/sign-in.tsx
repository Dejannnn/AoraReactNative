import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

//Components
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import FormPasswordField from "@/components/FormPasswordField";
import { Link, router } from "expo-router";

//Appwrite actions
import { getCurrentUser, signIn as signInUser } from "@/lib/appwrite";

//Context
import { useGlobalContext } from "@/context/GlobalpProvider";

type FormStateProps = {
  email: string;
  password: string;
};
const signIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState<FormStateProps>({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const submit = async () => {
    setIsSubmitting(true);
    const { password, email } = form;
    setIsSubmitting(true);
    if (!password.trim().length || !email.trim().length) {
      Alert.alert("Required fileds", "All fileds are requred");
      setIsSubmitting(false);
      return;
    }
    try {
      await signInUser(email, password);
      const curretUser = await getCurrentUser();
      setUser(curretUser);
      setIsLoggedIn(true);
      router.replace("/home");
    } catch (error: any) {
      Alert.alert("Sign in", error.message);
    }finally{
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] px-4 my-6">
          <Image
            resizeMode="contain"
            className="w-[115px] h-[35px]"
            source={require("@/assets/images/react-logo.png")}
          />
          <Text className="text-2xl text-white mt-10">Login in to Aora</Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(event: string) =>
              setForm({ ...form, email: event })
            }
            componentStyle="mt-7"
            keyboardType="email-address"
            placeholder="Type your email here"
          />
          <FormPasswordField
            title="Password"
            value={form.password}
            handleChangeText={(event: string) =>
              setForm({ ...form, password: event })
            }
            componentStyle="mt-7"
            placeholder="Type your password here"
          />
          <CustomButton
            isLoading={isSubmitting}
            title="Sign in"
            handleOnPress={submit}
            containerStyles="w-full mt-7"
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100">
              If you don't have account please{" "}
              <Link className="text-lg text-secondary-200" href="/sign-up">
                sign-up
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default signIn;
