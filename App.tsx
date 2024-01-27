import React from "react";
import { StyleSheet, View } from "react-native";
import StopWatch from "./src/StopWatch";


export default function App() {
  return (
    <View style={styles.container}>
      <StopWatch />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center",
  },
});
