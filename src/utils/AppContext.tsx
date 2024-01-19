import React from "react";

const AppContext = React.createContext({
  time: 0,
  setTime: (newTime: any) => {},
  laps: [],
  setLaps: (newLaps: any) => {},
});

export default AppContext;
