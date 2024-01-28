import {FlatList, StyleSheet, Text, View} from 'react-native';
import StopWatchButton from "./StopWatchButton";
import {useState} from "react";
import Formatted from "./Formated";

/* Stopwatch is running when true */
let state: boolean = false;

{/* Create our interface for our lap, using JSON for simplicity */}
interface Lap {
    lap: number,
    time: number
}

export default function StopWatch() {
    const [lapNumber, setLapNumber] = useState<number>(1);
    const [lapData, setLapData] = useState<Lap[]>([]);

    const [initialTime, setInitialTime] = useState(0);
    const [finalTime, setFinalTime] = useState(0);
    const [stoppedAt, setStoppedAt] = useState(0);


    const newLap = () => {

        let lap: Lap =
            {
                lap: lapNumber,
                time: finalTime - initialTime
            }

        lapData.push(lap);
        setLapNumber(lapNumber+1);

    }

    const onStart = () => {
        state = true;

        let currentTime = new Date().getTime();

        setInitialTime(currentTime - stoppedAt);
        setFinalTime(currentTime);
        setStoppedAt(0);


        {/* Create the millisecond animation. This is only an effect, actual time calculation is made through system time difference */}
        let timer = setInterval(() => {
            if(!state){
                clearInterval(timer);
                return;
            }

            setFinalTime(new Date().getTime());
        }, 30);
    }

    const reset = () => {

        setLapNumber(1);
        setLapData([]);

        setInitialTime(0);
        setFinalTime(0);
        setStoppedAt(0);

    }

    const stop = () => {
        state = false
        setStoppedAt(finalTime - initialTime);
    }

    /* Lap render function for the FlatList*/
    const renderLap = ({item} : { item: Lap }) => {
        return(
            <View style={styles.lapRow} key={item.lap}>
                <Text>{item.lap}</Text>
                <Formatted style={{fontSize: 15, marginLeft: 'auto', marginRight: '15%'}} time={item.time} />
            </View>
        )
    }

  return (
      <>
        <View style={styles.container}>
          <Formatted style={{fontSize: 30, fontWeight: "bold"}} time={finalTime - initialTime}/>
        </View>


          {/* Render our buttons with callbacks  */}
        <StopWatchButton onStop={() => stop()} onStart={() => onStart()} onReset={() => reset()} onLap={() => newLap()}/>

          {    /* Only render our laps if the laps array length is > 1*/
              lapData.length !== 0 ?
                  <>
                      <View style={styles.lapContainer}>
                          <Text style={styles.lapText}>Lap Number</Text>
                          <Text style={styles.lapTime}>Time</Text>
                      </View>

                      {/* Render our laps in a FlatList rather than a ScrollView to reduce computation power*/}
                      <FlatList style={{height: "30%"}} data={lapData} renderItem={renderLap}/>
                  </>
                  :
                  null
          }
      </>
  );
}


const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: "20%"
  },
  timer: {
    fontWeight: "bold",
    fontSize: 50
  },
    lapContainer: {
      width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 40,
        flexDirection: "row",
        columnGap: 150
    },
    lapText: {
      fontSize: 20,
        fontWeight: "bold"
    },
    lapTime: {
        fontSize: 20,
        fontWeight: "bold",
    },
    lapRow: {
      flexDirection: "row",
        marginTop: 14,
        marginLeft: 20
    },

});