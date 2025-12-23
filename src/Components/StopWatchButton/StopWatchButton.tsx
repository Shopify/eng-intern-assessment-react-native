import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

interface StopWatchButtonProps {
  title: string;
  onPress: () => void;
  colour: string;
}

/**
 * Reusable button component for the stopwatch
 * @param props - StopWatchButtonProps which has a title, onPress function, and colour
 * @returns A button component
 */
const StopWatchButton = (props: StopWatchButtonProps) => {
  const { title, onPress, colour } = props;

  return (
    <View>
      <TouchableHighlight onPress={onPress}>
        <View style={[styles.button, { backgroundColor: colour }]}>
          <Text style={styles.buttonText}>{title}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 80,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "500",
  },
});

export default StopWatchButton;
