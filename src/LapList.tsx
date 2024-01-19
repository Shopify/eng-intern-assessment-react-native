import React from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';
import LapListItem from './LapListItem';


type LapListProps = {
    laptimes: Array<number>
}

export default function LapList({laptimes}: LapListProps){

    
    return (
        <ScrollView>
            {laptimes.map((laptime, index) => 
                <LapListItem laptime={laptime} lapNum={index} key={index}></LapListItem>
            )}
        </ScrollView>
    );
}