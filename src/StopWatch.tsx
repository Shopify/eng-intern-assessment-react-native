import { useEffect, useMemo, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import StopWatchButton from "./StopWatchButton";
import { formatTime } from "./util/time";

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
    width: "100%",
  },
  lapText: {
    flexDirection: "row",
    gap: 10,
    alignSelf: "stretch",
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
  const displaytime = useMemo(() => formatTime(time), [time]);

  return (
    <View style={styles.stopWatchContainer}>
      {state !== "stopped" && (
        <Text style={styles.timeCounter}>{displaytime}</Text>
      )}
      <View style={styles.buttonContainer}>
        {state === "running" && (
          <StopWatchButton
            type="lap"
            onPress={() => setLaps([...laps, time])}
          />
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

        {state == "initial" ? (
          <StopWatchButton type="start" onPress={() => setState("running")} />
        ) : state == "running" ? (
          <StopWatchButton type="pause" onPress={() => setState("paused")} />
        ) : state == "paused" ? (
          <StopWatchButton type="resume" onPress={() => setState("running")} />
        ) : null}
      </View>
      {lapDiff.length === 0 ? null : (
        <View testID="lap-list" style={styles.lapList}>
          {lapDiff.map((time, index) => (
            <Text key={index} style={styles.cellRight}>
              {formatTime(time)}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}
