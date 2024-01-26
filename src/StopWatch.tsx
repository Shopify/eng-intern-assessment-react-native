import { useEffect, useState } from "react";
import { Text, View } from "react-native";

const getCurrentTimeMs = () => {
  return Date.now() / 100_000_000_000_000;
};

export default function StopWatch() {
  const [timeMs, setTimeMs] = useState(0);
  const [lastTimeMs, setLastTimeMs] = useState(0);

  useEffect(() => {
    setLastTimeMs(getCurrentTimeMs());
    const interval = setInterval(() => {
      const newTimeMs = getCurrentTimeMs();
      const diff = newTimeMs - lastTimeMs;
      setTimeMs((time) => time + diff);
      setLastTimeMs(newTimeMs);
    }, 1);
    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      <Text>{timeMs.toFixed(3)}s</Text>
    </View>
  );
}
