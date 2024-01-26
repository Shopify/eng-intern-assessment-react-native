import {Animated, StyleSheet, View} from "react-native";
import Lap, {LapProps} from "./Lap";
import React from "react";
import FlatList = Animated.FlatList;
import LapSeparator from "./LapSeparator";

interface LapGroupProps {
    laps: LapProps[]
}

export default function LapGroup({laps}: LapGroupProps) {
    return (
        <FlatList
            ItemSeparatorComponent={LapSeparator}
            data={laps}
            renderItem={({item}) => Lap(item)}
            keyExtractor={item => item.title}
            style={styles.container}
            ListHeaderComponent={LapSeparator}
            ListFooterComponent={LapSeparator}
        />
    )

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 10
    },

    text: {
        fontSize: 16,
    },
})