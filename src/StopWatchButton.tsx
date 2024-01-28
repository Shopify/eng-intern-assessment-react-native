import React from "react";
import { View, Button, StyleSheet } from "react-native";

// This file handles buttons and nothing else. Modularize code by passing in props to the renderer.

type Props = {
  onStartStop: () => void;
  onLap: () => void;
  onReset: () => void;
  isRunning: boolean;
};

export default function StopwatchButton({
  onStartStop,
  onLap,
  onReset,
  isRunning,
}: Props) {
  // May need to change the texts of these based on what is written in the tests file
  return (
    <View style={styles.container}>
      <Button onPress={onStartStop} title={isRunning ? "Stop" : "Start"} />
      <Button onPress={onLap} title="Lap" disabled={!isRunning} />
      <Button onPress={onReset} title="Reset" />
    </View>
  );
}

// Define a stylesheet here
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    padding: 20,
  },
});
