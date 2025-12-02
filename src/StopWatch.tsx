import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function StopWatch() {

  // formatting for timer 00:00.00
  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / (60 * 1000));
    const seconds = Math.floor((milliseconds % (60 * 1000)) / 1000);
    const ms = Math.floor((milliseconds % 1000) / 10);

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(ms).padStart(2, '0')}`;
  };

  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [timer, setTimer] = useState(0);
  const [time, setTime] = useState(formatTime(timer));
  const [laps, setLaps] = useState<string[]>([]);
  const [buttonName, setButtonName] = useState('START');
  const timerRef = useRef(timer);

  // for styling
  const scrollViewRef = useRef();
  const handleContentSizeChange = (contentWidth?: number, contentHeight?: number) => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };


  const startTimer = () => {
    if (intervalId === null) {
      const interval = setInterval(handleTimer, 10); 
      setIntervalId(interval);
      setButtonName('LAP');
    } else {
      setLaps(oldLapTimes => [...oldLapTimes, formatTime(timerRef.current)]);
    }
  };

  const handleTimer = () => {
    timerRef.current += 10; 
    setTime(formatTime(timerRef.current));
  };

  const stopTimer = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      setIntervalId(null);
      setButtonName('START');
    }
  };

  const resetTimer = () => {
    stopTimer();
    timerRef.current = 0;
    setTime(formatTime(timerRef.current));
    setLaps([]);
  };

  return (
    <View>
      <View style={styles.timerFace}>
        <Text style={styles.timerText}>{time}</Text>
      </View>

      <View style={styles.buttonContainer}>
      <View style={styles.startButton}><Button title='' onPress={startTimer} /></View>
      <View style={styles.stopButton}><Button title='' onPress={stopTimer} /></View>
      <View style={styles.resetButton}><Button title='' onPress={resetTimer} /></View>
        
        <View style={styles.lapBar}>
          <ScrollView ref={scrollViewRef} onContentSizeChange={handleContentSizeChange}>
            {laps.map((lap, index) => (
                <Text style={styles.lapText}key={index}>{lap}</Text>
              ))}
          </ScrollView>
        </View>

      </View>

      <View style={styles.cross}>
          <View style={styles.crossUp} />
          <View style={styles.crossFlat} />
        </View>

        <Text style={styles.label}>SMO</Text>
      
  </View>

  
);
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00B09F',
    alignItems: 'center',
    justifyContent: 'center',
  },

  timerText: {
    fontSize: 60,
  },

  timerFace: {
    width: screenWidth / 1.2,
    height: screenHeight / 3,
    backgroundColor: '#AFE0C9',
    position: 'relative',
    borderBlockStyle: 'solid black',
    borderWidth: 6,
    borderRadius: 25,
    overflow: 'scroll',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonContainer:{
    top:'18%',
    left: 40,
  },

  startButton: {
    width: 50, 
    height: 50,
    backgroundColor: '#43C251',
    borderRadius: 25, 
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'black',
    left: '65%',
  },

  stopButton: {
    width: 80, 
    height: 80,
    backgroundColor: '#FF1A3C',
    borderRadius: 40, 
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'black',
    left: '45%',
  },

  resetButton: {
    width: 30,
    height: 30,
    backgroundColor: "#00C4E3",
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'black',
    left: '45%',
    bottom: '55%'
  },

  lapBar: {
    width: 130, 
    height: 80,
    backgroundColor: '#005435',
    borderRadius: 20, 
    justifyContent: 'center',
    alignItems:'center',
    overflow: 'scroll',
    borderWidth: 3,
    borderColor: 'black',
    right: '8%',
    bottom: '95%',
  },

  lapText:{
    fontSize: 20,
    width: 100,
    fontStyle: 'italic',
    textAlign: "center",
  },

  cross: {
    width: 0,
    height: 0,
    bottom:'18%',
    left: 60,
  },
  crossUp: {
    backgroundColor: "yellow",
    height: 100,
    width: 40,
    borderWidth: 3,
    borderColor: 'black',
  },
  crossFlat: {
    backgroundColor: "yellow",
    height: 40,
    width: 100,
    position: "absolute",
    left: -30,
    top: 30,
    borderWidth: 3,
    borderColor: 'black',
  },

  label: {
    height:'auto',
    width: 'auto',
    textAlign: 'center',
    fontSize: 50,
    fontWeight: '900',
    marginTop: 40,
    marginBottom: -30,
  },
  }

);
