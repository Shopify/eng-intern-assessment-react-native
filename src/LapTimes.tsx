import { View, StyleSheet, Text, ScrollView } from "react-native";
import { formatTime } from "./util/formatTime";

// props for laptime
interface myButtonProps {
  lapTimes: number[]; //array of laptimes
}

const LapTimes: React.FC<myButtonProps> = ({ lapTimes }) => {
  return (
    <View style={styles.laps}>
      <ScrollView>
        {lapTimes.map((lapTime, index) => (
          <View style={styles.lapTime} key={index}>
            <Text style={{ fontSize: 20 }}>Lap {lapTimes.length - index}</Text>
            <Text style={{ fontSize: 20 }} key={index}>
              {formatTime(lapTime)}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  laps: {
    borderTopColor: "gray",
    borderTopWidth: 1,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginTop: 20,
    height: "40%",
    width: "90%",
  },
  lapTime: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 150,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
});

export default LapTimes;
