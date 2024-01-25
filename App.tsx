import {Alert, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import StopWatch from "./src/StopWatch";
import StopWatchButton from "./src/StopWatchButton";
import {useEffect, useState} from "react";

export default function App() {

    const timerOutInMilliSecond = 10
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const onLapClicked = () => {
        Alert.alert("OnLapClicked")
    }

    const onResetClicked = () => {
        setIsRunning(false)
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
            <StopWatch elapsedTime={elapsedTime}/>
            <View style={styles.buttonContainer}>
                <StopWatchButton label={"Lap"} onPress={onLapClicked}/>
                <StopWatchButton label={"Reset"} onPress={onResetClicked}/>
                <StopWatchButton label={"Stop"} onPress={onStopClicked}/>
                <StopWatchButton label={"Start"} onPress={onStartClicked}/>
            </View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
    },

    buttonContainer: {
        flex: 2,
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: 10
    }
});
