import { useState } from "react";
import { Text, View } from "react-native";
import StopWatchButton from "../StopWatchButton/StopWatchButton";
import { formatTime } from "../../utils/TimeUtils";

interface StopWatchProps {
  time: number;
}

export default function StopWatch(props: StopWatchProps) {
  const { time } = props;

  const formattedTime = formatTime(time);

  return (
    <View>
      <Text>{formattedTime}</Text>
    </View>
  );
}
