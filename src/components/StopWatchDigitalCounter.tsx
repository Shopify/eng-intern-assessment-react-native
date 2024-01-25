import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../styles";
import { formatTime } from "../utils/utils";

/**
 * Props for StopWatchDigitalCounter component.
 */
interface Props {
  time: number; // Time in milliseconds
}

/**
 * StopWatchDigitalCounter Component
 *
 * This component is responsible for displaying the stopwatch time in a digital format.
 * It uses the `formatTime` utility function to convert the time format.
 * The displayed time is updated whenever the `time` prop changes.
 *
 * @param {Props} props The props for the component.
 * @return {object} The style object.
 */
const StopWatchDigitalCounter: React.FC<Props> = ({ time }) => {
  // useMemo is used to optimize performance by reformatting time only when it changes.
  const formattedTime = useMemo(() => formatTime(time), [time]);

  return (
    <View style={styles.container}>
      {/* Display the formatted time */}
      <Text testID="counter" style={styles.counter}>
        {formattedTime}
      </Text>
    </View>
  );
};

/**
 * Styles for the StopWatchDigitalCounter component.
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  counter: {
    fontSize: 80,
    color: colors.white,
  },
});

export default StopWatchDigitalCounter;
