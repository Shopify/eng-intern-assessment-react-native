import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { colors, fonts } from "../styles";

interface Props {
  onStartStop: () => void;
  onReset: () => void;
  onLap: () => void;
  isRunning: boolean;
}

const StopWatchButton: React.FC<Props> = ({
  onStartStop,
  onReset,
  onLap,
  isRunning,
}) => (
  <View style={styles.buttonContainer}>
    <TouchableOpacity
      testID="lap-reset"
      style={[styles.button, styles.grayButton]}
      onPress={isRunning ? onLap : onReset}
    >
      <Text style={[styles.text, styles.whiteText]}>
        {isRunning ? "Lap" : "Reset"}
      </Text>
    </TouchableOpacity>
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
