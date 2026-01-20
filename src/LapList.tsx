import React from 'react';
import {
  ScrollView,
} from 'react-native';
import LapListItem from './LapListItem';


type LapListProps = {
    laptimes: Array<number>
}

// Used as a wrapper to the testing renderer to support the Restyled theme.
// if not used components will not be able to resolve the styling values, such as colors
export default function LapList({laptimes}: LapListProps){

    return (
        <ScrollView testID='lap-list'>
            {laptimes.map((laptime, index) => 
                <LapListItem laptime={laptime} lapNum={laptimes.length - index} key={index}/>
            )}
        </ScrollView>
    );
}