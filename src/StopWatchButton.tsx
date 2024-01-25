import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface StopWatchButtonProps {
  initialTime: number;
  setInitialTime: React.Dispatch<React.SetStateAction<number>>;
  finalTime: number;
  setFinalTime: React.Dispatch<React.SetStateAction<number>>;
  laps: number[];
  setLaps: React.Dispatch<React.SetStateAction<number[]>>;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({
  initialTime,
  setInitialTime,
  finalTime,
  setFinalTime,
  laps,
  setLaps,
}) => {
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [intervalId, setIntervalId] = useState<number>(0);
  const [stoppedAt, setStoppedAt] = useState<number>(0);
  return (
    <View>
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            if (isFirst || stoppedAt > 0) {
              setIsFirst(false);
              const current = new Date().getTime();
              setInitialTime(current - stoppedAt);
              setFinalTime(current);
              clearInterval(intervalId);
              setIntervalId(
                setInterval(() => {
                  setFinalTime(new Date().getTime());
                }, 10)
              );
              setStoppedAt(0);
            }
          }}
        >
          <Text style={styles.boldText}>
            {stoppedAt > 0 ? "Resume" : "Start"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            clearInterval(intervalId);
            setStoppedAt(finalTime - initialTime);
          }}
        >
          <Text style={styles.boldText}>Stop</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            setLaps([finalTime - initialTime, ...laps]);
          }}
        >
          <Text style={styles.boldText}>Lap</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            clearInterval(intervalId);
            setInitialTime(0);
            setFinalTime(0);
            setStoppedAt(0);
            setIsFirst(true);
            setLaps([]);
          }}
        >
          <Text style={styles.boldText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonView: {
    width: 300,
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonStyle: {
    borderRadius: 50,
    borderWidth: 2,
    height: "100%",
    width: "23%",
    alignItems: "center",
    justifyContent: "center",
  },
  boldText: {
    fontWeight: "bold",
  },
});

export default StopWatchButton;
