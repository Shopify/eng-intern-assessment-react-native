import { useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import StopWatchButton from "./StopWatchButton";

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  stopWatchContainer: {
    alignItems: "center",
    gap: 10,
  },
  timeCounter: {
    fontSize: 50,
    fontWeight: "bold",
  },
  lapList: {
    height: 300,
    width: "100%",
  },
  lapText: {
    flexDirection: "row",
    gap: 10,
    alignSelf: "stretch",
  },
  cellLeft: {
    flexGrow: 1,
    fontSize: 20,
    textAlign: "left",
  },
  cellRight: {
    flexGrow: 1,
    fontSize: 20,
    textAlign: "right",
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
    const tick = (time: number) => {
      const currentTime = time / 1000;
      if (lastTimeMs === null) {
        setLastTimeMs(currentTime);
        return;
      }
      const diff = currentTime - lastTimeMs;
      if (isRunning) {
        setTimeMs(timeMs + diff);
      }

      setLastTimeMs(currentTime);

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
      <Text style={styles.timeCounter}>{displayTimeMs}s</Text>
      <View style={styles.buttonContainer}>
        {isRunning ? (
          <StopWatchButton
            type="lap"
            onPress={() => setLaps([...laps, timeMs])}
          />
        ) : (
          <StopWatchButton
            type="reset"
            onPress={() => {
              setLaps([]);
              setTimeMs(0);
            }}
          />
        )}
        {isRunning ? (
          <StopWatchButton type="stop" onPress={() => setIsRunning(false)} />
        ) : (
          <StopWatchButton type="start" onPress={() => setIsRunning(true)} />
        )}
      </View>
      <View style={styles.lapList}>
        <FlatList
          data={laps}
          style={styles.lapList}
          ListHeaderComponent={() => (
            <View style={styles.lapText}>
              <Text style={styles.cellLeft}>Round</Text>
              <Text style={styles.cellRight}>Time Recorded</Text>
              <Text style={styles.cellRight}>Difference</Text>
            </View>
          )}
          renderItem={({ item, index }) => (
            <View key={index} style={styles.lapText}>
              <Text style={styles.cellLeft}>Round {index + 1}</Text>
              <Text style={styles.cellRight}>{item.toFixed(3)}</Text>
              <Text style={styles.cellRight}>{lapDiff[index].toFixed(3)}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}
