import { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";

// Define the props interface for the StopWatch component.
interface StopWatchButtonProps {
  onToggle: () => void;
  onReset: () => void;
  onLap: () => void;
  laps: string[];
  isActive: boolean;
}

export default function StopWatchButton({
  onToggle,
  onReset,
  onLap,
  laps,
  isActive,
}: StopWatchButtonProps) {
  const [maxIndex, setMaxIndex] = useState<number | null>(null);
  const [minIndex, setMinIndex] = useState<number | null>(null);

  useEffect(() => {
    setMaxIndex(findMaxDuration(laps));
    setMinIndex(findMinDuration(laps));
  }, [laps]);

  const findMaxDuration = (laps: string[]): number => {
    // Return index of the lap with the largest duration
    let maxTimeInSeconds = -1;
    let indexOfMaxTime = -1;

    for (let i = 0; i < laps.length; i++) {
      // Split time parts and calculate the time in seconds.
      const timeParts = laps[i].split(":");
      if (timeParts.length === 3) {
        const hours = parseInt(timeParts[0], 10);
        const minutes = parseInt(timeParts[1], 10);
        const seconds = parseInt(timeParts[2], 10);
        const totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;

        // Compare with exisiting highest seconds, replace and save index if its bigger.
        if (totalTimeInSeconds > maxTimeInSeconds) {
          maxTimeInSeconds = totalTimeInSeconds;
          indexOfMaxTime = i;
        }
      }
    }
    return indexOfMaxTime;
  };

  const findMinDuration = (laps: string[]): number => {
    // Return index of the lap with the largest duration
    let maxTimeInSeconds = Infinity;
    let indexOfMaxTime = -1;

    for (let i = 0; i < laps.length; i++) {
      // Split time parts and calculate the time in seconds.
      const timeParts = laps[i].split(":");
      if (timeParts.length === 3) {
        const hours = parseInt(timeParts[0], 10);
        const minutes = parseInt(timeParts[1], 10);
        const seconds = parseInt(timeParts[2], 10);
        const totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;

        // Compare with exisiting highest seconds, replace and save index if its bigger.
        if (totalTimeInSeconds < maxTimeInSeconds) {
          maxTimeInSeconds = totalTimeInSeconds;
          indexOfMaxTime = i;
        }
      }
    }

    return indexOfMaxTime;
  };

  const loadColor = (index: number): string => {
    if (index == maxIndex && index == minIndex) {
      return "whiteText";
    } else if (index == maxIndex) {
      return "redText";
    } else if (index == minIndex) {
      return "greenText";
    } else {
      return "whiteText";
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            isActive ? styles.redButton : styles.greenButton,
          ]}
          onPress={onToggle}
        >
          <Text
            style={[
              styles.buttonText,
              isActive ? styles.redText : styles.greenText,
            ]}
          >
            {isActive ? "Stop" : "Start"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={isActive ? onLap : onReset}
        >
          <Text style={styles.buttonText}>{isActive ? "Lap" : "Reset"}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.lapContainerContent}
        style={styles.lapContainer}
      >
        {laps.map(
          (
            lapTime,
            index // Maps laps onto View element.
          ) => (
            <View key={index} style={styles.lap}>
              <Text
                style={[
                  loadColor(index) == "redText"
                    ? styles.redText
                    : (loadColor(index) == "greenText"
                    ? styles.greenText
                    : (styles.whiteText)),
                  styles.lapText,
                ]}
              >
                {"Lap " + (laps.length - index)}
              </Text>
              <Text
                style={[
                  loadColor(index) == "redText"
                    ? styles.redText
                    : (loadColor(index) == "greenText"
                    ? styles.greenText
                    : (styles.whiteText)),
                  styles.lapText,
                ]}
              >
                {lapTime}
              </Text>
            </View>
          )
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "black",
  },
  buttonContainer: {
    height: "25%",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    flexDirection: "row",
    backgroundColor: "black",
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(64, 64, 64, 0.7)",
  },
  button: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
    backgroundColor: "#1b1b1b",
  },
  buttonText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  lapContainer: {
    width: "100%",
    paddingBottom: 50,
  },
  lapContainerContent: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  lap: {
    backgroundColor: "black",
    flex: 1,
    marginTop: 8,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(64, 64, 64, 0.7)",
    width: "90%",
  },
  lapText: {
    fontSize: 22,
  },
  greenButton: {
    backgroundColor: "#0a2a12",
  },
  greenText: {
    color: "#30d158",
  },
  redButton: {
    backgroundColor: "#330e0c",
  },
  redText: {
    color: "#ff453a",
  },
  whiteText: {
    color: "white",
  },
});
