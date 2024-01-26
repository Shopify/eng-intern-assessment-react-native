import React, { useState } from "react";
import { Text, View } from "react-native";
import calculateTimer from "./utils/timeutils";

interface StopWatchProps {
  name: string;
  onPress: () => void;
}

export default function StopWatchButton({
  name,
  onPress,
}: Readonly<StopWatchProps>) {
  return (
    <View>
      <Text
        onPress={onPress}
        style={{
          padding: 10,
          borderWidth: 1,
          borderColor: "blue",
          display: "flex",
        }}
      >
        {name}
      </Text>
    </View>
  );
}
