import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface StopWatchButtonProps {
  label: string;
  onPress: () => void;
  color: string;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({
  label,
  onPress,
  color,
}) => {
  const buttonStyles = [styles.button, { backgroundColor: color }];

  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default StopWatchButton;
