import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type StopWatchButtonProps = {
  label: string;
  onPress: () => void;
  activeColour: string;
  disabledColour?: string;
  disabled?: boolean;
};

const StopWatchButton = ({
  label,
  onPress,
  activeColour,
  disabledColour = "rgba(64, 64, 64, 0.3)",
  disabled,
}: StopWatchButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: disabled ? disabledColour : activeColour },
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 80,
    height: 80,
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 50,
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default StopWatchButton;
