import React from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';
import { formatTimeStr } from './utils/timeUtils';

type LapListItemProps = {
    laptime: number,
    lapNum: number,
}

export default function LapListItem ({laptime, lapNum}: LapListItemProps) {
    return (
        <View>
            <Text>{formatTimeStr(laptime)}</Text>
            <Text>{lapNum}</Text>
        </View>
    );
}