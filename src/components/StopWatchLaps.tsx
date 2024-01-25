import React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import { colors, fonts } from "../styles";
import { formatTime } from "../utils/utils";

interface Props {
  laps: number[];
  maxLapIndex: number | null;
  minLapIndex: number | null;
}

const StopWatchLaps: React.FC<Props> = ({ laps, maxLapIndex, minLapIndex }) => {
  const getLapStyle = (index: number) => {
    if (index === maxLapIndex) {
      return styles.maxLap;
    } else if (index === minLapIndex) {
      return styles.minLap;
    } else {
      return styles.whiteText;
    }
  };

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
            <Text
              style={[styles.lapText, getLapStyle(laps.length - index - 1)]}
            >
              Lap {laps.length - index}
            </Text>
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
    fontFamily: fonts.main,
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
