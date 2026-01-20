import React from 'react';
import { render, fireEvent, act, waitFor, within } from '@testing-library/react-native'
import App from '../App';

describe('Stopwatch', () => {
  let getByText, queryByText, getByTestId, queryByTestId;

  // Common setup before each test
  beforeEach(async () => {
    jest.useFakeTimers();
    const utils = render(<App />);
    await waitFor(() => {
      getByText = utils.getByText;
      queryByText = utils.queryByText;
      getByTestId = utils.getByTestId;
      getAllByText = utils.getAllByText;
      queryByTestId = utils.queryByTestId;
    });
  });

  test('renders initial state correctly', () => {
    expect(getByText('00:00:00')).toBeTruthy();
    expect(queryByTestId('lap-list')).toBeNull();
  });

  test('starts and stops the stopwatch', () => {
    fireEvent.press(getByText('Start'));
    expect(queryByText(/(\d{2}:){2}\d{2}/)).toBeTruthy();

    fireEvent.press(getByText('Stop'));
    expect(queryByText(/(\d{2}:){2}\d{2}/)).toBeNull();
  });
  
  test('pauses and resumes the stopwatch', () => {
    fireEvent.press(getByText('Start'));

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    fireEvent.press(getByText('Pause'));
    const pausedTime = getByText(/(\d{2}:){2}\d{2}/).children[0];

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    fireEvent.press(getByText('Resume'));

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const resumedTime = getByText(/(\d{2}:){2}\d{2}/).children[0];
    expect(resumedTime).not.toEqual(pausedTime);
  });

  test('records and displays lap times', () => {
    fireEvent.press(getByText('Start'));
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    fireEvent.press(getByText('Lap'));
    const lapList = getByTestId('lap-list');
    let scopedQueries = within(lapList);
    const firstLapTime = scopedQueries.getAllByText(/(\d{2}:){2}\d{2}/)[0].children[0];
    expect(firstLapTime).toBe("00:01:00");

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    fireEvent.press(getByText('Lap'));
    const secondLapTime = scopedQueries.getAllByText(/(\d{2}:){2}\d{2}/)[1].children[0];
    expect(secondLapTime).toBe("00:03:00");
  });

  test('resets the stopwatch', () => {
    fireEvent.press(getByText('Start'));
    fireEvent.press(getByText('Lap'));
    fireEvent.press(getByText('Reset'));

    expect(getByText('00:00:00')).toBeTruthy();
    expect(queryByTestId('lap-list')).toBeNull();
  });
});
