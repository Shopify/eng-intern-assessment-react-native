import React from "react";
import { Text, View, StyleSheet } from "react-native";

// StopWatch.tsx should be purely a presentational component - it should only be responsible for rendering the time.
// This allows for separation of concerns and also allows this component to be more SFB (safe from bugs), RFC (ready for change), ETU (easy to understand).

type Props = {
  time: number;
};

/**
 * Converts a time value in seconds to a formatted string representing hours, minutes, and seconds.
 *
 * This function takes a number of seconds and converts it into a string in the HH:MM:SS format.
 *
 * Example usage:
 * - formatTime(3661) would return "01:01:01"
 * - formatTime(45) would return "00:00:45"
 *
 * @param {number} time - The time in seconds to be formatted.
 * @returns {string} A string representing the formatted time.
 */
export function formatTime(time: number): string {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return `${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

/**
 * Stopwatch is a presentational component that renders the current time of a stopwatch.
 * It is responsible solely for displaying the time in an HH:MM:SS format.
 *
 * Props:
 * - time: The current time of the stopwatch in seconds.
 *
 * This component converts the `time` prop, which is a numeric value representing seconds,
 * into a formatted string showing hours, minutes, and seconds. The conversion is handled
 * by the `formatTime` function, which formats the time into an HH:MM:SS string.
 *
 * The component uses a `View` container with styled `Text` to display the formatted time.
 * The styles are defined to create a visually appealing and clear display of the stopwatch time.
 *
 */

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
    backgroundColor: "#5f8d3e",
    borderRadius: 10, // Rounded corners
    width: "80%",
    marginTop: 50, // Move the timer a bit down from the top
    alignItems: "center", // Center align the items
  },
  time: {
    fontSize: 48,
    color: "white", // Text color
    fontWeight: "bold",
  },
});
