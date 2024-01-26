import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { useContext, useState, useEffect } from "react";

interface ButtonProps {
  handlePress: () => void;
  label: string;
  backgroundColor: string;
}

export default function StopWatchButton({
  handlePress,
  label,
  backgroundColor,
}: ButtonProps) {
  return (
    <View style={[styles.btn, { backgroundColor: backgroundColor }]}>
      <TouchableOpacity onPress={handlePress}>
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
    backgroundColor: "#64cc6e", // default background color if not provided
  },
  btnLabel: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});
