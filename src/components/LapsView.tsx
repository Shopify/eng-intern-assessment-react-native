import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import uuid from "react-native-uuid";
import { INITIAL_TIMER_STATE, TimerState, formatTime } from "../data/TimerState";

function timerText(timerInfo: TimerState) {
  if (timerInfo == INITIAL_TIMER_STATE) return;
  const timeStr = formatTime(timerInfo);
  return <Text style={styles.text}>{timeStr}</Text>;
}

type LapsViewProps = {
  timerInfo: TimerState;
  lapData: string[];
};

const LapsView = ({ timerInfo, lapData }: LapsViewProps) => {
  return (
    <ScrollView>
      {timerText(timerInfo)}
      {lapData.map((lap) => {
        return (
          <View key={uuid.v4().toString()} style={styles.fullWidth}>
            <View style={styles.divider} />
            <Text style={styles.text}>{lap}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    fontWeight: "bold",
    color: "black",
  },
  divider: {
    backgroundColor: "gray",
    marginVertical: 5,
    height: 2,
  },
  fullWidth: {
    width: "100%",
  },
});

export default LapsView;
