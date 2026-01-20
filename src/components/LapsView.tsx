import { ScrollView, StyleSheet, Text, View } from "react-native";
import { swState } from "../utils/StopWatchCounterState";
import { useEffect, useState } from "react";
import { theme } from "../data/theme";

// we are unable to set the state of laps outside of this file
// a workaround is to define a function that is set to the state setter
// and can be called from outside
let updateLapsExternal: ((laps: string[]) => void) | undefined;

/**
 * LapsView
 * @author Vivian Dai
 * List of laps taken by the stopwatch
 */
export default function LapsView() {
    const [laps, setLaps] = useState<string[]>(swState.getLaps());

    useEffect(() => {
        updateLapsExternal = setLaps;
    })

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Laps</Text>
            <ScrollView testID="lap-list">
            {laps.map((lap, index) => (
                <Text style={styles.text} key={index}>{lap}</Text>
            ))}
            </ScrollView>
        </View>
    );
}

export function updateLaps() {
    if (updateLapsExternal) {
        updateLapsExternal(swState.getLaps());
    } else {
        console.error("updateLapsExternal is undefined");
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        textAlign: 'center',
        color: theme.text,
    },
    text: {
        textAlign: 'center',
        color: theme.text,
    },
    container: {
        margin: 10,
        flex: 1,
        height: 200,
        maxHeight: 200,
    },
});
