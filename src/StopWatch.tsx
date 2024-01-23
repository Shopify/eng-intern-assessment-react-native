import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ButtonGroup from './ButtonGroup';
import LapList from './Laps';
import Timestamp from './Timestamp';
import { convertCentisToSegments, convertSegmentsToCentis, getTotalRecordedLapTime } from './utils';

type StopwatchState = "stopped" | "paused" | "recording"

export default function StopWatch() {

  const [time, setTime] = useState([0, 0, 0]);
  const [stopwatchState, setStopwatchState] = useState<StopwatchState>("stopped");
  const [laps, setLaps] = useState<number[][]>([]);

  const intervalIdRef = useRef<number>();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      justifyContent: 'center'
    }
  })

  const getNextTimeSegments = (time: number[]) => {
    const [min, sec, centis] = time;
    let newMin = min, newSec = sec, newCentis;
    newCentis = centis + 1;
    if (newCentis === 100) {
      newSec = sec + 1;
      newCentis = 0
    }
    if (newSec === 60) {
      newMin = min + 1;
      newSec = 0;
    }
    return [newMin, newSec, newCentis]
  }

  const pauseRecording = () => {
    setStopwatchState("paused")
    const intervalId = intervalIdRef.current;
    if (intervalId) clearInterval(intervalId);
  }

  const startRecording = () => {
    setStopwatchState("recording")
    const intervalId = setInterval(() => {
      setTime(getNextTimeSegments)
    }, 10);

    intervalIdRef.current = intervalId;
  }

  const stopRecording = () => {
    setStopwatchState("stopped")
    const intervalId = intervalIdRef.current;
    if (intervalId) clearInterval(intervalId);
  }

  const resetRecording = () => {
    setTime([0, 0, 0]);
    const intervalId = intervalIdRef.current;
    if (intervalId) clearInterval(intervalId);
    setLaps([])
    setStopwatchState("stopped")
  }

  const getCurrentLapSegments = () => {
    const totalLapSegments = getTotalRecordedLapTime(laps);
    const totalLapCentis = convertSegmentsToCentis(totalLapSegments);
    const currentTimeCentis = convertSegmentsToCentis(time);
    const diff = currentTimeCentis - totalLapCentis;
    return convertCentisToSegments(diff);
  }

  const recordLap = () => {
    setLaps(laps => {
      const currentLapSegments = getCurrentLapSegments();
      return [...laps, currentLapSegments]
    })
  }

  const isDefaultTimestamp = time.every(segment => segment === 0);
  const isStopped = stopwatchState === "stopped";
  const isRecording = stopwatchState === "recording";
  const isPaused = stopwatchState === "paused";

  const isTimestampVisible = (isRecording && !laps.length) || isDefaultTimestamp && isStopped || isPaused

  return (
    <View style={styles.container}>
      <LapList laps={laps} visible={!!laps.length} />
      <Timestamp time={time} visible={isTimestampVisible} />
      <ButtonGroup
        isInitial={isDefaultTimestamp}
        isRecording={isRecording}
        onPressPause={pauseRecording}
        onPressStart={startRecording}
        onPressStop={stopRecording}
        onPressReset={resetRecording}
        onPressLap={recordLap}
      />
    </View>
  );
}