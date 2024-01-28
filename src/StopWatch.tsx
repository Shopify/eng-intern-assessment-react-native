import {Text} from 'react-native';
import interval, {Interval} from "./Interval";
import { useState} from "react";
import StopWatchButton from "./StopWatchButton";

function elapsedTimeString(elapsedTime: interval | null) {
    if (elapsedTime === null)
        return "--:--:--";
    const padTimeString = (n: number) => n < 10 ? `0${n}` : `${n}`

    const {hours, minutes, seconds} = elapsedTime;

    return `${padTimeString(hours)}:${padTimeString(minutes)}:${padTimeString(seconds)}`;
}



// ! but for SOME (react 🙄) reason, this doesn't work inline
const incrementIntervalBy1Second = (interval: interval | null): interval => {
    if (interval === null)
        interval = Interval(0);
    return Interval(interval.totalMilliseconds + 1000);
}

export default function StopWatch() {

    let [isRunning, setIsRunning] = useState(false);
    // used to stop setInterval
    let [stopwatchId, setStopwatchId] = useState(NaN);
    // elapsed time in milliseconds
    let [elapsedTime, setElapsedTime] = useState<interval | null>(Interval(0));

    const startClock = () => {
        if (isRunning)
            return;

        setStopwatchId(
            setInterval(() => {
                setElapsedTime(incrementIntervalBy1Second);
            }, 1000)
        );
    }

    const stopClock = () => {
        clearInterval(stopwatchId);
        setStopwatchId(NaN);
        setElapsedTime(null)
    }


    return (
        <>
            <Text>{elapsedTimeString(elapsedTime)}</Text>
            <StopWatchButton text="Start" onClick={startClock}/>
            <StopWatchButton text="Stop" onClick={stopClock}/>
        </>
    );
}