import { useEffect, useMemo, useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
  },
  stopWatchContainer: {
    alignItems: "center",
  },
  lapText: {
    flexDirection: "row",
    gap: 10,
  },
});

export default function StopWatch() {
  // counting funcionality
  const [timeMs, setTimeMs] = useState(0);
  const [lastTimeMs, setLastTimeMs] = useState<number | null>(null);

  const frameId = useRef<number | null>(null);

  // start/stop funcitonality
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setLastTimeMs(Date.now());

    const tick = (time: number) => {
      const currentTime = time / 1000;
      setLastTimeMs(currentTime);

      if (lastTimeMs === null) {
        return;
      }
      const diff = currentTime - lastTimeMs;
      if (isRunning) {
        setTimeMs(timeMs + diff);
      }

      frameId.current = requestAnimationFrame(tick);
    };

    frameId.current = requestAnimationFrame(tick);
    return () => {
      setLastTimeMs(null);
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
    };
  }, [isRunning]);

  // laps
  const [laps, setLaps] = useState<number[]>([]);
  const lapDiff = useMemo(() => {
    return laps.map(
      (cur, index, arr) => (index != 0 ? cur - arr[index - 1] : cur),
      [],
    );
  }, [laps]);

  // display
  const displayTimeMs = useMemo(() => timeMs.toFixed(3), [timeMs]);

  return (
    <View style={styles.stopWatchContainer}>
      <Text>{displayTimeMs}s</Text>
      <View style={styles.buttonContainer}>
        {isRunning ? (
          <Button title="Lap" onPress={() => setLaps([...laps, timeMs])} />
        ) : (
          <Button
            title="Reset"
            disabled={isRunning}
            onPress={() => {
              setLaps([]);
              setTimeMs(0);
            }}
          />
        )}
        {isRunning ? (
          <Button title="Stop" onPress={() => setIsRunning(false)} />
        ) : (
          <Button title="Start" onPress={() => setIsRunning(true)} />
        )}
      </View>
      <View>
        {laps.map((lap, index) => (
          <View key={index} style={styles.lapText}>
            <Text>{index + 1}</Text>
            <Text>{lap.toFixed(3)}</Text>
            <Text>{lapDiff[index].toFixed(3)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
