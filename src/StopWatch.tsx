import { StyleSheet, Text, View } from "react-native";
import { convertMillisToClockTimeString } from "../util/TimeConverter";

export default function StopWatch(props: Readonly<StopWatchProps>) {
    return (
        <View style={styles.mainClockContainer}>
            <Text style={styles.clockText}>{convertMillisToClockTimeString(props.milliseconds)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    mainClockContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    clockText: {
        fontSize: 48,
        fontVariant: ['tabular-nums'],
        color: "#fca311"
    },
});

type StopWatchProps = {
    milliseconds: number;
};

