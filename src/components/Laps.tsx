import { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";

// Define the props interface for the Laps component.
interface LapsProps {
  laps: string[];
}

export default function Laps({ laps }: LapsProps) {
  const [maxIndex, setMaxIndex] = useState<number | null>(null);
  const [minIndex, setMinIndex] = useState<number | null>(null);

  useEffect(() => {
    setMaxIndex(findMaxDuration(laps));
    setMinIndex(findMinDuration(laps));
  }, [laps]);

  const findMaxDuration = (laps: string[]): number => {
    // Return if laps is undefined
    if (!laps) {
      return -1;
    }

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
    // Return if laps is undefined
    if (!laps) {
      return -1;
    }

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
    // Returns color of text based on its duration (highest/lowest/neither)
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
    <ScrollView
      contentContainerStyle={styles.lapContainerContent}
      style={styles.lapContainer}
      testID="lap-list"
    >
      {laps &&
        laps.map(
          (
            lapTime,
            index // Maps laps onto View element.
          ) => (
            <View key={index} style={styles.lap}>
              <Text
                style={[
                  // Condinitonally (nested statements) load color styles based on loadColor value
                  loadColor(index) == "redText"
                    ? styles.redText
                    : loadColor(index) == "greenText"
                    ? styles.greenText
                    : styles.whiteText,
                  styles.lapText,
                ]}
              >
                {"Lap " + (laps.length - index)}
              </Text>
              <Text
                style={[
                  // Condinitonally (nested statements) load color styles based on loadColor value
                  loadColor(index) == "redText"
                    ? styles.redText
                    : loadColor(index) == "greenText"
                    ? styles.greenText
                    : styles.whiteText,
                  styles.lapText,
                ]}
              >
                {lapTime}
              </Text>
            </View>
          )
        )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  /* Laps Styles */
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
  /* Text styles */
  greenText: {
    color: "#30d158",
  },
  redText: {
    color: "#ff453a",
  },
  whiteText: {
    color: "white",
  },
});
