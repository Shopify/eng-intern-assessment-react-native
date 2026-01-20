import { Text, View, StyleSheet } from "react-native";
import FormatTime from "../FormatTime";

interface LapProps {
  id: number;
  duration: number;
}

const LapItem: React.FC<LapProps> = ({ id, duration }) => {
  return (
    <View style={styles.lapItem}>
      <Text style={styles.lapId}>Lap {id}</Text>
      <View style={styles.lapTime}>
        <FormatTime timeInMilliseconds={duration} title={false} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lapItem: {
    flexDirection: "row",
    justifyContent: "center",
    width: "90%",
    height: 30,
    alignSelf: "center",
  },
  lapId: {
    width: "50%",
    fontWeight: "bold",
  },
  lapTime: {
    width: "20%",
  },
});

export default LapItem;
