import { ScrollView, Text, View, StyleSheet } from "react-native";

interface LapRecordProps {
  laps: number[];
  formatTime: (time: number) => string;
}

const LapRecord = ({ laps, formatTime }: LapRecordProps) => {
  const reversedLaps = [...laps].reverse();
  return (
    <ScrollView>
      {reversedLaps.map((lap, index) => (
        <View key={index}>
          <View style={styles.lap}>
            <Text style={styles.lapText}>
              Lap {reversedLaps.length - index}
            </Text>
            <Text style={styles.lapText}>{formatTime(lap)}</Text>
          </View>
          <View style={styles.divider} />
        </View>
      ))}
    </ScrollView>
  );
};

export default LapRecord;

const styles = StyleSheet.create({
  divider: {
    borderBottomColor: "lightgrey",
    borderBottomWidth: 0.5,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  lap: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  lapText: {
    fontSize: 16,
  },
});
