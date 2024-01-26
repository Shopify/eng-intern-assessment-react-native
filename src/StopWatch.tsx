import { useEffect, useMemo, useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
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

type StopWatchStates = "initial" | "running" | "stopped" | "paused";

export default function StopWatch() {
  // counting funcionality
  const [time, setTime] = useState(0);
  const lastTime = useRef<number | null>(null);

  const frameId = useRef<number | null>(null);

  // start/pause/stop funcitonality
  const [state, setState] = useState<StopWatchStates>("initial");

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
      if (state == "running") {
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
  }, [state]);

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
      {state !== "stopped" && (
        <Text style={styles.timeCounter}>{displaytime}</Text>
      )}
      <View style={styles.buttonContainer}>
        {state === "running" && (
          <>
            <StopWatchButton
              type="lap"
              onPress={() => setLaps([...laps, time])}
            />
            <StopWatchButton type="pause" onPress={() => setState("paused")} />
          </>
        )}
        <StopWatchButton
          type="reset"
          onPress={() => {
            setState("initial");
            setLaps([]);
            setTime(0);
          }}
        />
        {state == "paused" ||
          (state == "running" && (
            <StopWatchButton type="stop" onPress={() => setState("stopped")} />
          ))}
        {state == "initial" && (
          <StopWatchButton type="start" onPress={() => setState("running")} />
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
