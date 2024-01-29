import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  const [timeinSeconds, setTimeInSeconds] = useState(0);
  const [timeArray, setTimeArray] = useState<Array<number | string>>([]);

  useEffect(() => {
    setTimeArray(calculateTimeInSeconds(timeinSeconds));
  }, [timeinSeconds]);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30 }}>
        {timeArray[0]}:{timeArray[1]}:{timeArray[2]}
      </Text>
      <StopWatchButton setTimeInSeconds={setTimeInSeconds}></StopWatchButton>
    </View>
  );
}

function calculateTimeInSeconds(timeInSeconds: number): (number | string)[] {
  let hours: number = Math.floor(timeInSeconds / 3600);
  let minutes: number = Math.floor((timeInSeconds - hours * 3600) / 60);
  let seconds: number = timeInSeconds - hours * 3600 - minutes * 60;

  return [
    hours < 10 ? `0${hours}` : hours,
    minutes < 10 ? `0${minutes}` : minutes,
    seconds < 10 ? `0${seconds}` : seconds,
  ];
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
