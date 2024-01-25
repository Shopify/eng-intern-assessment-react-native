import { useRef, useState } from "react";
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import StopWatchButton, { ButtonTypes } from "./StopWatchButton";
import {
    formatTime,
    getBestTime,
    getWorstTime,
    mapLapsToTimes,
} from "./utils/time";
import LapDisplay from "./components/Laps";
import DisplayTime from "./components/DisplayTime";
import DisplayResults from "./components/DisplayResults";

// Used to ensure the app is the same width as the screen
const { width: screenWidth } = Dimensions.get("screen");

export default function StopWatch() {
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [time, setTime] = useState<number>(0);
    // Tracks when to reset the state (ie first render and when reset pressed)
    const [isTimerReset, setIsTimerReset] = useState<boolean>(true);

    // State variables to track laps
    const [laps, setLaps] = useState<{ index: number; time: number }[]>([]);
    const [lastLapTime, setLastLapTime] = useState<number | undefined>();

    // State variables to keep track of performance
    const [worstTime, setWorstTime] = useState<number | undefined>();
    const [bestTime, setBestTime] = useState<number | undefined>();

    const [showResults, setShowResults] = useState<boolean>(false);

    // Refs to ensure timer is accurate
    const referenceTimeRef = useRef<number>(0);
    const intervalRef = useRef<number | null>(null);

    const handleStart = () => {
        // Need this data to persist until restarted to show results from previous session
        setLaps([]);

        setShowResults(false);
        referenceTimeRef.current = Date.now() - time * 10;

        // The interval is not always going to fire exactly once every 10 ms. We can find the exact time by referencing the time when we started the time (is start or resume)
        intervalRef.current = setInterval(() => {
            setTime(Math.floor((Date.now() - referenceTimeRef.current) / 10));
        }, 10);
        setIsTimerReset(false);
        setIsRunning(true);
    };

    const handlePause = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setIsRunning(false);
    };

    const handleResume = () => {
        handleStart();
    };

    const handleReset = () => {
        if (laps.length > 1) {
            setShowResults(true);
        }
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setIsTimerReset(true);
        setIsRunning(false);
        setTime(0);
        setLastLapTime(undefined);
    };

    const handleLap = () => {
        const index = laps.length > 0 ? laps[0].index + 1 : 1;
        const lapTime = lastLapTime ? time - lastLapTime : time;
        const newLaps = [{ index, time: lapTime }, ...laps];

        const times = mapLapsToTimes(newLaps);
        setWorstTime(getWorstTime(times));
        setBestTime(getBestTime(times));
        setLaps(newLaps);

        setLastLapTime(time);
    };

    return (
        // Use safe area to avoid insets on device
        <SafeAreaView style={{ width: screenWidth, ...styles.container }}>
            <DisplayTime time={formatTime(time)} />
            {showResults ? (
                <ScrollView style={styles.resultContainer}>
                    <DisplayResults lapTimes={mapLapsToTimes(laps)} />
                </ScrollView>
            ) : (
                <ScrollView style={styles.lapContainer}>
                    {laps.map((lap) => {
                        return (
                            // Shouldn't use index, but should be fine for this simple app
                            <LapDisplay
                                lap={lap}
                                bestTime={bestTime}
                                worstTime={worstTime}
                                key={lap.index}
                            />
                        );
                    })}
                </ScrollView>
            )}

            <View style={styles.buttonContainer}>
                {/* Only show start if the timer has not begun */}
                {!isRunning && time === 0 && (
                    <StopWatchButton
                        type={ButtonTypes.START}
                        onPress={handleStart}
                    />
                )}

                {/* If the timer is going show lap, otherwise show reset */}
                <View>
                    {isRunning ? (
                        <StopWatchButton
                            type={ButtonTypes.LAP}
                            onPress={handleLap}
                        />
                    ) : (
                        !isTimerReset && (
                            <StopWatchButton
                                type={ButtonTypes.RESET}
                                onPress={handleReset}
                            />
                        )
                    )}
                </View>

                {/* If the timer is running, show pause, otherwise show resume */}
                <View>
                    {isRunning ? (
                        <StopWatchButton
                            type={ButtonTypes.STOP}
                            onPress={handlePause}
                        />
                    ) : (
                        !isTimerReset && (
                            <StopWatchButton
                                type={ButtonTypes.RESUME}
                                onPress={handleResume}
                            />
                        )
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    resultContainer: {
        flexDirection: "column",
        alignContent: "center",
        width: "100%",
        paddingVertical: 10,
    },
    lapContainer: {
        flexDirection: "column",
        width: "100%",
        paddingVertical: 10,
    },

    buttonContainer: {
        flexDirection: "row",
        width: "100%",
        alignContent: "center",
        justifyContent: "center",
        paddingVertical: 10,
    },
});
