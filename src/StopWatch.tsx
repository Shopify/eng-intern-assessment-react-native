import React, { useState, useRef, useCallback } from "react";
import { StyleSheet, SafeAreaView, Text, View, Platform, Button } from "react-native";
import Constants from "expo-constants";
import { displayTime } from "../components/util";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: Constants.statusBarHeight,
  },
  display: {
    flex: 3 / 5,
    justifyContent: "center",
    alignItems: "center",
  },
  displayText: {
    color: "#fff",
    fontSize: 70,
    fontWeight: "200",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "",
  },

  control: {
    height: 70,
    flexDirection: "row",
    justifyContent: "space-around",
  },

  results: {
    flex: 2 / 5,
  },

  stopWatchButtonBorder: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    borderRadius: 70,
  },
  stopWatchButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 65,
    height: 65,
    borderRadius: 65,
  },
  resultItem: {
    flexDirection : 'row',
    justifyContent: 'space-between',
    alignContent : 'center',
    alignItems: "center",
    borderBottomWidth : 1, 
    borderColor :'#313131',
    height: 50,
    paddingHorizontal: 15
  }
});

export default function Stopwatch() {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setRunning] = useState<boolean>(false);
  const [isPause, setPause] = useState<boolean>(false);
  const [results, setResults] = useState<number[]>([]); 
  const timerRef = useRef<NodeJS.Timeout>(); 


  const handleLapButton = () => {
    if (isRunning) {
      setResults([time, ...results]);
    }
  };

  const handleResetButton = () => {
    clearInterval(timerRef.current);
    setRunning(false);
    setPause(false);
    setResults([]);
    setTime(0);
  };

  const handlePauseButton = () => {
    clearInterval(timerRef.current);
    setPause(true);
  };

  const handleResumeButton = () => {
    if (isPause) {
      const interval = setInterval(() => {
        setTime((previousTime) => previousTime + 1);
      }, 10);
      setPause(false)
      timerRef.current = interval;
    } 
  };

  const handleStopButton = () => {
    clearInterval(timerRef.current);
    setPause(false);
    setRunning(false);
    setTime(-1);
  };

  const handleStartButton = () => {
    if (!isRunning) {
      const interval = setInterval(() => {
        setTime((previousTime) => previousTime + 1);
      }, 10);
      setRunning(true)
      timerRef.current = interval;
    } 
  };


  return (
    <View style={styles.container}>
        <View style={styles.display}>
          <Text style={{ color: "white", fontSize: 20 }}>{displayTime(time)}</Text>
        </View>
       <View style={styles.control}>
         <Button title="Start" onPress={handleStartButton} />
         <Button title="Pause" onPress={handlePauseButton} />
         <Button title="Resume" onPress={handleResumeButton} />
         <Button title="Stop" onPress={handleStopButton} />
         <Button title="Lap" onPress={handleLapButton} />
         <Button title="Reset" onPress={handleResetButton} />
         
       </View>
       <View id="lap-list" style={styles.results}>
          {/* <View style={styles.resultItem}> */}
            {results.map((item, index) => (          
                <View  key={index} style = {styles.resultItem}>
                    <Text style= {{ color : "#fff"}}>
                        {displayTime(item)}
                    </Text>
            </View>
            ))}
          {/* </View> */}
       </View>
    </View>
  );
}
