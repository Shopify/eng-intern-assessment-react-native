import { StyleSheet, View } from "react-native";
import StopWatchCounter from "./StopWatchCounter";
import StopWatchButton from "./StopWatchButtons";
import Laps from "./Laps";
import { useEffect, useState } from "react";

export default function StopWatch() {
  // Define state variables for managing the stopwatch.
  const [isActive, setIsActive] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [formattedTime, setFormattedTime] = useState<string>("00:00:00");
  /* 
    Laps are the duration of time between each lap
    Total lap times are the total time expended at each lap
    Total lap times are used to calculate laps (laps are displayed to user)
  */
  const [laps, setLaps] = useState<string[]>([]);
  const [totalLapTimes, setTotalLapTimes] = useState<string[]>([]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    // Start the interval when the stopwatch is active.
    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
        formatTime();
      }, 1000);
    } else if (!isActive && time !== 0) {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time]);

  const toggleTimer = () => {
    // Start/stop timer depending on if stopwatch is active.
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    // Reset the stopwatch to it's initial state.
    setTime(0);
    setFormattedTime("00:00:00");
    setLaps([]);
    setTotalLapTimes([]);
  };

  const handleLap = () => {
    // Get new lap time by calculating difference of current time and last lap.
    const timeDifference: string = calculateTimeDifference(
      formattedTime,
      totalLapTimes[0] ? totalLapTimes[0] : "00:00:00"
    );

    // Update laps/intervals by appending to start of list of laps/intervals.
    setTotalLapTimes([formattedTime, ...totalLapTimes]);
    setLaps([timeDifference, ...laps]); // Laps are ordered newest to oldest.
  };

  const calculateTimeDifference = (
    time: string,
    lastInterval: string
  ): string => {
    // Convert times to date format.
    const time1 = new Date(`1999-01-01T${time}`);
    const time2 = new Date(`1999-01-01T${lastInterval}`);

    //Get time HH:MM:SS time different using Date methods.
    const timeDifference = time1.getTime() - time2.getTime();

    // Convert from miliseconds to correct time.
    const hours = Math.floor(timeDifference / 3600000);
    const minutes = Math.floor((timeDifference % 3600000) / 60000);
    const seconds = Math.floor((timeDifference % 60000) / 1000);

    // Returned parsed hours, minutes, seconds in HH:MM:SS.
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const formatTime = (): void => {
    // Format the time in HH:MM:SS format.
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    setFormattedTime(
      [hours, minutes, seconds]
        .map((val) => String(val).padStart(2, "0"))
        .join(":")
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.counterContainer}>
        <StopWatchCounter time={formattedTime} />
      </View>
      <View style={styles.buttonsContainer}>
        <StopWatchButton
          onToggle={toggleTimer}
          onReset={resetTimer}
          onLap={handleLap}
          isActive={isActive}
        />
      </View>
      <View style={styles.lapsContainer}>
        <Laps laps={laps} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    width: "100%",
    height: "100%",
  },
  counterContainer: {
    flex: 4, // 40% of the space
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black", 
    paddingTop: 100 
  },
  buttonsContainer: {
    flex: 2, // 20% of the space
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(64, 64, 64, 0.7)",
  },
  lapsContainer: {
    flex: 3, // 40% of the space
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    paddingBottom: 100 
  },
});
