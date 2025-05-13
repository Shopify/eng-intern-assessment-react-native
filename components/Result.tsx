import React from "react";
import { StyleSheet, Text, ScrollView, View } from "react-native";
import { displayTime } from "./util";

// prints the lap time

interface MyComponentProps {
  results: number[];
}

const styles = StyleSheet.create({
  resultItem: {
    flexDirection : 'row',
    justifyContent: 'space-between',
    alignContent : 'center',
    alignItems: "center",
    borderBottomWidth : 1, 
    borderColor :'#313131',
    height: 50,
    paddingHorizontal: 15
  },
  // resultItemText : 
});

const Result: React.FC<MyComponentProps> = ({ results }) => {
  return (
    <ScrollView>
      <View style={styles.resultItem} />
      {results.map((item, index) => (
        <View  key={index} style = {styles.resultItem}>
            <Text style= {{ color : "#fff"}}>
                Lap {results.length - index }
            </Text>

            <Text style= {{ color : "#fff"}}>
                {displayTime(item)}
            </Text>
            
        </View>
        
      ))}
    </ScrollView>
  );
};

export default React.memo(Result); // react memo is used to cache the last rendered result so the values are reused in a new render 