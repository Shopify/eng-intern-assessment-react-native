import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { formatTime } from "../../utils/TimeUtils";

interface LapsListInterface {
  laps: number[];
}

const LapsList = (props: LapsListInterface) => {
  const { laps } = props;

  return (
    <View style={styles.container}>
      <ScrollView testID="lap-list">
        {laps.map((lap, index) => {
          return (
            <Text key={index + 1} testID={`saved-lap-${index + 1}`}>{`Lap ${
              index + 1
            } - ${formatTime(lap)}`}</Text>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "50%",
  },
});

export default LapsList;
