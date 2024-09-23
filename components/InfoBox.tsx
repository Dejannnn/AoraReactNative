import { View, Text } from 'react-native'
import React from 'react'

type InfoBoxProps = {
  title: string | number;
  subtitle?: string;
  containerStyle?: string;
  titleStyle: string;
};
const InfoBox = ({ title, subtitle, containerStyle, titleStyle }: InfoBoxProps) => {
  return (
    <View className={containerStyle}>
      <Text className={`text-white text-center font-bold ${titleStyle}`}>
        {title}
      </Text>
      <Text className={`text-gray-100 text-sm text-center font-thin ${titleStyle}`}>
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox