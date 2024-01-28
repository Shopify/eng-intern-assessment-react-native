import {Text} from 'react-native';
import interval, {Interval} from "./Interval";
import {useState} from "react";
import StopWatchButton from "./StopWatchButton";

const padTimeString = (n: number) => {
    return n < 10 ? `0${n}` : `${n}`;
}

export default function StopWatch() {

    let elapsedMilliseconds = 0;
    let [elapsedTime, setElapsedTime] = useState<interval>(Interval(0));
    const {hours, minutes, seconds} = elapsedTime;

    const startClock = () => {
        console.log("startClock");
        setInterval(() => {
            console.log(elapsedTime);
            elapsedMilliseconds += 1000;
            setElapsedTime(Interval(elapsedMilliseconds));
        }, 1000);
    };


    return (
        <>
            <Text>{padTimeString(hours)}:{padTimeString(minutes)}:{padTimeString(seconds)}</Text>
            <StopWatchButton text="start" onClick={startClock}/>
        </>
    );
}