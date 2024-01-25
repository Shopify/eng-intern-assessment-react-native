import { View, Text } from 'react-native';
import React from "react";


interface StopwatchButtonProps {
  title: string,
  onPress: () => void;
}
export default function StopWatchButton({title, onPress} : Readonly<StopwatchButtonProps>) {
  return (
    <View >
      <Text onPress={onPress} style={{padding: 10, borderWidth:1, borderColor: 'gray'}}>
        {title}
      </Text>
    </View>
  );
}