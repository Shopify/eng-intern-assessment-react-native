import React from 'react';
import { formatTimeStr } from './utils/timeUtils';
import Text from './Text';
import Box from './Box';

type LapListItemProps = {
    laptime: number,
    lapNum: number,
}

// Component to display a lap number and accociated laptime for use in a ScrollView or list.
export default function LapListItem ({laptime, lapNum}: LapListItemProps) {
    return (
        <Box 
            backgroundColor='mainBackground' 
            flex={1}
            flexDirection='row'
            justifyContent='space-between'
            paddingVertical='s'
            paddingHorizontal='xl'
            borderTopWidth={2}
            borderColor='listBorder'
            >
            <Text>Lap {lapNum}</Text>
            <Text>{formatTimeStr(laptime)}</Text>
        </Box>
    );
}