import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { colors, fonts } from "../styles";

/**
 * Props for StopWatchButton component.
 */
interface Props {
  onStartStop: () => void; // Function to handle start/stop actions
  onReset: () => void; // Function to handle reset action
  onLap: () => void; // Function to handle lap action
  isRunning: boolean; // State to indicate if the stopwatch is running
}

/**
 * StopWatchButton component.
 *
 * This component renders the stopwatch buttons for Start/Stop, Reset/Lap.
 * It dynamically changes the appearance and function of the buttons based on
 * the running state of the stopwatch.
 *
 * @param {Props} props The props for the component.
 * @return {object} The style object.
 */
const StopWatchButton: React.FC<Props> = ({
  onStartStop,
  onReset,
  onLap,
  isRunning,
}) => (
  <View style={styles.buttonContainer}>
    {/* Button for Lap or Reset */}
    <TouchableOpacity
      testID="lap-reset"
      style={[styles.button, styles.grayButton]}
      onPress={isRunning ? onLap : onReset}
    >
      <Text style={[styles.text, styles.whiteText]}>
        {isRunning ? "Lap" : "Reset"}
      </Text>
    </TouchableOpacity>

    {/* Button for Start or Stop */}
    <TouchableOpacity
      testID="start-stop"
      style={[styles.button, isRunning ? styles.redButton : styles.greenButton]}
      onPress={onStartStop}
    >
      <Text
        style={[styles.text, isRunning ? styles.redText : styles.greenText]}
      >
        {isRunning ? "Stop" : "Start"}
      </Text>
    </TouchableOpacity>
  </View>
);

/**
 * Styles for the StopWatchButton component.
 */
const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  // Styles for different button states
  redButton: {
    backgroundColor: colors.red,
  },
  greenButton: {
    backgroundColor: colors.green,
  },
  grayButton: {
    backgroundColor: colors.gray,
  },
  text: {
    fontSize: 20,
    fontFamily: fonts.main,
  },
  redText: {
    color: colors.lightRed,
  },
  greenText: {
    color: colors.lightGreen,
  },
  whiteText: {
    color: colors.white,
  },
});

export default StopWatchButton;
