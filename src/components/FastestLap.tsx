import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/styles';

interface LapProps {
    lapTime: string;
    index: number;
}

const FastestLap: React.FC<LapProps> = ({ lapTime, index }) => {
    return (
        <View style={styles.lapContainer}>
            <Text style={styles.lapNumber}>Lap {index}</Text>
            <Text style={[styles.lapTime, styles.fastestLap]}>{lapTime}</Text>
        </View>
    );
};

export default FastestLap;