import {FlatList, ListRenderItemInfo, StyleSheet, Text, View} from "react-native";
import interval, {Interval} from "./Interval";
import {useRef, useState} from "react";
import StopWatchButton from "./StopWatchButton";

function elapsedTimeStringFromDates(from: Date | null, to: Date | null = new Date()): string {
    if(to === null && from === null || to === null)
        return "--:--:--";
    if(from === null)
        return "00:00:00";
    const interval = Interval(to.valueOf() - from.valueOf());
    const padTimeString = (n: number) => n < 10 ? `0${n}` : `${n}`;
    const {hours, minutes, seconds} = interval;

    return `${padTimeString(hours)}:${padTimeString(minutes)}:${padTimeString(seconds)}`;
}

export default function StopWatch() {
    const flatList = useRef<FlatList | null>(null);
    const [clock, setClock] = useState<Date | null>(null);
    const [toClock, setToClock] = useState<Date | null>(new Date());
    // used to stop setInterval
    const [stopwatchId, setStopwatchId] = useState(NaN);
    const [laps, setLaps] = useState<[Date, Date][]>([]);
    let styles = StyleSheet.create({
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
            flexGrow:1,
            flexShrink:0,
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
            flexShrink:0,
        }
    });
    const startClock = () => {
        setClock(new Date());
        setToClock(new Date());
        resumeClock();
    };

    const stopClock = () => {
        pauseClock();
        setClock(null);
        setToClock(null);
    };

    const pauseClock = () => {
        clearInterval(stopwatchId);
        setStopwatchId(NaN);
    };

    const resumeClock = () => {
        if(toClock === null)
            setToClock(new Date()); //should never happen; suppress ts warning below
        else if(clock === null)
            setClock(new Date());
        else {
            // add elapsed time to start `clock` so it continues where it left off
            // i.e., fast-forward in time to account for time spent paused
            const elapsedMilliseconds = new Date().valueOf() - toClock.valueOf(); //toClock is not null @->resumeClock
            setClock(new Date(clock.valueOf() + elapsedMilliseconds));
            setToClock(new Date());
        }
        setStopwatchId(
            setInterval(() => {
                setToClock(new Date());
            }, 1000)
        );
    };
    const resetClock = () => {
        setClock(null);
        setLaps([]);
        clearInterval(stopwatchId);
        setStopwatchId(NaN);
    };

    function addLap() {
        const from = clock;
        const to = toClock;
        if(from !== null && to !== null)
            setLaps([...laps, [from, to]]);
    }

    function renderLap({item}: ListRenderItemInfo<[Date, Date]>) {
        const [from, to] = item;
        return <Text>{elapsedTimeStringFromDates(from, to)}</Text>;
    }


    return (
        <>
            <Text style={styles.counter}>{elapsedTimeStringFromDates(clock, toClock)}</Text>
            <View style={styles.buttonGroup}>
                <StopWatchButton
                    text={clock === null ? "Start" : "Stop"}
                    colour={clock === null ? "green" : "red"}
                    onClick={stopwatchId ? stopClock : startClock}
                />
                <StopWatchButton
                    text={stopwatchId ? "Pause" : "Resume"}
                    colour={stopwatchId ? "goldenrod" : "lightblue"}
                    disabled={isNaN(stopwatchId) && clock === null}
                    onClick={stopwatchId ? pauseClock : resumeClock}
                />
                <StopWatchButton onClick={addLap} text="Lap"/>
                <View style={styles.spacer}/>
                <FlatList ref={flatList}
                          centerContent={true}
                          style={styles.lapList}
                          data={laps}
                          contentContainerStyle={{alignItems: "center", flexGrow: 1}}
                          renderItem={renderLap}
                          keyExtractor={(_, index) => (Math.random() * index).toString(12)}
                          testID="lap-list"/>
                <StopWatchButton onClick={resetClock} text="Reset"/>
            </View>
        </>
    );
}