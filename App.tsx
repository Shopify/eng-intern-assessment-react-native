import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View} from 'react-native';
import StopWatchButton from "./src/StopWatchButton";
import StopWatch from "./src/StopWatch";
import {useState} from "react";
import interval, {Interval} from "./src/Interval";

let elapsedTime = 0;
export default function App() {
    let elapsedMilliseconds = 0;
    let [elapsedTime, setElapsedTime] = useState<interval>(Interval(0));

    const startClock = () => {
        console.log("startClock");
        setInterval(() => {
            console.log(elapsedTime);
            elapsedMilliseconds += 1000;
            setElapsedTime(Interval(elapsedMilliseconds));
        }, 1000);
    };


    return (
        <View style={styles.container}>
            <StopWatch elapsedTime={elapsedTime}/>
            <StopWatchButton text="start" onClick={startClock}/>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
