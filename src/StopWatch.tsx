import {FlatList, ListRenderItemInfo, StyleSheet, Text, View} from "react-native";
import {Interval} from "./Interval";
import {useState} from "react";
import StopWatchButton from "./StopWatchButton";

/**
 * Generates a string representing the elapsed time between two dates.
 *
 * @param {Date | null} from - the starting date, if null, returns "00:00:00" as there is no elapsed time
 * @param {Date | null} [to=new Date()] - the ending date, defaults to the current date, if null, returns "--:--:--" as there's no calculable elapsed-time
 * @return {string} the elapsed time string in the format "HH:MM:SS"
 */
function elapsedTimeStringFromDates(from: Date | null, to: Date | null = new Date()): string {
    if(to === null && from === null || to === null)
        return "--:--:--";
    if(from === null)
        return "00:00:00";
    const interval = Interval(to.valueOf() - from.valueOf());
    /// pad time string with leading 0 if necessary
    const padTimeString = (n: number) => n < 10 ? `0${n}` : `${n}`;
    const {hours, minutes, seconds} = interval;

    return `${padTimeString(hours)}:${padTimeString(minutes)}:${padTimeString(seconds)}`;
}

/**
 * creates a JSX element representing a lap time
 * @param item - the start and end time of the lap
 * @return {JSX.Element} - a {@link Text} element containing the lap time (HH:MM:SS)
 */

function renderLap({item}: ListRenderItemInfo<[Date, Date]>) {
    const [from, to] = item;
    return <Text>{elapsedTimeStringFromDates(from, to)}</Text>;
}

export default function StopWatch() {
    const [fromClock, setFromClock] = useState<Date | null>(null);
    const [toClock, setToClock] = useState<Date | null>(new Date());
    const [stopwatchId, setStopwatchId] = useState(NaN);
    const [laps, setLaps] = useState<[Date, Date][]>([]);
    const styles = StyleSheet.create({
        lapList: {
            maxHeight: 150,
            alignContent: "center",
            backgroundColor: "red",
            flex: 2,
            display: laps.length > 0 ? "flex" : "none"
        },
        spacer: {
            width: "100%",
            maxHeight: 150,
            height: 150,
            flex: 2,
            flexGrow: 1,
            flexShrink: 0,
            backgroundColor: "yellow",
            display: laps.length < 1 ? "flex" : "none"
        },
        counter: {
            fontSize: 48,
            textAlign: "center",
            width: "100%",
            marginTop: 100,
            backgroundColor: "green"
        },
        buttonGroup: {
            width: 250,
            flexDirection: "column",
            justifyContent: "space-around",
            backgroundColor: "blue",
            padding: 10,
            margin: 85,
            flex: 1,
            flexShrink: 0,
        }
    });

    function startClock() {
        setFromClock(new Date());
        setToClock(new Date());
        resumeClock();
    }

    function stopClock() {
        pauseClock();
        setFromClock(null);
        setToClock(null);
    }

    function pauseClock() {
        clearInterval(stopwatchId);
        setStopwatchId(NaN);
    }

    function resumeClock() {
        if(toClock === null)
            setToClock(new Date()); //should never happen; suppress ts warning below
        else if(fromClock === null)
            setFromClock(new Date());
        else {
            // add elapsed time to start `fromClock` so it continues where it left off
            // i.e., fast-forward in time to account for time spent paused
            const elapsedMilliseconds = new Date().valueOf() - toClock.valueOf();
            setFromClock(new Date(fromClock.valueOf() + elapsedMilliseconds));
            setToClock(new Date());
        }

        setStopwatchId(
            setInterval(() => {
                setToClock(new Date());
            }, 1000)
        );
    }

    function resetClock() {
        setFromClock(null);
        setLaps([]);
        clearInterval(stopwatchId);
        setStopwatchId(NaN);
    }

    function addLap() {
        const from = fromClock;
        const to = toClock;
        if(from !== null && to !== null)
            setLaps([...laps, [from, to]]);
    }

    return <>
        <Text style={styles.counter}>{elapsedTimeStringFromDates(fromClock, toClock)}</Text>
        <View style={styles.buttonGroup}>
            <StopWatchButton
                text={fromClock === null ? "Start" : "Stop"}
                colour={fromClock === null ? "green" : "red"}
                onClick={stopwatchId ? stopClock : startClock}
            />
            <StopWatchButton
                text={stopwatchId ? "Pause" : "Resume"}
                colour={stopwatchId ? "goldenrod" : "lightblue"}
                disabled={isNaN(stopwatchId) && fromClock === null}
                onClick={stopwatchId ? pauseClock : resumeClock}
            />
            <StopWatchButton onClick={addLap} text="Lap"/>
            <View style={styles.spacer}/>
            <FlatList
                centerContent={true}
                style={styles.lapList}
                data={laps}
                contentContainerStyle={{alignItems: "center", flexGrow: 1}}
                renderItem={renderLap}
                keyExtractor={(_, index) => (Math.random() * index).toString(12)}
                testID="lap-list"/>
            <StopWatchButton onClick={resetClock} text="Reset"/>
        </View>
    </>;
}