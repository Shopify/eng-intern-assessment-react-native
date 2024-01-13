import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import StopwatchButton from './StopWatchButton'; 

// Utility function to format time
const formatTime = (elapsedTime: number) => {
  const hours = Math.floor(elapsedTime / 3600);
  const minutes = Math.floor((elapsedTime % 3600) / 60);
  const seconds = elapsedTime % 60;

  return [hours, minutes, seconds].map(val => val < 10 ? `0${val}` : val).join(':');
};