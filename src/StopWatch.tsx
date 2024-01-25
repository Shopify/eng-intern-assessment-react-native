import React, { useState, useRef, RefObject } from 'react'; 
import { View, Text, StyleSheet, ScrollView } from 'react-native'; 
import StopWatchButton from './StopWatchButton';

interface Lap {
    lapTime: number;
    totalTime: number;
}

export default function StopWatch() {
    // State and refs to manage time, stopwatch status, and scrolling
    const [time, setTime] = useState(0); 
    const [running, setRunning] = useState(false); 
    const intervalRef = useRef<number | null>(null);
    const startTimeRef = useRef(0);
    const scrollViewRef: RefObject<ScrollView> = useRef<ScrollView>(null);

    // State to store lap times 
    const [laps, setLaps] = useState<Lap[]>([]); 

    // Function to format time in minutes:seconds:milliseconds as /(\d{2}:){2}\d{2}/
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = Math.floor((time % 1000) / 10);
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${milliseconds < 10 ? '0' : ''}${milliseconds}`;
    };

    // Function to start the stopwatch
    const startStopwatch = () => {
        startTimeRef.current = Date.now() - time;
        intervalRef.current = setInterval(() => {
            setTime(Date.now() - startTimeRef.current);
        }, 10);
        setRunning(true);
    };

    // Function to pause the stopwatch
    const pauseStopwatch = () => { 
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
        }
        setRunning(false); 
    };

    // Function to reset the stopwatch
    const resetStopwatch = () => { 
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null; // Ensure the interval is cleared
        }
        setTime(0); // Reset time to 0
        setRunning(false); // Ensure stopwatch is not running
        setLaps([]); // Clear laps array
    };

    // Function to resume the stopwatch
    const resumeStopwatch = () => { 
        startTimeRef.current = Date.now() - time;
        intervalRef.current = setInterval(() => {
            setTime(Date.now() - startTimeRef.current);
        }, 10);
        setRunning(true); 
    }; 

    // Function to record a lap and auto-scroll to the latest lap
    const recordLap = () => {
        // Calculate lap time as the difference between current time and last lap time
        const lastLapTime = laps.length > 0 ? laps[laps.length - 1].totalTime : 0;
        const lapTime = time - lastLapTime;
        
        // Add a new lap with its time and the total time until this lap
        setLaps([...laps, { lapTime: lapTime, totalTime: time }]);
        scrollViewRef.current?.scrollToEnd({ animated: true });
    };



    return (
        <View style={styles.screen}>
            <View style={styles.container}>
                <Text style={styles.timeText}>{formatTime(time)}</Text>
                    <ScrollView style={styles.lapContainer} ref={scrollViewRef}>
                        {laps.length > 0 && (
                            <View style={styles.lapHeader} testID='lap-list'>
                                <Text style={styles.lapColumnHeader}>Lap</Text>
                                <Text style={styles.lapColumnHeader}>Lap Time</Text>
                            </View>
                        )}
                        {laps.map((lap, index) => (
                            <View key={index} style={styles.lapEntry}>
                                <Text style={styles.lapIndex}>{`${index + 1}`.padStart(2, '0')}</Text>
                                <Text style={styles.lapTime}>{formatTime(lap.lapTime)}</Text>
                            </View>
                        ))}
                    </ScrollView>
                <View style={styles.buttonContainer}>
                    {running ? (
                        // Display Lap and Stop buttons when the stopwatch is running
                        <>
                            <StopWatchButton
                                label="Lap"
                                onPress={recordLap}
                                buttonStyle={styles.lapButton}
                                disabled={false}
                            />
                            <StopWatchButton
                                label="Stop"
                                onPress={pauseStopwatch}
                                buttonStyle={styles.stopButton}
                                disabled={false}
                            />
                        </>
                    ) : (
                        // Display Start, Resume, and Reset buttons based on the stopwatch state
                        <>
                            {time === 0 ? (
                                <>
                                    <StopWatchButton
                                        label="Lap"
                                        onPress={recordLap}
                                        buttonStyle={styles.lapButton}
                                        disabled={time === 0 && !running}
                                    />
                                    <StopWatchButton
                                        label="Start"
                                        onPress={startStopwatch}
                                        buttonStyle={styles.startButton}
                                        disabled={false}
                                    />
                                </>
                            ) : (
                                <>
                                    <StopWatchButton
                                        label="Reset"
                                        onPress={resetStopwatch}
                                        buttonStyle={styles.resetButton}
                                        disabled={false}
                                    />
                                    <StopWatchButton
                                        label="Resume"
                                        onPress={resumeStopwatch}
                                        buttonStyle={styles.resumeButton}
                                        disabled={false}
                                    />
                                </>
                            )}
                        </>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({ 
    // Style for the main container
    screen: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: 'black',
    }, 
    container: {
        width: '80%',
        flex: 1, 
        justifyContent: 'space-between', 
        alignItems: 'center',
    }, 
    // Style for displaying the stopwatch time
    timeText: { 
        fontSize: 50, 
        color: "white",
        marginTop: "50%",
    }, 
    // Style for the container holding the laps
    lapContainer: {
        flex: 1,  
        width: '100%',
        marginTop: 20,
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    // Styles for the lap entries and headers
    lapHeader: {
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "space-between"
    },
    lapColumnHeader: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    lapEntry: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    lapIndex: {
        color: 'white',
        fontSize: 20,
        textAlign: 'left',
    },
    lapTime: {
        color: 'white',
        fontSize: 20,
        textAlign: 'right',
        flex: 1,
    },
    // Styles for the button container and individual buttons
    buttonContainer: { 
        flexDirection: 'row',
        justifyContent: 'space-around', 
        width: '100%', 
        marginBottom: 50,
    }, 
    startButton: { 
        backgroundColor: '#e39024', 
        marginRight: 10, 
    }, 
    resetButton: { 
        backgroundColor: '#333231', 
        marginRight: 10, 
    }, 
    stopButton: { 
        backgroundColor: '#e74c3c', 
    }, 
    resumeButton: { 
        backgroundColor: '#e39024', 
    }, 
    lapButton: { 
        backgroundColor: '#333231', 
    },
}); 

