import React from 'react';
import {
  ScrollView,
} from 'react-native';
import LapListItem from './LapListItem';


type LapListProps = {
    laptimes: Array<number>
}

export default function LapList({laptimes}: LapListProps){


    return (
        <ScrollView testID='lap-list'>
            {laptimes.map((laptime, index) => 
                <LapListItem laptime={laptime} lapNum={laptimes.length - index} key={index}></LapListItem>
            )}
        </ScrollView>
    );
}