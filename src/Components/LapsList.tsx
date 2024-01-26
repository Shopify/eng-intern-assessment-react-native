import { ScrollView, StyleSheet, Text, View } from "react-native";
import { displayTime } from "../util/displayTime";

interface LapsProps {
  laps: number[] | null;
}
interface LapsEntryProps {
  time: number;
  idx: number;
}
const LapsEntry = ({ time, idx }: LapsEntryProps) => {
  return (
    <View>
      <Text style={styles.lapsEntry} key={idx}>{`Lap #${idx + 1}: ${displayTime(
        time
      )}`}</Text>
      <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
    </View>
  );
};

export const LapsList = ({ laps }: LapsProps) => {
  // Using ScrollView instead of FlatList as it is easier to use and we don't need to worry about RAM issues in this case, as we are dealing with a stopwatch
  return (
    <View style={styles.lapsListContainer}>
      <Text style={styles.title}>Laps</Text>
      {laps && (
        <ScrollView
          style={styles.lapsList}
          contentContainerStyle={styles.lapsListContent}
        >
          <View testID="lap-list">
            {laps.map((time, idx) => (
              <LapsEntry time={time} idx={idx} key={idx} />
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  lapsListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lapsEntry: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontSize: 16,
    color: "#333",
    width: "100%",
  },
  lapsListContent: { paddingBottom: 50 },
  lapsList: {
    paddingHorizontal: 30,
    width: "100%",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
});
