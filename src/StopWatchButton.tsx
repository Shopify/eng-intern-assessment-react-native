import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface StopWatchProps {
  name: string;
  onPress: () => void;
}

export default function StopWatchButton({ name, onPress }: StopWatchProps) {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={{
          width: 140,
          margin: 10,
          padding: 12,
          borderRadius: 50,
          backgroundColor: "#89cff0",
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 30 }}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
}
