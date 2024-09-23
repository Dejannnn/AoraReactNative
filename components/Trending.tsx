import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
//Types
import { Post } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { Video, ResizeMode } from "expo-av";

type TrendingProps = {
  posts: Post[];
};
type TredingItemProps = {
  activeItem: any;
  item: Post;
};

const scaleZoomOutAnimation: Animatable.CustomAnimation = {
  from: { scaleX: 0.9, scaleY: 0.9 }, // Start scaled down
  to: { scaleX: 0.9, scaleY: 0.9 }, // Scale to normal size
};
const scaleZoomInAnimation: Animatable.CustomAnimation = {
  from: { scaleX: 1, scaleY: 1 }, // Start scaled down
  to: { scaleX: 1, scaleY: 1 }, // Scale to normal size
};
const TrendingItem = ({ activeItem, item }: TredingItemProps) => {
  const [play, setPlay] = useState(false);
  return (
    <Animatable.View
      className="mr-5"
      animation={
        activeItem === item.$id ? scaleZoomInAnimation : scaleZoomOutAnimation
      }
      duration={500}
    >
      {play ? (
        <Video
          className="w-52 h-72 rounded-[25px] mt-3 bg-white/10"
          source={{ uri: item.video}}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay={true}
          onPlaybackStatusUpdate={(status) => {
            if (status?.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Ionicons
            name={"play"}
            color="white"
            size={32}
            style={[{ position: "absolute" }]}
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }: TrendingProps) => {
  const [activeItem, setActiveItem] = useState<any>(posts[1]);

  const viwableItemChanges = ({ viewableItems }: { viewableItems: any }) => {
    setActiveItem(viewableItems[0].key);
  };
  return (
    <View>
      <FlatList
        data={posts ?? []}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <TrendingItem activeItem={activeItem} item={item} />
        )}
        onViewableItemsChanged={viwableItemChanges}
        viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
        contentOffset={{ x: 170, y: 170 }}
        horizontal
      />
    </View>
  );
};

export default Trending;
