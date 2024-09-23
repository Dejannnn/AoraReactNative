import { View, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

//Custom hooks
import { useAppwrite } from "@/lib/useAppwrite";
//Types
import { Post } from "@/types";
//Component
import VideoCard from "@/components/VideoCard";
import EmptyState from "@/components/EmptyState";
import InfoBox from "@/components/InfoBox";

//Actions
import { searchUserPosts, signOut } from "@/lib/appwrite";
//Context
import { useGlobalContext } from "@/context/GlobalpProvider";
import { router } from "expo-router";

const profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts } = useAppwrite(() => searchUserPosts(user.$id));

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts ?? []}
        keyExtractor={(item: Post) => item.$id}
        renderItem={({ item }: { item: Post }) => (
          <View>
            <VideoCard video={item} />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos found"
            subtitle="No videos found for this search query"
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <View className="w-full flex-row-reverse">
              <TouchableOpacity className="mb-10">
                <Ionicons
                  name={"log-out"}
                  color="white"
                  size={44}
                  style={[{ marginBottom: -3 }]}
                  onPress={async () => {
                    await signOut();
                    setUser(null);
                    setIsLoggedIn(false);
                    router.replace("/sign-in");
                  }}
                />
              </TouchableOpacity>
            </View>
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                resizeMode="cover"
                className="w-[90%] h-[90%] rounded-lg"
              />
            </View>
            <InfoBox
              title={user?.username}
              containerStyle="mt-5"
              titleStyle="text-lg"
            />

            <View className="mt-5 flex-row">
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                containerStyle="mr-10"
                titleStyle="text-xl"
              />
              <InfoBox title="1.2k" subtitle="Followers" titleStyle="text-xl" />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default profile;
