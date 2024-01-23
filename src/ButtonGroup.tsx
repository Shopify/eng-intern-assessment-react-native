import { View } from "react-native";
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
        <View>
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

export default ButtonGroup;