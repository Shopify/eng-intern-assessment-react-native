import React, { FC } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

// Interface for the props of StopWatchButton component
interface StopWatchButtonProps {
  title: string; // The title to be displayed on the button
  onPress: () => void; // The function to be called when the button is pressed
  disabled: boolean; // Whether the button is disabled
}

// StopWatchButton component: A button component for the stopwatch actions.
const StopWatchButton: FC<StopWatchButtonProps> = ({
  title,
  onPress,
  disabled = false,
}) => {
  const styles = StyleSheet.create({
    button: {
      // Stop buttons are red
      // Disabled buttons are grey
      // Otherwise, buttons are Shopify Green
      backgroundColor:
        title == "Stop" ? "red" : disabled ? "#d3dbc4" : "#96BF48",
      padding: 10,
      borderRadius: 5,
      margin: 5,
    },
    buttonText: {
      color: "#ffffff",
      fontSize: 16,
      textAlign: "center",
    },
  });

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={styles.button}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default StopWatchButton;
