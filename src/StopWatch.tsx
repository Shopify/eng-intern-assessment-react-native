import { useEffect, useMemo, useState } from "react";
import { Button, Text, View } from "react-native";

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
    console.log("isRunning", isRunning);
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
    <View>
      <Text>{displayTimeMs}s</Text>
      {isRunning ? (
        <Button title="Stop" onPress={() => setIsRunning(false)} />
      ) : (
        <Button title="Start" onPress={() => setIsRunning(true)} />
      )}
    </View>
  );
}
