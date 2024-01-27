import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useState} from "react";

export default function StopWatchButton(props: any) {

  const [running, setRunning] = useState(false);

  return (
    <View style={styles.container}>

      {
        !running ?
        <>
          <Pressable onPress={() => setRunning(true)} style={styles.startButton}>
            <Text style={styles.text}>Start</Text>
          </Pressable>

          <Pressable style={styles.resetButton}>
            <Text style={styles.text}>Reset</Text>
          </Pressable>
        </>
            :
            <>
              <Pressable style={styles.startButton}>
                <Text style={styles.text}>Stop</Text>
              </Pressable>

              <Pressable style={styles.lapButton}>
                <Text style={styles.text}>Lap</Text>
              </Pressable>
            </>
      }


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto"
  },
  startButton: {
    backgroundColor: "green",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 20
  },
  text: {
    fontSize: 20,
    color: "white",
  },
  lapButton: {
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 20,
    marginLeft: "auto"
  },

  resetButton: {
    backgroundColor: "red",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 20,
    marginLeft: "auto"
  }
});