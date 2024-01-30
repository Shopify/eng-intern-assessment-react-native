// const  padToTwo = (number : number) => (number <= 9  ? 0${number} : ${number}) // a function that pads my number variable to a double digit e.g. 5= 05 , 12 = 12 

// // function to display the time 
// export const displayTime = (centiseconds: number) => {

//     let minutes = 0
//     let seconds = 0 

//     if (centiseconds < 0 ){ // when the stopwatach get to , or exceeds zero, centiseconds is zero 
//         centiseconds = 0 
//     }

//     if (centiseconds  < 100 ){
//         return  `00:00:${padToTwo(centiseconds)}` // this is displayed until 99 centiseconds , because at 100 (it becomes a second)
//     }

//     let  remainCentiseconds  = centiseconds % 100  // this is the remaining centiseconds after calulating a second after 100 centiseconds
//     seconds = (centiseconds - remainCentiseconds ) / 100 // a secomd is calculated after from the multiple of hundred (in this case , 1) gotten after removing the remaining centiseconds

//     if(seconds < 60 ){
//         return  00:${padToTwo(seconds)}:${padToTwo(remainCentiseconds)}  //this is displayed when the second are more than zero and less than 60 (which makes a minute)
//     }


//     let remainSeconds  = seconds % 60  // this is the remaining seconds after calulating a second after 100 centiseconds
//     minutes = (seconds - remainSeconds ) / 60 // a minute is calculated after from the multiple of sixty (in this case , 1) gotten after removing the remaining centiseconds

//     return ${padToTwo(minutes)}:${padToTwo(remainSeconds)}: ${padToTwo(remainCentiseconds)}  // this occurs when the minutes start counting 

// };