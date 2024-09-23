import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

//Components
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";

//Constants
import { PICKER_TYPE } from "@/constants";
//Types
import { FormCreateContentProps } from "@/types/index";

//Actions
import { createVideo } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalpProvider";
const Create = () => {
  const { user } = useGlobalContext();
  const [form, setForm] = useState<FormCreateContentProps>({
    title: "",
    video: null,
    thumbnail: null,
    propt: "",
  });
  const [uploading, setUploading] = useState<boolean>(false);

  const openPicker = async (selectType: string) => {
    const documentData = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === PICKER_TYPE.IMAGE
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });
    if (!documentData.canceled) {
      if (selectType === PICKER_TYPE.IMAGE) {
        setForm({ ...form, thumbnail: documentData.assets[0] });
      }
      if (selectType === PICKER_TYPE.VIDEO) {
        setForm({ ...form, video: documentData.assets[0] });
      }
    }
  };

  const submit = async () => {
    if (!form.title || !form.propt || !form.thumbnail || !form.video) {
      Alert.alert("Required fileds", "All fileds are required!");
      return;
    }
    setUploading(true);
    try {
      form.userId = user.$id;
      await createVideo(form);
      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error: any) {
      Alert.alert("Error", error?.message);
    } finally {
      setForm({ title: "", video: null, thumbnail: null, propt: "" });
      setUploading(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-white text-2xl fon-bold">Upload content</Text>
        <FormField
          placeholder="Give your video title..."
          title="Video title"
          value={form.title}
          handleChangeText={(event: string) =>
            setForm({ ...form, title: event })
          }
          componentStyle="mt-10"
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100">Upload Video</Text>

          <TouchableOpacity onPress={() => openPicker(PICKER_TYPE.VIDEO)}>
            {form?.video ? (
              <Video
                source={{ uri: form.video?.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Ionicons
                    name="laptop"
                    color="gray"
                    size={20}
                    style={[{ marginBottom: -3 }]}
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100">Thumbnail Image</Text>
          <TouchableOpacity onPress={() => openPicker(PICKER_TYPE.IMAGE)}>
            {form?.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail?.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode="cover"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
                <Ionicons
                  name="laptop"
                  color="gray"
                  size={20}
                  style={[{ marginBottom: -3 }]}
                />
                <Text className="text-sm text-gray-100">Choouse image</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          placeholder="AI prompt..."
          title="Video propt"
          value={form.propt}
          handleChangeText={(event: string) =>
            setForm({ ...form, propt: event })
          }
          componentStyle="mt-7"
        />

        <CustomButton
          title="Upload content"
          handleOnPress={submit}
          isLoading={uploading}
          containerStyles="mt-7"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
