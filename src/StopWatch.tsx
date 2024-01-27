import {StyleSheet, Text, View} from 'react-native';
import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  return (
      <>
        <View style={styles.container}>
          <Text style={styles.timer}>00:00:00</Text>
        </View>


        <StopWatchButton />
      </>
  );
}


const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: "20%"
  },
  timer: {
    fontWeight: "bold",
    fontSize: 50
  }
});