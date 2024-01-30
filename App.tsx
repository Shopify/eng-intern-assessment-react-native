import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import StopWatch from "./src/Components/StopWatch/StopWatch";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StopWatch />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#463f3a",
  },
});
