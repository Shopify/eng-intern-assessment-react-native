import React from "react";
import { Text, View, StyleSheet } from "react-native";

// This file handles displaying the time and nothing else. Modularize code by passing in props to the renderer.
// In this case, pass only the time.

type Props = {
  time: number;
};

// Make a function to process the time into the desired format
// Format time to HH:MM:SS
export function formatTime(time: number): string {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return `${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

export default function Stopwatch({ time }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.time}>{formatTime(time)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  time: {
    fontSize: 48,
  },
});
