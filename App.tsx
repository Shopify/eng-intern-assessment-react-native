import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, SafeAreaView } from "react-native";
import Stopwatch from "./src/StopWatch";

export default function App() {
  return (
    <SafeAreaView>
      <View style={styles.appContainer}>
        <StatusBar style="auto" />
        <Stopwatch />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    marginHorizontal: 24,
  },
});
