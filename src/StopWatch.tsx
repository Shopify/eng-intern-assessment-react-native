import { View, Text, StyleSheet } from "react-native";
import { formatTime } from "../utils/utils";

// StopWatch Component: Displays the current time of the stopwatch
export default function StopWatch({ currentTime }: { currentTime: number }) {
  // Formatting the current time for display
  const formattedTime = formatTime(currentTime);

  // Component render
  return (
    <View style={styles.container}>
      <Text style={styles.stopWatchText}>{formattedTime}</Text>
    </View>
  );
}

// Styles for the StopWatch component
const styles = StyleSheet.create({
  container: {
    // Style for the container view
    alignItems: "center", // Centers the text horizontally
    justifyContent: "center", // Centers the text vertically
  },
  stopWatchText: {
    // Style for the stopwatch text
    fontSize: 60, // Large font size for better visibility
    // Add more styling as needed
  },
});
