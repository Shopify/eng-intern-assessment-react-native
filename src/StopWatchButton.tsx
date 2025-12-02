import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { useContext, useState, useEffect } from "react";

interface ButtonProps {
  handlePress: () => void; // Function to be called when the button is pressed
  label: string; // Text label for the button
  backgroundColor: string; // Background color for the button (hex)
}

// Functional component for a customizable stopwatch button
export default function StopWatchButton({
  handlePress,
  label,
  backgroundColor,
}: ButtonProps) {
  return (
    <View style={[styles.btn, { backgroundColor: backgroundColor }]}>
      {/* TouchableOpacity is used to make the View respond to touches */}
      <TouchableOpacity onPress={handlePress}>
        {/* Text of the button */}
        <Text style={styles.btnLabel}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    padding: 10,
    borderRadius: 5,
    margin: 8,
    backgroundColor: "#64cc6e", // Default background color, overridden by props if provided
  },
  btnLabel: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});
