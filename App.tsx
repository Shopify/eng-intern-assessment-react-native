import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StopWatchButton from "./src/StopWatchButton";
import StopWatch from "./src/StopWatch";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30 }}>Stopwatch App</Text>
      <StatusBar style="auto" />
      <StopWatch></StopWatch>
      {/* <StopWatchButton></StopWatchButton> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
