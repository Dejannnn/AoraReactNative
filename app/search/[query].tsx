import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
//Componets
import EmptyState from "@/components/EmptyState";
import VideoCard from "@/components/VideoCard";

//Custom hooks
import { useAppwrite } from "@/lib/useAppwrite";
//Actions
import { searchPosts } from "@/lib/appwrite";
//Types
import { Post } from "@/types/index";
import SearchField from "@/components/SearchField";
const Search = () => {
  const { query } = useLocalSearchParams();

  const { data: posts, refersh } = useAppwrite(() => searchPosts(query as string));

  useEffect(() => {
    refersh();
  }, [query]);

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
          <View className="my-6 px-4">
            <Text className="text-sm text-gray-100">Search reuslts</Text>
            <Text className="text-2xl font-bold text-white">{query}</Text>
            <View className="mt-6 mb-8">
              <SearchField
                placeholder="Search videos"
                initialQuery={query as string}
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
