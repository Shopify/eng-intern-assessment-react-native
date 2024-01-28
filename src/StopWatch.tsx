import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import StopWatchButton from "./StopWatchButton";

const screenWidth = Dimensions.get("window").width;

const StopWatch = () => {
  return (
    <View>
      <Text style={styles.timer}>00:00.00</Text>
      <View style={styles.buttonRow}>
        <StopWatchButton title="Reset" onPress={() => {}}></StopWatchButton>
        <StopWatchButton title="Start" onPress={() => {}}></StopWatchButton>
      </View>
    </View>
  );
};

export default StopWatch;

const styles = StyleSheet.create({
  timer: {
    fontSize: 80,
    fontWeight: "normal",
    textAlign: "center",
  },

  buttonRow: {
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: screenWidth * 0.9,
    padding: 10,
  },
});
