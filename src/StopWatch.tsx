/**
 * @author Marcin Koziel
 * @date 01/19/2024
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { StopWatchButton } from './StopWatchButton';
import { getStyles } from './styles/theme';
import { formatTime } from './utils/timeUtils';

// Constants
const formattedTimeInitialState = {
  formattedHours: '00',
  formattedMins: '00',
  formattedSecs: '00',
  formattedMilliseconds: '00',
};

// Styles
const styles = getStyles();

export default function StopWatch(
  initialProps?: {
    isActive?: boolean;
    millisecondsElapsedTotal?: number;
    millisecondsElapsedCurrentLap?: number;
    lapTimes?: Lap[];
    formatTimeMultiplier?: number;
  },
) {
  const [isActive, setIsActive] = useState(initialProps && initialProps.isActive || false);
  const [lapList, setLapList] = useState<Lap[]>(initialProps && initialProps.lapTimes || []);
  const [millisecondsElapsedTotal, setMillisecondsElapsedTotal] = useState(initialProps && initialProps.millisecondsElapsedTotal || 0);
  const [millisecondsElapsedCurrentLap, setMillisecondsElapsedCurrentLap] = useState(initialProps && initialProps.millisecondsElapsedCurrentLap || 0);
  const [{ formattedHours, formattedMins, formattedSecs, formattedMilliseconds }, setFormattedTime] = useState<FormattedTime>(formattedTimeInitialState);
  const [startPauseButtonText, setStartPauseButtonText] = useState('Start');
  const [lapResetButtonText, setLapResetButtonText] = useState('Lap');
  const [bestTime, setBestTime] = useState<number>(Number.POSITIVE_INFINITY);
  const [worstTime, setWorstTime] = useState<number>(Number.NEGATIVE_INFINITY);
  const scrollViewRef = useRef<ScrollView>(null);

  // Helper function to scroll to the bottom of the lap list when a new lap is created
  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  // Create a new lap and scroll to the bottom of the lap list
  const createLap = () => {
    const nextLapNumber = lapList.length + 1;
    setLapList([...lapList, {
      lapNumber: nextLapNumber,
      lapTime: formatTime(millisecondsElapsedCurrentLap, initialProps && initialProps.formatTimeMultiplier || 1),
      millisecondsElapsedCurrentLap,
    }]);
    setMillisecondsElapsedCurrentLap(0);
    scrollToBottom();
  };

  // Reset the stopwatch and lap list to their initial states
  const resetStopwatch = () => {
    setIsActive(false);
    setMillisecondsElapsedTotal(0);
    setMillisecondsElapsedCurrentLap(0);
    setLapList([]);
    setBestTime(Number.POSITIVE_INFINITY);
    setWorstTime(Number.NEGATIVE_INFINITY);
  };

  // Update best and worst times
  const updateBestAndWorstTimes = () => {
    let newBestTime = bestTime;
    let newWorstTime = worstTime;

    lapList.forEach((lap) => {
      const currentLapTime: number = lap.millisecondsElapsedCurrentLap;
      if (currentLapTime < newBestTime) {
        newBestTime = currentLapTime;
      } else if (currentLapTime > newWorstTime) {
        newWorstTime = currentLapTime;
      }
    });

    setBestTime(newBestTime);
    setWorstTime(newWorstTime);
  };

  // Update button texts
  const updateButtonTexts = () => {
    setStartPauseButtonText(isActive ? 'Pause' : (millisecondsElapsedTotal === 0 ? 'Start' : 'Resume'));
    setLapResetButtonText(isActive ? 'Lap' : 'Reset');
  };

   // Start or stop the stopwatch
   const handleStartStop = () => {
    setIsActive(!isActive);
  };

  // Handle the creation of a lap or resetting the stopwatch
  const handleLapReset = () => {
    if (isActive) {
      createLap();
    } else {
      resetStopwatch();
    }
  };

  // Timer effect for the stopwatch
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setMillisecondsElapsedTotal((prev) => prev + 1);
        setMillisecondsElapsedCurrentLap((prev) => prev + 1);
      }, 1);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  // Effect for the stopwatch time display
  useEffect(() => {
    if (millisecondsElapsedTotal % 10 === 0) {
      setFormattedTime(formatTime(millisecondsElapsedTotal, initialProps && initialProps.formatTimeMultiplier || 1));
    }
  } , [millisecondsElapsedTotal]);

  // Effect for best and worst times and button texts
  useEffect(() => {
    updateBestAndWorstTimes();
    updateButtonTexts();
  }, [isActive, lapList]);

  const formattedLapTimes = useMemo(() => {
    return lapList.map((lap) => {
      const isBestTime = lap.millisecondsElapsedCurrentLap === bestTime;
      const isWorstTime = lap.millisecondsElapsedCurrentLap === worstTime;
  
      let lapTextStyle = styles.lapText;
      let lapTimeStyle = styles.lapTime;
  
      if (isWorstTime) {
        lapTextStyle = { ...lapTextStyle, ...styles.worstLap };
        lapTimeStyle = { ...lapTimeStyle, ...styles.worstLap };
      } else if (isBestTime) {
        lapTextStyle = { ...lapTextStyle, ...styles.bestLap };
        lapTimeStyle = { ...lapTimeStyle, ...styles.bestLap };
      }
  
      return {
        ...lap,
        lapStyle: lapTextStyle,
        lapTimeStyle: lapTimeStyle,
      };
    });
  }, [lapList, bestTime, worstTime]);

  return (
    <View style={styles.container}>
      <View style={styles.timeDisplayContainer}>
        <View style={styles.timeSegment}>
          <Text style={styles.timeLabel}>hr.</Text>
          <Text style={styles.smallTimeDisplay} testID='hr-display'>{formattedHours}</Text>
        </View>
        <View style={styles.timeSegment}>
          <Text style={styles.timeLabel}>min.</Text>
          <Text style={styles.timeDisplay} testID='min-display'>{formattedMins}</Text>
        </View>
        <Text style={styles.timeColon}>:</Text>
        <View style={styles.timeSegment}>
          <Text style={styles.timeLabel}>sec.</Text>
          <Text style={styles.timeDisplay} testID='sec-display'>{formattedSecs}</Text>
        </View>
        <View style={styles.timeSegment}>
          <Text style={styles.timeLabel}>1/10s.</Text>
          <Text style={styles.smallTimeDisplay} testID='ms-display'>{formattedMilliseconds}</Text>
        </View>
      </View>
      <ScrollView 
        ref={scrollViewRef} 
        style={styles.lapsContainer} 
        contentContainerStyle={styles.scrollContentContainer}
        testID='lap-list'
      >
        {formattedLapTimes.map((lap) => (
          <View key={lap.lapNumber} style={styles.lap} testID={`lap-${lap.lapNumber}`}>
            <Text style={lap.lapStyle}>
              Lap {lap.lapNumber}
            </Text>
            <Text style={lap.lapTimeStyle}>
              {lap.lapTime.formattedHours}:{lap.lapTime.formattedMins}:{lap.lapTime.formattedSecs}.{lap.lapTime.formattedMilliseconds}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <StopWatchButton
          text={startPauseButtonText}
          onPress={handleStartStop}
        />
        <StopWatchButton
          text={lapResetButtonText}
          onPress={handleLapReset}
        />
      </View>
    </View>
  );
}