import { StyleSheet, Text, View } from "react-native";
import { convertMillisToClockTimeString } from "../util/TimeConverter";

export default function StopWatchLap(props: Readonly<StopWatchLapProps>) {
  return (
    <View style={styles.stopWatchLapContainer} testID="lap-list">
      {props.allLaps.map((lap, i) => (
        <View style={styles.lapContainer} key={i}>
          <Text style={styles.lapTimerText}>{`Lap ${
            props.allLaps.length - i
          }`}</Text>
          <Text style={styles.lapTimerText}>
            {convertMillisToClockTimeString(lap)}
          </Text>
        </View>
      ))}
    </View>
  );
}

/*
 * props for stopwatch laps
 */
type StopWatchLapProps = {
  allLaps: number[];
};

const styles = StyleSheet.create({
  stopWatchLapContainer: {
    flex: 3,
    width: "90%",
    overflow: "scroll",
    borderTopWidth: 1,
    borderColor: "#e5e5e5",
  },
  latestLapText: {
    color: "#fca311",
  },
  lapTimerText: {
    color: "#ffffff",
  },
  lapContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#e5e5e5",
  },
});
