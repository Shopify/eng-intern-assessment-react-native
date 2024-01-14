import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { formatTime } from "./utils";

type LapTableProps = {
  laps: number[];
};

/*
 * Displays a scrollable table of lap times: lap number and duration
 */
const LapTable = ({ laps }: LapTableProps) => {
  return (
    // Fixed header row and scrollable table of laps
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.cell}>
          <Text style={styles.headerText}>Lap</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.headerText}>Duration</Text>
        </View>
      </View>
      <ScrollView testID='lap-list'>
        {laps.map((lap, index) => (
          <View key={index} style={styles.row}>
            <View style={styles.cell}>
              <Text style={styles.cellText}>{index + 1}</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.cellText}>{formatTime(lap)}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    maxHeight: 350,
    backgroundColor: "rgba(64, 64, 64, 0.3)",
    borderRadius: 10,
    marginHorizontal: 30,
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomColor: "rgba(255, 255, 255, 0.5)",
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
  cellText: {
    fontSize: 16,
    color: "white",
  },
});

export default LapTable;
