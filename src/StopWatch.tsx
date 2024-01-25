import React, { useEffect, useState } from "react";
import { View } from "react-native";
import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  const [stop, setStop] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [timeArray, setTimeArray] = useState<Array<number | String>>([]);

  function calculateTimer(currentTime: number): Array<number | String> {
    let hours: number = Math.floor(currentTime / 3600);
    let minutes: number = Math.floor((currentTime - hours * 3600) / 60);
    let seconds: number = currentTime - hours * 3600 - minutes * 60;
    let milliseconds: number = Math.floor((currentTime % 1) * 1000);

    let formatHours = hours < 10 ? `0${hours}` : hours;
    let formatMinutes = minutes < 10 ? `0${minutes}` : minutes;
    let formatSeconds = seconds < 10 ? `0${seconds}` : seconds;
    let formatMilliseconds =
      milliseconds < 10 ? `0${milliseconds}` : milliseconds;

    return [formatHours, formatMinutes, formatSeconds, formatMilliseconds];
  }

  useEffect(() => {
    let timeArray: Array<number | String> = calculateTimer(currentTime);
    setTimeArray(timeArray);
  }, [currentTime]);

  return (
    <View>
      <p>{timeArray[0]}</p>
      <span>:</span>
      <p>{timeArray[1]}</p>
      <span>:</span>
      <p>{timeArray[2]}</p>
      <span>:</span>
      <p>{timeArray[3]}</p>
      <span>:</span>
      <StopWatchButton setTime={setCurrentTime} />
    </View>
  );
}
