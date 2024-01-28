import {Animated, StyleSheet} from "react-native";
import Lap, {LapProps} from "./Lap";
import React from "react";
import LapSeparator from "./LapSeparator";
import FlatList = Animated.FlatList;

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
            testID={"lap-list"}
        />
    )

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 10,
    },

    text: {
        fontSize: 16,
    },
})