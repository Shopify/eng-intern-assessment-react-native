import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import StopWatchButton from "./StopWatchButton";

type Time = {
  hour: number;
  mins: number;
  sec: number;
  ms: number;
};

  /**
   * - Handle the functionality of the button - start, stop, resume, laps, and reset
   * - Render the display of stopWatch and the buttons
   */
export default function StopWatch() {
  const [time, setTime] = useState<Time>({ hour: 0, mins: 0, sec: 0, ms: 0 });
  const [laps, setLaps] = useState<string[]>([]);
  const [interv, setInterv] = useState<number | undefined>();
  const [status, setStatus] = useState<number>(0);

  const timeUnit = useCallback(
    (unit: number) => (unit >= 10 ? unit.toString() : `0${unit}`),
    []
  );

  const run = useCallback(() => {
    setTime((prevTime) => {
      let updatedHour = prevTime.hour;
      let updatedMins = prevTime.mins;
      let updatedSec = prevTime.sec;
      let updatedMs = prevTime.ms;

      if (updatedMins === 60) {
        updatedHour++;
        updatedMins = 0;
      }
      if (updatedSec === 60) {
        updatedMins++;
        updatedSec = 0;
      }
      if (updatedMs === 100) {
        updatedSec++;
        updatedMs = 0;
      }

      updatedMs++;
      return {
        hour: updatedHour,
        mins: updatedMins,
        sec: updatedSec,
        ms: updatedMs,
      };
    });
  }, [setTime]);

  const start = useCallback(() => {
    run();
    setStatus(1);
    setInterv(setInterval(run, 10));
  }, [setStatus, setInterv, run]);

  const stop = useCallback(() => {
    if (interv != undefined) {
      clearInterval(interv);
    }
    setStatus(2);
  }, [interv]);

  const reset = useCallback(() => {
    if (interv != undefined) {
      clearInterval(interv);
    }
    setStatus(0);
    setTime({ hour: 0, mins: 0, sec: 0, ms: 0 });
    setLaps([]);
  }, [setStatus, setTime, setLaps, interv]);

  const resume = () => start();

  useEffect(() => {
    return () => {
      if (interv != undefined) {
        clearInterval(interv);
      }
    };
  }, [interv]);

  const formatTime = useCallback((time: Time) => {
    return `${String(time.mins).padStart(2, "0")}:${String(time.sec).padStart(
      2,
      "0"
    )}:${String(time.ms).padStart(2, "0")}`;
  }, []);

  const recordLaps = useCallback(() => {
    setLaps((prevLaps) => [...prevLaps, formatTime(time)]);
  }, [setLaps, formatTime, time]);

  return (    
    <View style={styles.watchBlock}>
      <Text style={styles.watchUnit}>
        {timeUnit(time.mins) +
          ":" +
          timeUnit(time.sec) +
          ":" +
          timeUnit(time.ms)}
      </Text>

      <StopWatchButton
        status={status}
        start={start}
        pause={stop}
        resume={resume}
        reset={reset}
        recordLaps={recordLaps}
        laps={laps} />
    </View> 
  );
}

const styles = StyleSheet.create({ 
  img:{
    justifyContent:"center",
    height:160,
    width:160,
    marginBottom:300 ,
    backgroundColor:"grey"
  },
  watchBlock: {
    flexDirection: "column",
    color: "white",
    justifyContent:"center",
    width:250,
    maxHeight: 200,
  },
  watchUnit: {
    backgroundColor: "#00ABA9",
    color: "white",
    fontSize: 25,
    padding: 20,
    overflow: 'hidden',
    borderRadius: 20,
    alignItems: "center",
    textAlign: "center",
    letterSpacing: 3
  }
});
