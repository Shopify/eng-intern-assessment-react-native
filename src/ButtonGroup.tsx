import { View, StyleSheet } from "react-native";
import StopWatchButton from "./StopWatchButton";

const ButtonGroup = ({
    isInitial, // Indicates that the stopwatch is in its initial state
    isRecording,
    onPressLap,
    onPressPause,
    onPressReset,
    onPressStart,
    onPressStop,
}: {
    isInitial: boolean,
    isRecording: boolean,
    onPressLap: () => void,
    onPressPause: () => void,
    onPressReset: () => void,
    onPressStart: () => void,
    onPressStop: () => void,
}) => {

    return (
        <View style={styles.container}>
            <StopWatchButton
                disabled={isRecording}
                onPress={onPressStart}
                text={isInitial ? "Start" : "Resume"}
            />
            <StopWatchButton
                disabled={!isRecording}
                onPress={onPressPause}
                text={"Pause"}
            />
            <StopWatchButton
                disabled={!isRecording}
                onPress={onPressStop}
                text={"Stop"}
            />
            <StopWatchButton
                onPress={onPressReset}
                text="Reset"
            />
            <StopWatchButton
                disabled={!isRecording}
                onPress={onPressLap}
                text="Lap"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        height: 250,
        justifyContent: "space-between",
    }
})

export default ButtonGroup;