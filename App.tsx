import { StyleSheet, View } from "react-native";
import StopWatch from "./src/components/StopWatch";
import { useRef, useState } from "react";

/*
 * Handles StopWatch functionality and rendering
 */
export default function App() {
  // Declare state variables
  const [time, setTime] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);
  const stopwatchRef = useRef<number | null>(null);

  // Clear the previously set interval, if not null
  const clearPrevInterval = () => {
    if (stopwatchRef.current) {
      clearInterval(stopwatchRef.current);
    }
  };

  // Start Button for StopWatch functionality
  const handleStart = () => {
    if (!isActive) {
      setIsActive(true);
      // Initiate interval that updates the elapsed StopWatch time every second
      stopwatchRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1000);
      }, 1000);
    }
  };

  // Pause Button for StopWatch functionality
  const handlePause = () => {
    if (isActive && stopwatchRef.current) {
      setIsActive(false);
      clearPrevInterval();
    }
  };

  // Reset Button for StopWatch functionality
  const handleReset = () => {
    setTime(0);
    setIsActive(false);
    setLaps([]);
    clearPrevInterval();
  };

  // Lap Button for StopWatch functionality
  const handleLap = () => {
    if (laps.length > 0) {
      const previousLapTime = laps[laps.length - 1];
      const lapDuration = time - previousLapTime;
      setLaps((prev) => [...prev, lapDuration]);
    } else {
      setLaps([time]);
    }
  };

  return (
    <View style={styles.container}>
      <StopWatch
        time={time}
        isActive={isActive}
        laps={laps}
        onStart={handleStart}
        onPause={handlePause}
        onReset={handleReset}
        onLap={handleLap}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#19191C",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
});
