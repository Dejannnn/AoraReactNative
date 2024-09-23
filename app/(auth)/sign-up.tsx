import { View, Text, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { Link, router } from "expo-router";

//Components
import FormField from "@/components/FormField";
import FormPasswordField from "@/components/FormPasswordField";
import CustomButton from "@/components/CustomButton";

//Appwrite actions
import { createUser } from "@/lib/appwrite";
//Context
import { useGlobalContext } from "@/context/GlobalpProvider";
type FormStateProps = {
  username: string;
  email: string;
  password: string;
};
const signUp = () => {
  const {setUser, setIsLoggedIn} = useGlobalContext();
  const [form, setForm] = useState<FormStateProps>({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const submit = async () => {
    const { password, username, email } = form;
    setIsSubmitting(true);
    if (
      !username.trim().length ||
      !password.trim().length ||
      !email.trim().length
    ) {
      Alert.alert("Required fileds", "All fileds are requred");
      setIsSubmitting(false);
      return;
    }
    try {
      const userInfo = await createUser(username, password, email);

       setUser(userInfo);
       setIsLoggedIn(true);

      router.replace("/home");
    } catch (error: any) {
      Alert.alert("Sign-up error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-[93vh] justify-center px-4 my-6">
          <Image
            resizeMode="contain"
            className="w-[115px] h-[35px]"
            source={require("@/assets/images/react-logo.png")}
          />
          <Text className="text-2xl text-white mt-10">Sign up to Aora</Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(event: string) =>
              setForm({ ...form, username: event })
            }
            componentStyle="mt-7"
            placeholder="Type your username here"
          />
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
            title="Sign up"
            handleOnPress={submit}
            containerStyles="w-full mt-7"
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100">
              If you have account please{" "}
              <Link className="text-lg text-secondary-200" href="/sign-in">
                sign-in
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default signUp;
