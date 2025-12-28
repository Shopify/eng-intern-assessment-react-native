import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StopWatch from "./src/StopWatch";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "./constants/colors";

export default function App() {
  return (
    <View style={styles.container}>
                  <LinearGradient
        colors={[COLORS.appBackground1, COLORS.appBackground2]}
        style={styles.background}
      />
      <StopWatch />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    width: "100%",
  },
});
