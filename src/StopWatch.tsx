import { StyleSheet, Text, View } from "react-native";
import { convertMillisToClockTimeString } from "../util/TimeConverter";

export default function StopWatch(props: Readonly<StopWatchProps>) {
    return (
        <View style={styles.mainClock}>
            <Text>{convertMillisToClockTimeString(props.milliseconds)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    mainClock: {
        flex: 2,
        alignItems: 'center', // Center items horizontally
        justifyContent: 'center',
    },
});

type StopWatchProps = {
    milliseconds: number;
};

