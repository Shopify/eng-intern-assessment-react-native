import * as React from 'react';
import {Appbar} from 'react-native-paper';





const titleStyles = {
  color:{
    color: '#fff',
  }
};
// Header of StopWatch Application
const MyHeader = () => {
  return (

    <Appbar.Header style = {{backgroundColor : 'black'}}>
        <Appbar.Content   testID='' title = "Stopwatch" titleStyle = {titleStyles.color}  />
    </Appbar.Header>
  )
}

export default MyHeader
