import { Text, FlatList, View, Image, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
//Components
import SearchField from "@/components/SearchField";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import VideoCard from "@/components/VideoCard";
//Types
import { Post } from "@/types/index";
//Action
import { getAllPost, getLatestsPost } from "@/lib/appwrite";
//Custom hook
import { useAppwrite } from "@/lib/useAppwrite";
//Context
import { useGlobalContext } from "@/context/GlobalpProvider";
const Home = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  const [refreshing, setRefrshing] = useState<boolean>(false);
  const { data: posts, refersh } = useAppwrite(getAllPost);
  const { data: latestsPost } = useAppwrite(getLatestsPost);

  const onRefersh = async () => {
    setRefrshing(true);
    await refersh();
    setRefrshing(false);
  };
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefersh} />
        }
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos found"
            subtitle="Be first who will upload a videos"
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-center items-start flex-row mb-6">
              <View className="flex-1">
                <Text className="text-sm text-gray-100">Welcome back,</Text>
                <Text className="text-2xl font-bold text-white">{user?.username}</Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={require("@/assets/images/react-logo.png")}
                  resizeMode="contain"
                  className="w-9 h-10"
                />
              </View>
            </View>
            <SearchField placeholder="Search videos" />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg mb-3">Last videos</Text>
              <Trending posts={latestsPost ?? []} />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
