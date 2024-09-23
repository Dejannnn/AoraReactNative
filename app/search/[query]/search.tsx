import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const search = () => {
  const {query} = useLocalSearchParams();
  console.log(">>>>query>>", query)
  return (
    <View>
      <Text className='text-white'>{query}</Text>
    </View>
  )
}

export default search