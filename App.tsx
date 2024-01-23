import React from "react";
import { StyleSheet, View } from "react-native";
import MainView from "./src/MainView";

export default function App() {
  return (
    <View style={styles.container}>
      <MainView></MainView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});
