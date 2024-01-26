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
  const [time, setTime] = useState(0);
  const lastTime = useRef<number | null>(null);

  const frameId = useRef<number | null>(null);

  // start/stop funcitonality
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const tick = (time: number) => {
      const currentTime = time / 1000;

      // get current time on first walkthrough
      if (lastTime.current === null) {
        lastTime.current = currentTime;
        frameId.current = requestAnimationFrame(tick);
        return;
      }
      const diff = currentTime - lastTime.current;
      if (isRunning) {
        setTime((time) => time + diff);
      }

      lastTime.current = currentTime;

      // request next frame
      frameId.current = requestAnimationFrame(tick);
    };

    frameId.current = requestAnimationFrame(tick);
    return () => {
      // reset last time state
      lastTime.current = null;
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
  const displaytime = useMemo(() => {
    const format = (x: number) => String(x.toFixed(0)).padStart(2, "0");
    return `${format(time / 3600)}:${format((time / 60) % 60)}:${format(time % 60)}`;
  }, [time]);

  return (
    <View style={styles.stopWatchContainer}>
      <Text style={styles.timeCounter}>{displaytime}</Text>
      <View style={styles.buttonContainer}>
        {isRunning ? (
          <StopWatchButton
            type="lap"
            onPress={() => setLaps([...laps, time])}
          />
        ) : (
          <StopWatchButton
            type="reset"
            onPress={() => {
              setLaps([]);
              setTime(0);
            }}
          />
        )}
        {isRunning ? (
          <StopWatchButton type="stop" onPress={() => setIsRunning(false)} />
        ) : (
          <StopWatchButton type="start" onPress={() => setIsRunning(true)} />
        )}
      </View>
      {laps.length === 0 ? null : (
        <View testID="lap-list" style={styles.lapList}>
          <FlatList
            data={laps}
            style={styles.lapList}
            ListHeaderComponent={() => (
              <View style={styles.lapText}>
                <Text style={styles.cellLeft}>Round</Text>
                <Text style={styles.cellRight}>Time Recorded</Text>
                <Text style={styles.cellRight}>Duration</Text>
              </View>
            )}
            renderItem={({ item, index }) => (
              <View key={index} style={styles.lapText}>
                <Text style={styles.cellLeft}>Round {index + 1}</Text>
                <Text style={styles.cellRight}>{item.toFixed(3)}s</Text>
                <Text style={styles.cellRight}>
                  {lapDiff[index].toFixed(3)}s
                </Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}
