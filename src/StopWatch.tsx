import { View, StyleSheet, Text } from "react-native";

// Define the props interface for the StopWatch component.
interface StopWatchProps {
  time: string; // Formatted time 
}

export default function StopWatch({ time }: StopWatchProps) {

  return (
    <View style={styles.container}>
      <Text style={styles.stopWatch}>{time}</Text>
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
