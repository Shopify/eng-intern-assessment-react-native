import {Text} from "react-native";
import interval, {Interval} from "./Interval";
import {useState} from "react";
import StopWatchButton from "./StopWatchButton";

function elapsedTimeString(from: Date | null, to: Date | null = new Date()): string {
    if(to === null && from === null || to === null)
        return "--:--:--";
    if(from === null)
        return "00:00:00";

    const padTimeString = (n: number) => n < 10 ? `0${n}` : `${n}`;
    const {hours, minutes, seconds} = Interval(to.valueOf() - from.valueOf());

    return `${padTimeString(hours)}:${padTimeString(minutes)}:${padTimeString(seconds)}`;
}

const incrementIntervalBy1Second = (interval: interval | null): interval => {
    if(interval === null)
        interval = Interval(0);
    return Interval(interval.totalMilliseconds + 1);
};

export default function StopWatch() {
    const [clock, setClock] = useState<Date | null>(null);
    const [toClock, setToClock] = useState<Date | null>(new Date());
    // used to stop setInterval
    const [stopwatchId, setStopwatchId] = useState(NaN);
    const [laps, setLaps] = useState<interval[]>([]);
    let styles = StyleSheet.create({
        lapList: {
            maxHeight: 100,
            height: 100,
            flexGrow: 0,
            backgroundColor: "red",
            display: laps.length > 0 ? "flex" : "none"
        },
        spacer: {
            width: "100%",
            height: 100,
        },
        counter: {
            fontSize: 48,
            textAlign: "center",
            width: "100%",
            flexGrow: 0,
            backgroundColor: "green"
        },
        buttonGroup: {
            width: 250,
            flexDirection: "column",
            justifyContent: "space-evenly",
            flexGrow: 0,
            backgroundColor: "blue"
        }
    });
    const startClock = () => {
        setClock(new Date());
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
                setElapsedTime(elapsedTimeString(clock, new Date()));
            }, 1000)
        );
    };


    return (
        <>
            <Text style={styles.counter}>{elapsedTimeStringFromDates(clock, toClock)}</Text>
            <View>
                <View style={styles.buttonGroup}>
                    <StopWatchButton
                        text={stopwatchId ? "Stop" : "Start"}
                        onClick={stopwatchId ? stopClock : startClock}
                    />
                    <StopWatchButton
                        text={stopwatchId ? "Pause" : "Resume"}
                        onClick={stopwatchId ? pauseClock : resumeClock}
                    />
                    <StopWatchButton onClick={addLap} text="Lap"/>
                </View>
            </View>
            <View style={styles.spacer}/>
            <FlatList ref={flatList}
                      centerContent={true}
                      style={styles.lapList}
                      data={laps}
                      renderItem={renderLap}
                      keyExtractor={(item, index) => (Math.random() * 999).toString(12)}
                      testID="lap-list"/>
        </>
    );
}