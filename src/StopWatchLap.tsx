import { ScrollView, StyleSheet, Text, View } from "react-native";
import { convertMillisToClockTimeString } from "../util/TimeConverter";

export default function StopWatchLap(props: Readonly<StopWatchLapProps>) {
  return (
    <ScrollView style={styles.stopWatchLapContainer}>
      <View style={styles.lapContainer}>
        <Text style={styles.latestLapText}>{`Lap ${
          props.allLaps.length + 1
        }`}</Text>
        <Text style={styles.lapTimerText}>
          {convertMillisToClockTimeString(props.latestLap)}
        </Text>
      </View>
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
    </ScrollView>
  );
}

type StopWatchLapProps = {
  latestLap: number;
  allLaps: number[];
};

const styles = StyleSheet.create({
  stopWatchLapContainer: {
    flex: 2,
    width: "100%",
    overflow: "scroll",
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
  },
});
