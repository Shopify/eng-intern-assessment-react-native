import {ScrollView, StyleSheet, Text, View} from 'react-native';
import StopWatchButton from "./StopWatchButton";
import {useState} from "react";

let state: boolean = false;

interface Lap {
    lap: number,
    time: string
}

export default function StopWatch() {
    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);
    const [hours, setHours] = useState<number>(0);
    const [lapNumber, setLapNumber] = useState<number>(1);
    const [lapData, setLapData] = useState<Lap[]>([]);


    const format = () => {
        return String(hours).padStart(2, "0") + ":" + String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
    }

    const newLap = () => {

        let lap: Lap =
            {
                lap: lapNumber,
                time: format()
            }

        lapData.push(lap);
        setLapNumber(lapNumber+1);

    }

    const onStart = () => {
        state = true;
        let m: number = minutes;
        let s: number = seconds;
        let h: number = hours;

        let timer: number = setInterval(() => {
            if(!state){
                clearInterval(timer);
                return;
            }

            s+=1;

            if(s === 60){
                s = 0;
                m+=1;

                if(m === 60){
                    m = 0;
                    h+=1;
                    setHours(h);
                }
            }

            setSeconds(s);
            setMinutes(m);

        }, 1000)
    }

    const reset = () => {
        setMinutes(0);
        setHours(0);
        setSeconds(0);
        setLapNumber(1);
        setLapData([]);
    }


  return (
      <>
        <View style={styles.container}>
          <Text style={styles.timer}>{String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}</Text>
        </View>


        <StopWatchButton onStop={() => state = false} onStart={() => onStart()} onReset={() => reset()} onLap={() => newLap()}/>


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
                                      <View key={entry.lap}>
                                          <Text>{entry.time}</Text>
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

    }
});