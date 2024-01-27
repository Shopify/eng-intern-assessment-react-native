import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import StopWatch from "./src/StopWatch";

export default function App() {
  return (
    <View style={styles.container}>
      <StopWatch />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 300,
    flex: 1,
    backgroundColor: "#fff",
    overflow: "scroll",
  },
});
