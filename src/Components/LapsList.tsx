import { ScrollView, StyleSheet, Text, View } from "react-native";
// Import utility function for time display
import { displayTime } from "../util/displayTime";

// Define TypeScript interface for LapsProps
interface LapsProps {
  laps: number[] | null; // Array of lap times or null
}

// Define TypeScript interface for LapsEntryProps
interface LapsEntryProps {
  time: number; // Time for each lap
  idx: number; // Index of the lap
}

// Functional component to display each lap entry
const LapsEntry = ({ time, idx }: LapsEntryProps) => {
  return (
    <View>
      {/* Display the lap number and time */}
      <Text style={styles.lapsEntry} key={idx}>{`Lap #${idx + 1}: ${displayTime(
        time
      )}`}</Text>
      {/* Separator line */}
      <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
    </View>
  );
};

// Functional component to display the list of laps
export const LapsList = ({ laps }: LapsProps) => {
  // Using ScrollView for the list of laps
  return (
    <View style={styles.lapsListContainer}>
      {/* Title for the laps section */}
      <Text style={styles.title}>Laps</Text>
      {/* Check if laps exist and render them */}
      {laps && (
        <ScrollView
          style={styles.lapsList}
          contentContainerStyle={styles.lapsListContent}
        >
          <View testID="lap-list">
            {/* Map through each lap and render a LapsEntry component */}
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
