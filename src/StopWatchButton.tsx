import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useState} from "react";

export default function StopWatchButton(props: any) {

  const [running, setRunning] = useState(false);

  const start = () => {
    setRunning(true);
    props.onStart();
  }

  const stop = () => {
    setRunning(false);
    props.onStop();
  }

  const reset = () => {
    setRunning(false);
    props.onReset();
  }

  return (
    <View style={styles.container}>

      {
        /*
        * Render button sets depending on timer state. If the timer is running then we can render
        * the stop and lap button.
        * If the timer is off then we render start and reset buttons.
        *  */
        !running ?
        <>
          <Pressable onPress={() => start()} style={styles.startButton}>
            <Text style={styles.text}>Start</Text>
          </Pressable>

          <Pressable onPress={() => reset()} style={styles.resetButton}>
            <Text style={styles.text}>Reset</Text>
          </Pressable>
        </>
            :
            <>
              <Pressable onPress={() => stop()} style={styles.stopButton}>
                <Text style={styles.text}>Stop</Text>
              </Pressable>

              <Pressable onPress={() => props.onLap()} style={styles.lapButton}>
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
  },
  stopButton: {
    backgroundColor: "red",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 20
  },
});