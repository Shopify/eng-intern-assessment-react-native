import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type StopWatchButtonProps = {
  title: string;
  onPress: () => void;
  activeColour: string;
  disabled?: boolean;
};

const StopWatchButton = ({
  title,
  onPress,
  disabled,
  activeColour,
}: StopWatchButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: disabled ? "rgba(64, 64, 64, 0.3)" : activeColour },
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText}>{title}</Text>
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
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
});

export default StopWatchButton;
