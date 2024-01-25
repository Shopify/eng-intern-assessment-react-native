import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, fonts } from "./styles";
import { formatTime } from "./utils/utils";

interface Props {
  time: number;
}

const StopWatchDigitalCounter: React.FC<Props> = ({ time }) => {
  const formattedTime = useMemo(() => formatTime(time), [time]);

  return (
    <View style={styles.container}>
      <Text testID="counter-text" style={styles.counter}>
        {formattedTime}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  counter: {
    fontSize: 80,
    color: colors.white,
    fontFamily: fonts.main,
  },
});

export default StopWatchDigitalCounter;
