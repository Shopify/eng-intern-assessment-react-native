import { View, Text, StyleSheet, ScrollView } from 'react-native';
import moment from 'moment';
import StopWatchButton from './StopWatchButton';
import { ReactNode, useEffect, useState, useRef} from 'react';

interface TimerProps {
  interval: number,
  style: {}
};

interface RowButtonsProps {
  children: ReactNode;
};

interface LapProps {
  num: number,
  key: number,
  interval: number,
};

interface LapTableProps {
  laps: number[],
  now: number
};

interface State {
  timer: number,
  laps: number[]
};

function Timer ({interval, style}: TimerProps) {
  const duration = moment.duration(interval);
  const hour = String(duration.hours()).padStart(2, '0');
  const minute = String(duration.minutes()).padStart(2, '0');
  const second = String(duration.seconds()).padStart(2, '0');

  if (interval === 0) {
    return (
      <View style={styles.timerRow}>
        <Text style={style}>
          {interval > 0 ? `${hour}:${minute}:${second}` : '00:00:00'}
        </Text>
      </View>
    );
  }

  return (
    <View style = {styles.timerRow}>
      <Text style = {style}>{hour}:{minute}:{second}</Text>
    </View>
  )
}

function RowButtons({children}: RowButtonsProps) {
  return (
    <View style = {styles.rowButtons}>{children}</View>
  )
}

function Lap({num, interval}: LapProps) {
  return (
    <View style = {styles.lap}> 
      <Text style = {styles.lapText}> Lap {num + 1} </Text>
      <Timer style = {styles.lapText} interval = {interval}/>
    </View>
  )
}

function LapTable({laps, now}: LapTableProps) {
  return (
    <ScrollView contentContainerStyle = {styles.scroll}>
      {laps.map((lap: number, index: number) => (
        <Lap 
         num = {index}
         key = {index} 
         interval = {lap}
        />
        ))}
    </ScrollView>
  )
}

function LapName() {
  return (
    <View style = {styles.lapName}>
      <Text style = {styles.lapText}>Lap</Text>
      <Text style = {styles.lapText}>Time</Text>
    </View>
  )
}

export default function StopWatch() {
  const [timerOn, setTimerOn] = useState(false);
  const [now, setNow] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  const [prevLapTime, setPrevLapTime] = useState(0);
  // const intervalHandler = useRef<number | null>(null);

  useEffect(() => {
    // let timer: number;
    let timer: number;
    if (timerOn) {
      timer = setInterval(() => {
        setNow((now) => now + 500);
      }, 500);
      setPrevLapTime(0);
    }

    return () => {
      clearInterval(timer);
    };
  }, [timerOn]);

  const handleStart = () => {
    setTimerOn(true);
    // intervalHandler.current = setInterval(() => {
    //   setNow((now) => now + 500);
    // }, 500);
  }

  const handleStop = () => {
    setTimerOn(false);
    // clearInterval(intervalHandler.current!);
  };

  const handleReset = () => {
    setTimerOn(false);
    setNow(0);
    setLaps([])
    setPrevLapTime(0)
  };

  const handleLap = () => {
    if (timerOn) {
      const lapTime = now - prevLapTime;
      setLaps((prevLaps) => [...prevLaps, lapTime]);
      setPrevLapTime(now);
    }
  }

  return (
    
    <View >
      <Timer interval={now} style = {styles.timer}/>
      <RowButtons>
      <StopWatchButton 
          title = {timerOn ? 'Stop': 'Start'}
          color = {timerOn ? '#FF3131': '#0FFF50'}
          background = {timerOn ? '#8B0000':'#228B22'}
          onPress = {timerOn ? handleStop: handleStart}
        />
        <StopWatchButton 
          title = {timerOn ? 'Lap': 'Reset'}
          color = '#FFFFFF' 
          background = '#C4A484'
          onPress = {timerOn ? handleLap : handleReset}
        />
      </RowButtons>
      <LapName/>
      <LapTable laps = {laps} now = {now}/>
    </View>
  );
}

const styles = StyleSheet.create({
  timer: {
    color: '#FFFFFF',
    fontSize: 70,
    fontWeight: "100",
    justifyContent: 'center',
    // marginHorizontal: 30,
    width: 300
  },
  rowButtons: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 30,
    alignItems: 'center'
  },
  lap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#343434',
    borderWidth: 0,
    marginVertical: 5,
    marginHorizontal: 5,
    width: 300
  },
  lapText: {
    color: '#FFFFFF',
    fontSize: 20
  },
  scroll: {
    alignSelf: 'stretch',
    padding: 20,
    flexGrow: 1,
  },
  timerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: -15
  },
  lapName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
    alignItems: 'center',
    marginHorizontal: 20
  }
});
