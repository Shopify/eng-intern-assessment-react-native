import { Text, View, StyleSheet, Dimensions } from "react-native";
import StopWatchButton from "./StopWatchButton";
import { formatTime } from "./utils";
import LapTable from "./LapTable";

type StopWatchProps = {
  time: number;
  isActive: boolean;
  laps: number[];
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onLap: () => void;
};

/*
 * Displays the elapsed time of the StopWatch
 */
const StopWatch = ({
  time,
  isActive,
  laps,
  onStart,
  onPause,
  onReset,
  onLap,
}: StopWatchProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>shopify stopwatch</Text>
      <Text style={styles.subtitle}>made by: vanessa hoang</Text>
      <Text style={styles.timer}>{formatTime(time)}</Text>
      <View style={styles.buttonContainer}>
        <StopWatchButton
          title="Reset"
          onPress={onReset}
          activeColour="#D8001F"
          disabled={!isActive && time === 0}
        />
        <StopWatchButton
          title={isActive ? "Pause" : "Start"}
          onPress={isActive ? onPause : onStart}
          activeColour={isActive ? "#007BFF" : "#7FB576"}
        />
        <StopWatchButton
          title="Lap"
          onPress={onLap}
          activeColour="#FFAB45"
          disabled={!isActive && time === 0}
        />
      </View>
      {laps.length > 0 && <LapTable laps={laps} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 80,
    color: "white",
    fontWeight: "600"
  },
  subtitle: {
    fontSize: 13,
    textAlign: "center",
    marginTop: 10,
    color: "white",
  },
  timer: {
    fontSize: 64,
    textAlign: "center",
    marginTop: 60,
    color: "white",
    fontStyle: "italic",
    fontWeight: "600",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 60,
    marginHorizontal: 10
  },
});

export default StopWatch;
