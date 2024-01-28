import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StopWatchButton from "./src/StopWatchButton";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 50 }}>00:00:00</Text>
      <StatusBar style="auto" />

      <StopWatchButton></StopWatchButton>
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
