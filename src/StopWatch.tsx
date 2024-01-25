import React, { useEffect, useState } from "react";
import { View } from "react-native";
import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [timeArray, setTimeArray] = useState<Array<number | String>>([]);

  function calculateTimer(currentTime: number): Array<number | String> {
    let totalMilliseconds: number = Math.floor(currentTime);

    let hours: number = Math.floor(totalMilliseconds / (3600 * 1000));
    let minutes: number = Math.floor(
      (totalMilliseconds % (3600 * 1000)) / (60 * 1000)
    );
    let seconds: number = Math.floor((totalMilliseconds % (60 * 1000)) / 1000);
    let milliseconds: number = totalMilliseconds % 1000;

    let formatHours = hours < 10 ? `0${hours}` : hours;
    let formatMinutes = minutes < 10 ? `0${minutes}` : minutes;
    let formatSeconds = seconds < 10 ? `0${seconds}` : seconds;
    let formatMilliseconds =
      milliseconds < 10
        ? `00${milliseconds}`
        : milliseconds < 100
        ? `0${milliseconds}`
        : `${milliseconds}`;

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
      <StopWatchButton setTime={setCurrentTime} currentTime={currentTime} />
    </View>
  );
}
