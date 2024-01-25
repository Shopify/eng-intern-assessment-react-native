import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import StopWatchButton from "./StopWatchButton";
import StopWatchDigitalCounter from "./StopWatchDigitalCounter";
import StopWatchLaps from "./StopWatchLaps";
import { colors } from "./styles";

export default function StopWatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isRunning) {
      interval = setInterval(() => {
        setTimeElapsed((oldTime) => oldTime + 10);
      }, 10);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeElapsed(0);
    setLaps([]);
  };

  const handleLap = () => {
    setLaps((prevLaps) => [...prevLaps, timeElapsed]);
  };

  const lapDurations = laps.map((lap, index) =>
    index === 0 ? lap : lap - laps[index - 1]
  );

  const maxLapDuration = Math.max(...lapDurations, 0);
  const minLapDuration =
    lapDurations.length > 0
      ? Math.min(...lapDurations.filter((lap) => lap > 0))
      : 0;
  const maxLapIndex = lapDurations.findIndex((lap) => lap === maxLapDuration);
  const minLapIndex =
    minLapDuration > 0
      ? lapDurations.findIndex((lap) => lap === minLapDuration)
      : null;

  return (
    <View style={styles.container}>
      <StopWatchDigitalCounter time={timeElapsed} />
      <StopWatchButton
        onStartStop={handleStartStop}
        onReset={handleReset}
        onLap={handleLap}
        isRunning={isRunning}
      />
      <StopWatchLaps
        laps={lapDurations}
        maxLapIndex={maxLapIndex}
        minLapIndex={minLapIndex}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
