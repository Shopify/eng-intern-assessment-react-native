import { View, StyleSheet, Text } from "react-native";

// Define the props interface for the StopWatch component.
interface StopWatchCounterProps {
  time: string; // Formatted time 
}

export default function StopWatchCounter({ time }: StopWatchCounterProps) {

  return (
    <View style={styles.container}>
      <Text testID="stopwatch-text" style={styles.stopWatch}>{time ? time : "00:00:00"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#000",
  },
  // Stopwatch text styles
  stopWatch: {
    fontSize: 90,
    color: "#FFF",
  },
});
