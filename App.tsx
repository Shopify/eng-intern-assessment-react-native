import { StyleSheet, View } from "react-native";
import StopWatch from "./src/components/StopWatch";

/*
 * Handles StopWatch functionality and rendering
 */
export default function App() {
  return (
    <View style={styles.container}>
      <StopWatch />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#19191C",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
});
