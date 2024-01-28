import { Text, View } from "react-native";

interface LapRecordProps {
  laps: number[];
  formatTime: (time: number) => string;
}

const LapRecord = ({ laps, formatTime }: LapRecordProps) => {
  return (
    <View>
      {laps.map((lap, index) => (
        <Text key={index}>
          Lap {index + 1}: {formatTime(lap)}
        </Text>
      ))}
    </View>
  );
};

export default LapRecord;
