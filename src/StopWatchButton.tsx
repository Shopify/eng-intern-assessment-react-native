import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

interface StopWatchButtonProps {
  title: string;
  onPress: () => void;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({
  title,
  onPress,
}) => {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: "#007bff",
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
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default StopWatchButton;
