import { Text, View, StyleSheet } from "react-native";

interface FormatTimeProps {
  timeInMilliseconds: number;
  title: boolean;
}

const FormatTime: React.FC<FormatTimeProps> = ({
  timeInMilliseconds,
  title,
}) => {
  const minutes = Math.floor(timeInMilliseconds / 60000);
  const seconds = Math.floor((timeInMilliseconds % 60000) / 1000);
  const milliseconds = Math.floor((timeInMilliseconds % 1000) / 10);

  return (
    <View style={styles.formatTimeContainer} testID="timer">
      <Text
        style={[
          styles.individualTimer,
          { fontSize: title ? 35 : 15, width: title ? 50 : 20 },
        ]}
      >
        {minutes.toString().padStart(2, "0")}
      </Text>
      <Text style={[styles.individualTimer, { fontSize: title ? 35 : 15 }]}>
        :
      </Text>
      <Text
        style={[
          styles.individualTimer,
          { fontSize: title ? 35 : 15, width: title ? 50 : 20 },
        ]}
      >
        {seconds.toString().padStart(2, "0")}
      </Text>
      <Text style={[styles.individualTimer, { fontSize: title ? 35 : 15 }]}>
        :
      </Text>
      <Text
        style={[
          styles.individualTimer,
          { fontSize: title ? 35 : 15, width: title ? 50 : 20 },
        ]}
      >
        {milliseconds.toString().padStart(2, "0")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  individualTimer: {
    fontWeight: "bold",
    textAlign: "center",
  },
  formatTimeContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 2,
  },
});

export default FormatTime;
