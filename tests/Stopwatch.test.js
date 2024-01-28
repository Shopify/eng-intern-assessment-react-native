import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Stopwatch from '../src/Stopwatch';

describe('Stopwatch', () => {
  test('renders initial state correctly', () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);
    
    expect(getByText('00:00:00')).toBeTruthy();
    expect(queryByTestId('lap-list')).toBeNull();
  });

  test('starts and stops the stopwatch', () => {
    const { getByText, queryByText, queryByTestId } = render(<Stopwatch />);

    const startTime = queryByTestId("timer");

    fireEvent.press(getByText('Start'));
    expect(startTime.children).toBeTruthy();

    fireEvent.press(getByText('Stop'));
    const endTime = queryByTestId("timer");
    expect(endTime.children).not.toBe(startTime.children);
  });

  test('pauses and resumes the stopwatch', () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);
    
    fireEvent.press(getByText('Start'));
    fireEvent.press(getByText('Stop'));
    const pausedTime = queryByTestId("timer").children;

    fireEvent.press(getByText('Start'));
    expect(queryByTestId("timer").children).not.toBe(pausedTime);
  });

  test('records and displays lap times', () => {
    const { getByText, queryAllByTestId } = render(<Stopwatch />);
    
    fireEvent.press(getByText('Start'));
    fireEvent.press(getByText('Lap'));

    fireEvent.press(getByText('Lap'));

    expect(queryAllByTestId('lap-list').children.length).toBe(2);
  });

  test('resets the stopwatch', () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);
    
    fireEvent.press(getByText('Start'));
    fireEvent.press(getByText('Lap'));
    fireEvent.press(getByText('Stop'));
    fireEvent.press(getByText('Reset'));

    expect(getByText('00:00:00')).toBeTruthy();
    expect(queryByTestId('lap-list')).toBeNull();
  });
});
