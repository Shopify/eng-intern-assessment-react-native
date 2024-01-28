import React from "react";
import { View, Button, StyleSheet } from "react-native";

// StopWatchButton.tsx should be purely a presentational component - it should only be responsible for rendering buttons.
// This allows for separation of concerns and also allows this component to be more SFB (safe from bugs), RFC (ready for change), ETU (easy to understand).

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
