import { useState } from "react";
import { View, StyleSheet } from "react-native";
import StopWatchButton from "./StopWatchButton";
import FormatTime from "./FormatTime";
import LapList from "./LapList/LapList";

const StopWatch: React.FC = () => {
  const [initialTime, setInitialTime] = useState<number>(0);
  const [finalTime, setFinalTime] = useState<number>(0);
  const [laps, setLaps] = useState<number[]>([]);

  const timer = finalTime - initialTime;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.timer}>
        <FormatTime timeInMilliseconds={timer} title={true} />
      </View>

      <View style={styles.lapView}>
        <LapList laps={laps} />
      </View>

      <StopWatchButton
        initialTime={initialTime}
        setInitialTime={setInitialTime}
        finalTime={finalTime}
        setFinalTime={setFinalTime}
        laps={laps}
        setLaps={setLaps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  lapView: {
    width: "90%",
    height: 400,
    marginTop: 30,
    marginBottom: 50,
    alignItems: "center",
  },
  mainContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    marginTop: "25%",
  },
  timer: {
    marginTop: 10,
    marginBottom: 30,
    width: 200,
    height: 40,
    alignItems: "center",
  },
});

export default StopWatch;
