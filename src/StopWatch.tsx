import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from "react";
import LapList, {LapModel} from "./components/LapList";
import StopWatchButton from "./StopWatchButton";
import {formatTime} from "./common/TimeFormatter";

export default function StopWatch() {

    const [elapsedTime, setElapsedTime] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [laps, setLaps] = useState<number[]>([])
    const [lastLapTime, setLastLapTime] = useState<number>(0)

    const onLapClicked = () => {
        if (isRunning) {
            // Calculate the lap time
            const lapTime = elapsedTime - lastLapTime;
            setLaps((prevLaps) => [...prevLaps, lapTime]);
            setLastLapTime(elapsedTime);
        }
    }

    const onResetClicked = () => {
        setIsRunning(false)
        setLaps([])
        setLastLapTime(0)
        setElapsedTime(0)

    }

    const onStopClicked = () => {
        setIsRunning(false)
    }

    const onStartClicked = () => {
        setIsRunning(true)
    }

    useEffect(() => {
        let intervalId: number;

        if (isRunning) {
            intervalId = setInterval(() => {
                setElapsedTime((prevElapsedTime) => prevElapsedTime + 100);
            }, 100);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isRunning]);

    return (
        <>
            <View style={styles.displayTIme}>
                <Text style={styles.time}>{formatTime(elapsedTime)}</Text>
            </View>

            <View style={styles.buttons}>
                <StopWatchButton label={"Reset"} onPress={onResetClicked}/>
                <StopWatchButton label={"Lap"} onPress={onLapClicked}/>
                <StopWatchButton label={"Start"} onPress={onStartClicked}/>
                <StopWatchButton label={"Stop"} onPress={onStopClicked}/>
            </View>

            <View style={styles.lapList}>
                {laps.length > 0 && <LapList laps={
                    laps.map((lap, index) => ({
                        title: `Lap ${index + 1}`,
                        time: lap,
                    }))
                }/>}
            </View>
        </>

    )
}

const styles = StyleSheet.create({
    displayTIme: {
        flex: 1,
        alignItems: 'flex-end',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },

    buttons: {
        flex: 1,
        flexDirection: 'row',
        gap: 10,
        alignItems: 'flex-end',
        paddingHorizontal: 10,
    },

    lapList: {
        flex: 2,
        width: '100%',
        paddingHorizontal: 16,
        marginTop: 16
    },

    time: {
        fontSize: 70,
        fontWeight: 'normal',
        width: "100%",
        textAlign: 'center',
        color: 'white'

    }
})