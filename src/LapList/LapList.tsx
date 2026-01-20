import { ScrollView, StyleSheet } from "react-native";
import LapItem from "./LapItem";

interface LapListProps {
  laps: number[];
}

const LapList: React.FC<LapListProps> = ({ laps }) => {
  if (laps.length === 0) {
    return null;
  }

  return (
    <ScrollView testID="lap-list" style={styles.lapList}>
      {laps.map((lap, index) => (
        <LapItem
          id={laps.length - index}
          duration={index + 1 < laps.length ? lap - laps[index + 1] : lap}
          key={laps.length - index}
        />
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  lapList: {
    height: "100%",
    width: "100%",
  },
});

export default LapList;
