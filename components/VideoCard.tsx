import { View, Text, Image, TouchableOpacity } from "react-native";
import React, {useState} from "react";
//Types
import { Post } from "@/types/index";
import { Ionicons } from "@expo/vector-icons";
import { ResizeMode, Video } from "expo-av";
type VideoCardProps = {
  video: Post;
};
const VideoCard = ({
  video: {
    title,
    video,
    thumbnail,
    creator: { username, avatar },
  },
}: VideoCardProps) => {
  const [playVideo, setPlayVideo] = useState<boolean>(false);
  
  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 item-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 gap-y-1 ml-3">
            <Text className="text-white text-sm" numberOfLines={1}>
              {title}
            </Text>
            <Text className="text-gray-100 text-xs" numberOfLines={1}>
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Ionicons
            name={"options"}
            color="gray"
            size={20}
            style={[{ marginBottom: -3 }]}
            onPress={() => {
              alert("Option");
            }}
          />
        </View>
      </View>
      {playVideo ? (
        <Video
          className="w-full h-60 rounded-xl mt-3"
          source={{ uri: video }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status?.didJustFinish) {
              setPlayVideo(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlayVideo(true)}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            resizeMode="cover"
            className="w-full h-full rounded-xl mt-3"
          />
          <Ionicons
            name={"play"}
            color="white"
            size={42}
            style={[{ position: "absolute" }]}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
