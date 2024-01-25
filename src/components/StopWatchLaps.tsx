import React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import { colors, fonts } from "../styles";
import { formatTime } from "../utils/utils";

/**
 * Props for the StopWatchLaps component.
 */
interface Props {
  laps: number[]; // Array of lap times in milliseconds
  maxLapIndex: number | null; // Index of the longest lap
  minLapIndex: number | null; // Index of the shortest lap
}

/**
 * StopWatchLaps Component
 *
 * This component displays a list of laps recorded by the stopwatch. Each lap's
 * duration is formatted and displayed. Laps are highlighted if they are the
 * longest or shortest lap.
 *
 * @param {Props} props The props for the component.
 */
const StopWatchLaps: React.FC<Props> = ({ laps, maxLapIndex, minLapIndex }) => {
  /**
   * Determines the style for each lap based on whether it's the longest or shortest.
   *
   * @param {number} index The index of the current lap.
   * @return {object} The style object.
   */
  const getLapStyle = (index: number) => {
    if (index === maxLapIndex) {
      return styles.maxLap;
    } else if (index === minLapIndex) {
      return styles.minLap;
    } else {
      return styles.whiteText;
    }
  };

  // Do not render anything if there are no laps.
  if (!laps || laps.length === 0) {
    return null;
  }

  return (
    <ScrollView
      testID="lap-list"
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {laps
        .slice()
        .reverse()
        .map((lap, index) => (
          <View key={laps.length - index - 1} style={styles.lap}>
            {/* Lap Number */}
            <Text
              style={[styles.lapText, getLapStyle(laps.length - index - 1)]}
            >
              Lap {laps.length - index}
            </Text>
            {/* Lap Time */}
            <Text
              style={[styles.lapText, getLapStyle(laps.length - index - 1)]}
            >
              {formatTime(lap)}
            </Text>
          </View>
        ))}
    </ScrollView>
  );
};

/**
 * Styles for the StopWatchLaps component.
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    width: "100%",
  },
  contentContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  lap: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
  },
  lapText: {
    fontSize: 20,
  },
  maxLap: {
    color: colors.lightRed,
  },
  minLap: {
    color: colors.lightGreen,
  },
  whiteText: {
    color: colors.white,
  },
});

export default StopWatchLaps;
