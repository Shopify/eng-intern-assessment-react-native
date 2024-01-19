/**
 * @author Marcin Koziel
 * @date 01/19/2024
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { StopWatchButton } from './StopWatchButton';
import { getStyles } from './utils/theme';
import { formatTime } from './utils/timeUtils';

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
  const [lapTimes, setLapTimes] = useState<Lap[]>(initialProps && initialProps.lapTimes || []);
  const [millisecondsElapsedTotal, setMillisecondsElapsedTotal] = useState(initialProps && initialProps.millisecondsElapsedTotal || 0);
  const [millisecondsElapsedCurrentLap, setMillisecondsElapsedCurrentLap] = useState(initialProps && initialProps.millisecondsElapsedCurrentLap || 0);
  const [{ formattedHours, formattedMins, formattedSecs, formattedMilliseconds }, setFormattedTime] = useState<FormattedTime>({ formattedHours: '00', formattedMins: '00', formattedSecs: '00', formattedMilliseconds: '00' });
  const [startPauseButtonText, setStartPauseButtonText] = useState('Start');
  const [lapResetButtonText, setLapResetButtonText] = useState('Lap');
  const [bestTime, setBestTime] = useState<number>(Number.POSITIVE_INFINITY);
  const [worstTime, setWorstTime] = useState<number>(Number.NEGATIVE_INFINITY);
  const scrollViewRef = useRef<ScrollView>(null);

  // Helper function
  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
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

  // Create a new lap
  const createLap = () => {
    const nextLapNumber = lapTimes.length + 1;
    setLapTimes([...lapTimes, {
      lapNumber: nextLapNumber,
      lapTime: formatTime(millisecondsElapsedCurrentLap),
      millisecondsElapsedCurrentLap,
    }]);
    setMillisecondsElapsedCurrentLap(0);
    scrollToBottom();
  };

  // Reset the stopwatch
  const resetStopwatch = () => {
    setIsActive(false);
    setMillisecondsElapsedTotal(0);
    setMillisecondsElapsedCurrentLap(0);
    setLapTimes([]);
  };

  // Timer effect
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

  useEffect(() => {
    if (millisecondsElapsedTotal % 10 === 0) {
      setFormattedTime(formatTime(millisecondsElapsedTotal, initialProps && initialProps.formatTimeMultiplier || 1));
    }
  } , [millisecondsElapsedTotal]);

  // Effect for best and worst times and button texts
  useEffect(() => {
    updateBestAndWorstTimes();
    updateButtonTexts();
  }, [isActive, lapTimes]);

  // Update best and worst times
  const updateBestAndWorstTimes = () => {
    let newBestTime = bestTime;
    let newWorstTime = worstTime;

    lapTimes.forEach((lap) => {
      const currentLapTime: number = lap.millisecondsElapsedCurrentLap;
      if (currentLapTime < newBestTime) {
        newBestTime = currentLapTime;
      }
      if (currentLapTime > newWorstTime) {
        newWorstTime = currentLapTime;
      }
    });

    setBestTime(newBestTime);
    setWorstTime(newWorstTime);
  };

  // // Update button texts
  const updateButtonTexts = () => {
    setStartPauseButtonText(isActive ? 'Pause' : (millisecondsElapsedTotal === 0 ? 'Start' : 'Resume'));
    setLapResetButtonText(isActive ? 'Lap' : 'Reset');
  };

  const formattedLapTimes = useMemo(() => {
    // console.log(`dateTime: ${new Date().toISOString()} - formattedLapTimes called`);

    return lapTimes.map((lap) => {
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
  }, [lapTimes, bestTime, worstTime, styles]);

  return (
    <View style={styles.container}>
      <View style={styles.timeDisplayContainer}>
        <View style={styles.timeSegment}>
          <Text style={styles.timeLabel}>hr.</Text>
          <Text style={styles.smallTimeDisplay}>{formattedHours}</Text>
        </View>
        <View style={styles.timeSegment}>
          <Text style={styles.timeLabel}>min.</Text>
          <Text style={styles.timeDisplay}>{formattedMins}</Text>
        </View>
        <Text style={styles.timeColon}>:</Text>
        <View style={styles.timeSegment}>
          <Text style={styles.timeLabel}>sec.</Text>
          <Text style={styles.timeDisplay}>{formattedSecs}</Text>
        </View>
        <View style={styles.timeSegment}>
          <Text style={styles.timeLabel}>1/10s.</Text>
          <Text style={styles.smallTimeDisplay}>{formattedMilliseconds}</Text>
        </View>
      </View>
      <ScrollView 
        ref={scrollViewRef} 
        style={styles.lapsContainer} 
        contentContainerStyle={styles.scrollContentContainer}
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