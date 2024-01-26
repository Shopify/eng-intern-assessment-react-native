import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import StopWatch from "./src/StopWatch";
import StopWatchButton from "./src/StopWatchButton";
import React, {useEffect, useState} from "react";
import LapGroup from "./src/components/LapGroup";
import {LapProps} from "./src/components/Lap";

export default function App() {

    const timerOutInMilliSecond = 10
    const [elapsedTime, setElapsedTime] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [laps, setLaps] = useState<number[]>([])
    const [lastLapTime, setLastLapTime] = useState<number>(0)

    const lapPropsList: LapProps[] = laps.map((lap, index) => ({
        title: `Lap ${index + 1}`,
        time: lap,
    }))
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
        setElapsedTime(0)
        setLaps([])
        setLastLapTime(0)
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
                setElapsedTime((prevElapsedTime) => prevElapsedTime + timerOutInMilliSecond);
            }, timerOutInMilliSecond);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isRunning]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.stopWatchContainer}>
                <StopWatch elapsedTime={elapsedTime}/>
            </View>

            <View style={styles.buttonContainer}>
                <StopWatchButton label={"Lap"} onPress={onLapClicked}/>
                <StopWatchButton label={"Reset"} onPress={onResetClicked}/>
                <StopWatchButton label={"Stop"} onPress={onStopClicked}/>
                <StopWatchButton label={"Start"} onPress={onStartClicked}/>
            </View>

            <View style={styles.lapGroup}>
                {laps.length > 0 && <LapGroup laps={lapPropsList}/>}
            </View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },

    stopWatchContainer: {
        flex: 1,
        alignItems: 'flex-end',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },

    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        gap: 10,
        alignItems: 'flex-end',
        paddingHorizontal: 10,
    },

    lapGroup: {
        flex: 2,
        width: '100%',
        paddingHorizontal: 10,
        marginTop: 16
    }
});
