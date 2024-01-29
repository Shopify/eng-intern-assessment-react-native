import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useRef, useState } from "react";
import StopWatchButton from "./StopWatchButton";
import LapRecord from "./LapRecord";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const StopWatch = () => {
  // Time in milliseconds
  const [time, setTime] = useState(0);

  // Boolean to check if timer is running
  const [isRunning, setIsRunning] = useState(false);

  // Array of lap records
  const [laps, setLaps] = useState<number[]>([]);

  // Reference to the counter
  const counterRef = useRef<number | null>(null);

  // Starts the timer
  const handleStartTime = () => {
    setIsRunning(true);
    counterRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 10);
    }, 10);
  };

  // Stops the timer
  const handleStopTimer = () => {
    clearInterval(counterRef.current as number);
    setIsRunning(false);
  };

  // Resets the timer to 00:00.00 and lap records
  const handleResetTimer = () => {
    setTime(0);
    setLaps([]);
  };

  // Records the current time when the lap button is pressed
  const handleLapTimer = () => {
    setLaps([...laps, time]);
  };

  // Format time to 00:00.00
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
  };

  return (
    <SafeAreaView>
      <View style={styles.timerSection}>
        <Text style={styles.timer}>{formatTime(time)}</Text>
        <View style={styles.buttonRow}>
          <StopWatchButton
            title={isRunning ? "Lap" : "Reset"}
            onPress={isRunning ? handleLapTimer : handleResetTimer}
          />
          <StopWatchButton
            title={isRunning ? "Stop" : "Start"}
            onPress={isRunning ? handleStopTimer : handleStartTime}
          />
        </View>
      </View>

      <View style={styles.lapRecord}>
        <LapRecord laps={laps} formatTime={formatTime} />
      </View>
    </SafeAreaView>
  );
};

export default StopWatch;

const styles = StyleSheet.create({
  timer: {
    fontSize: 70,
    textAlign: "center",
    marginTop: screenHeight * 0.2,
    fontFamily: "Menlo",
  },

  buttonRow: {
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: screenWidth * 0.9,
    padding: 10,
  },

  lapRecord: {
    flex: 1,
    marginBottom: 20,
  },
  timerSection: {
    justifyContent: "center",
  },
});
