import React from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';
import LapListItem from './LapListItem';
import Box from './Box';
import Text from './Text';
type LapListProps = {
    laptimes: Array<number>
}

export default function LapList({laptimes}: LapListProps){


    return (
        <ScrollView>
            {laptimes.map((laptime, index) => 
                <LapListItem laptime={laptime} lapNum={laptimes.length - index} key={index}></LapListItem>
            )}
        </ScrollView>
    );
}