import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import StopWatch from "./src/StopWatch";

// Main App Component
export default function App() {
  // Component render
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <StopWatch />
    </View>
  );
}

const styles = StyleSheet.create({
  // Main container style for the entire app view
  container: {
    flex: 1, // Flex grow to fill the screen
    backgroundColor: "#ffffff", // White background color for the app
  },
});
