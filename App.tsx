import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StopWatch from "./src/components/StopWatch";
import StopWatchButton, {
  StateMapping,
  StopButtonState,
  StopButtonType,
} from "./src/components/StopWatchButton";
import { useState } from "react";
import React from "react";

export default function App() {
  return (
    <View>
      <StopWatch />
    </View>
  );
}
