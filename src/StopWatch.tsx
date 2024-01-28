import { Dimensions, StyleSheet, Text, View } from "react-native";
import StopWatchButton from "./StopWatchButton";
import { useRef, useState } from "react";

const screenWidth = Dimensions.get("window").width;

const StopWatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const counterRef = useRef<number | null>(null);

  const handleStartTime = () => {
    setIsRunning(true);
    counterRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 10);
    }, 10);
  };

  const handleStopTimer = () => {
    clearInterval(counterRef.current as number);
    setIsRunning(false);
  };

  const handleResetTimer = () => {
    setTime(0);
  };

  const handleLapTimer = () => {};

  // Format time to 00:00.00
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
  };

  return (
    <View>
      <Text style={styles.timer}>{formatTime(time)}</Text>
      <View style={styles.buttonRow}>
        <StopWatchButton
          title={isRunning ? "Lap" : "Reset"}
          onPress={isRunning ? handleLapTimer : handleResetTimer}
        ></StopWatchButton>
        <StopWatchButton
          title={isRunning ? "Stop" : "Start"}
          onPress={isRunning ? handleStopTimer : handleStartTime}
        ></StopWatchButton>
      </View>
    </View>
  );
};

export default StopWatch;

const styles = StyleSheet.create({
  timer: {
    fontSize: 80,
    textAlign: "center",
  },

  buttonRow: {
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: screenWidth * 0.9,
    padding: 10,
  },
});
