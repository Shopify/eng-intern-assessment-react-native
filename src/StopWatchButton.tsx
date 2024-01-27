import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

type ButtonProps = {
  status: number;
  start: () => void;
  pause: () => void;
  reset: () => void;
  resume: () => void;
  recordLaps: () => void;
  laps: string[];
};


/**
 * Handle the logic of different button
 * Handle the logic of the list of laps within the ScrollView
 */

export default function StopWatchButton({
  status,
  start,
  pause,
  reset,
  resume,
  recordLaps,
  laps,
}: ButtonProps) {
  const renderButton = (
    label: string,
    onPress: () => void,
    style: object[] = []
  ) => (
    <TouchableOpacity onPress={onPress} style={[styles.button, ...style]}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );


  return (
    <View style={styles.container}>
      {status === 0 && (
        <View style={styles.button}>
          {renderButton("Start", start, [{ backgroundColor: "green" }])}
        </View>
      )}

      {status === 1 && (
        <View style={styles.button}>
          {renderButton("Stop", pause, [{ backgroundColor: "red" }])}
          {renderButton("Reset", reset, [{ backgroundColor: "orange" }])}
          {renderButton("Laps", recordLaps, [{ backgroundColor: "white" }])}
        </View>
      )}

      {status === 2 && (
        <View style={styles.button}>
          {renderButton("Resume", resume, [{ backgroundColor: "green" }])}
          {renderButton("Reset", reset, [{ backgroundColor: "orange" }])}
          {renderButton("Laps", recordLaps, [{ backgroundColor: "white" }])}
        </View>
      )}

      {laps.length > 0 && (
        <ScrollView  
                    testID='lap-list'  
                    style={styles.scrollView} 
                    contentContainerStyle={styles.contentContainer}>
          {laps.map((lap, index) => (
              <Text testID='lap-text' key={index} style={styles.lapText}>
                {`Lap ${index + 1} : ${lap}`}
              </Text>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    marginTop:10,
    padding: 20,
    borderRadius: 20,
    gap: 15,
  },
  text: {
    fontSize: 16,
    fontWeight: "500"
  },
  scrollView: {
    height: 150,
    width: 280,
    alignSelf: 'center',
    padding: 20, 
  },
  contentContainer: {
    alignItems: 'center',
  },
  lapText: {
    flexDirection: "row",
    textAlign:  'left',
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  lapsTime:{
    flexDirection: "row",
    textAlign:  'right',
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  }


});
