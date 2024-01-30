import React, { useState, useRef, useCallback } from "react";
import { StyleSheet, SafeAreaView, Text, View, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";

import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setRunning] = useState<boolean>(false);
  const [results, setResults] = useState<number[]>([]);


  return ;
}
