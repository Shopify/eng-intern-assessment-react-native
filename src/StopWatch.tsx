import {ScrollView, StyleSheet, Text, View} from 'react-native';
import StopWatchButton from "./StopWatchButton";
import {useState} from "react";
import Formatted from "./Formated";

let state: boolean = false;

interface Lap {
    lap: number,
    time: number
}

export default function StopWatch() {
    const [milliseconds, setMilliseconds] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(55);
    const [minutes, setMinutes] = useState<number>(0);
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
       /* let mm: number = minutes;
        let s: number = seconds;
        let m: number = minutes;

        let timer: number = setInterval(() => {
            if(!state){
                clearInterval(timer);
                return;
            }

            mm+=1;

            if(mm === 60){
                mm = 0;
                s+=1;
                setSeconds(s);

                if(s === 60){
                    s = 0;
                    m+=1;
                    setMinutes(m);
                }
            }


            setMilliseconds(mm);

        }, 1);*/

        let currentTime = new Date().getTime();

        setInitialTime(currentTime - stoppedAt);
        setFinalTime(currentTime);
        setStoppedAt(0);

        console.log(finalTime);

        let timer = setInterval(() => {
            if(!state){
                clearInterval(timer);
                return;
            }

            setFinalTime(new Date().getTime());
        }, 30);
    }

    const reset = () => {
        /*setMinutes(0);
        setMilliseconds(0);
        setSeconds(0);
        */

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


  return (
      <>
        <View style={styles.container}>
          <Formatted style={{fontSize: 30, fontWeight: "bold"}} time={finalTime - initialTime}/>
        </View>


        <StopWatchButton onStop={() => stop()} onStart={() => onStart()} onReset={() => reset()} onLap={() => newLap()}/>


          {
              lapData.length !== 0 ?
                  <>
                      <View style={styles.lapContainer}>
                          <Text style={styles.lapText}>Lap Number</Text>
                          <Text style={styles.lapTime}>Time</Text>
                      </View>
                      <ScrollView>
                          {
                              lapData.map((entry: Lap) => {
                                  return(
                                      <View style={styles.lapRow} key={entry.lap}>
                                          <Text>{entry.lap}</Text>
                                          <Formatted style={{fontSize: 15, marginLeft: 'auto', marginRight: '15%'}} time={entry.time} />
                                      </View>
                                  )
                              })
                          }
                      </ScrollView>
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