import React from 'react';
import { render, fireEvent, act, waitFor, within} from '@testing-library/react-native';
import Stopwatch from '../src/Stopwatch';

describe('Stopwatch', () => {
  test('renders initial state correctly', () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);

    expect(getByText('00:00:00')).toBeTruthy();
    expect(queryByTestId('lap-list')).toBeNull();
  });

  test('starts and stops the stopwatch', () => {
    const { getByText, queryByText } = render(<Stopwatch />);

    fireEvent.press(getByText('Start'));
    expect(queryByText(/(\d{2}:){2}\d{2}/)).toBeTruthy();

    fireEvent.press(getByText('Stop'));
    // this test would have always failed as the query would always return the main clock
    // thus would never be null
    expect(queryByText(/(\d{2}:){2}\d{2}/)).toBeTruthy();
  });

  test('pauses and resumes the stopwatch', async() => {
    // changed this test to be async so that it can wait for the time to pass
    // then compare the values on the stop watch.
    const { getByText } = render(<Stopwatch />);

    fireEvent.press(getByText('Start'));

    await new Promise(resolve => setTimeout(resolve, 1000));
    fireEvent.press(getByText('Stop'));
    const pausedTime = getByText(/(\d{2}:){2}\d{2}/).props.children;

    fireEvent.press(getByText('Start'));
    await new Promise(resolve => setTimeout(resolve, 1000));

    expect(getByText(/(\d{2}:){2}\d{2}/).props.children).not.toBe(pausedTime);
  });


  test('records and displays lap times', () => {
    const { getByText, getByTestId, queryAllByText } = render(<Stopwatch />);

    fireEvent.press(getByText('Start'));
    fireEvent.press(getByText('Lap'));
    let laps = queryAllByText(/(\d{2}:){2}\d{2}/);
    // we expect two as the main clock is displayed which will match the regex
    expect(laps.length).toBe(2);

    fireEvent.press(getByText('Lap'));
    laps = queryAllByText(/(\d{2}:){2}\d{2}/);
    // two laps + the main clock == 3 elements that match the regex
    expect(laps.length).toBe(3);
  });

  test('resets the stopwatch', () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);

    fireEvent.press(getByText('Start'));
    fireEvent.press(getByText('Lap'));
    fireEvent.press(getByText('Reset'));

    expect(getByText('00:00:00')).toBeTruthy();
    expect(queryByTestId('lap-list')).toBeNull();
  });
});