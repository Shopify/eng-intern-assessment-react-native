import { useEffect, useMemo, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
  },
  stopWatchContainer: {
    alignItems: "center",
  },
});

const getCurrentTime = () => {
  return Date.now() / 1000;
};

export default function StopWatch() {
  // counting funcionality
  const [timeMs, setTimeMs] = useState(0);
  const [lastTimeMs, setLastTimeMs] = useState(0);

  // start/stop funcitonality
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setLastTimeMs(getCurrentTime());
    const interval = setInterval(() => {
      const newTimeMs = getCurrentTime();
      const diff = newTimeMs - lastTimeMs;
      if (isRunning) {
        setTimeMs(timeMs + diff);
      }
      setLastTimeMs(newTimeMs);
    }, 1);
    return () => clearInterval(interval);
  }, [isRunning]);

  // display
  const displayTimeMs = useMemo(() => timeMs.toFixed(3), [timeMs]);

  return (
    <View style={styles.stopWatchContainer}>
      <Text>{displayTimeMs}s</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Reset"
          disabled={isRunning}
          onPress={() => setTimeMs(0)}
        />
        {isRunning ? (
          <Button title="Stop" onPress={() => setIsRunning(false)} />
        ) : (
          <Button title="Start" onPress={() => setIsRunning(true)} />
        )}
      </View>
    </View>
  );
}
