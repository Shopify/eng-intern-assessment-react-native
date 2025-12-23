import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { formatTime } from "../../utils/TimeUtils";

interface LapsListInterface {
  laps: number[];
}

/**
 * Component which displays all saved laps
 * @param props - LapsListInterface which only has a list of laps (each in miliseconds)
 * @returns Component for a list of laps
 */
const LapsList = (props: LapsListInterface) => {
  const { laps } = props;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.containerItems}
      testID="lap-list"
    >
      {laps.map((lap, index) => {
        return (
          <View
            key={index + 1}
            style={styles.lapItem}
            testID={`saved-lap-${index + 1}`}
          >
            <Text style={styles.lapTitle}>Lap {index + 1}</Text>
            <Text>{formatTime(lap)}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "50%",
    display: "flex",
    marginBottom: 50,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#bcb8b1",
  },
  containerItems: {
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    paddingVertical: 20,
    gap: 10,
  },
  lapItem: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,
    gap: 15,
    borderRadius: 8,
    backgroundColor: "white",
  },
  lapTitle: {
    fontWeight: "bold",
  },
});

export default LapsList;
