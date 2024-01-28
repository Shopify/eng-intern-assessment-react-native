import { ScrollView, StyleSheet, Text, View } from "react-native";
import { swState } from "../utils/StopWatchCounterState";
import { useEffect, useState } from "react";
import { theme } from "../data/theme";

let updateLapsExternal: ((laps: string[]) => void) | undefined;

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
