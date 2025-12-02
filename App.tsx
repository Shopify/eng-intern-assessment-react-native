import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StopWatch from "./src/StopWatch";

// renders the timer, buttons, and lap times
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30 }}>Stopwatch App</Text>
      <StatusBar style="auto" />
      <StopWatch></StopWatch>
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
