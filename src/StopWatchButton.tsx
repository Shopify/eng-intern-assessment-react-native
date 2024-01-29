import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// StopWatchButton.tsx should be purely a presentational component; it should only be responsible for rendering buttons.
// This allows for separation of concerns and also allows this component to be more SFB (safe from bugs), RFC (ready for change), ETU (easy to understand).

type Props = {
  onStartStop: () => void;
  onLap: () => void;
  onReset: () => void;
  isRunning: boolean;
};

/**
 * StopwatchButton is a presentational component that renders the control buttons
 * for a stopwatch application. It displays three buttons: "Start"/"Stop", "Lap", and "Reset".
 * The "Start" button toggles to "Stop" based on the `isRunning` prop to reflect the current state of the stopwatch.
 *
 * Props:
 * - onStartStop: A callback function invoked when the "Start"/"Stop" button is pressed.
 * - onLap: A callback function invoked when the "Lap" button is pressed.
 * - onReset: A callback function invoked when the "Reset" button is pressed.
 * - isRunning: A boolean indicating whether the stopwatch is currently running.
 *
 * The component uses `TouchableOpacity` for each button to handle press interactions,
 * applying styles to create a circular button appearance. The "Lap" button becomes disabled
 * when the stopwatch is not running, indicated by the `isRunning` prop.
 */

export default function StopwatchButton({
  onStartStop,
  onLap,
  onReset,
  isRunning,
}: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onStartStop} style={styles.button}>
        <Text style={styles.buttonText}>{isRunning ? "Stop" : "Start"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onLap}
        style={styles.button}
        disabled={!isRunning}
      >
        <Text
          style={[styles.buttonText, !isRunning && styles.disabledButtonText]}
        >
          Lap
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onReset} style={styles.button}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}

// Custom styling for buttons done here
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    borderRadius: 35, // Half the width/height to make it circular
    borderWidth: 1,
    borderColor: "#94be46",
  },
  buttonText: {
    color: "#94be46",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButtonText: {
    color: "#cdcdcd",
  },
});
