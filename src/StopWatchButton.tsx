import React, { FC } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";

interface StopWatchButtonProps {
  title: string;
  onPress: () => void;
  running?: boolean;
  disabled?: boolean;
}

const StopWatchButton: FC<StopWatchButtonProps> = ({
  title,
  onPress,
  running,
  disabled,
}) => {
  const buttonStyle: StyleProp<ViewStyle> = {
    backgroundColor: running ? "red" : "green",
  };

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 8,
    height: 50,
    width: 100,
    borderRadius: 50,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default StopWatchButton;
