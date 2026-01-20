import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import Stopwatch from '../src/components/StopWatch';

describe('Stopwatch', () => {
  test('renders initial state correctly', () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);

    expect(getByText('00:00:00')).toBeTruthy();
    expect(queryByTestId('lap-list')).toBeNull();
  });

  test('starts and stops the stopwatch', async () => {
    // Using fake timers as the StopWatch code uses setInterval
    // https://testing-library.com/docs/using-fake-timers/
    jest.useFakeTimers();
    const { getByText, queryByText } = render(<Stopwatch />);

    act(() => fireEvent.press(getByText('Start')));
    // Advance timers by 100 milliseconds to simulate time passing
    await act(() => jest.advanceTimersByTime(100));
    expect(queryByText(/(\d{2}:){2}\d{2}/)).toBeTruthy();

    act(() => fireEvent.press(getByText('Stop')));
    expect(queryByText(/(\d{2}:){2}\d{2}/)).not.toBe('00:00:00');
    // Reset timers to real timers
    jest.useRealTimers();
  });

  test('pauses and resumes the stopwatch', async () => {
    jest.useFakeTimers();
    const { getByText } = render(<Stopwatch />);
    let pausedTime;

    act(() => fireEvent.press(getByText('Start')));
    await act(() => jest.advanceTimersByTime(100));

    act(() => fireEvent.press(getByText('Pause')));
    pausedTime = getByText(/(\d{2}:){2}\d{2}/).props.children;

    act(() => fireEvent.press(getByText('Resume')));
    await act(() => jest.advanceTimersByTime(100));
    expect(getByText(/(\d{2}:){2}\d{2}/).props.children).not.toBe(pausedTime);
    jest.useRealTimers();
  });

  test('records and displays lap times', async () => {
    jest.useFakeTimers();
    const { getByText, getAllByTestId } = render(<Stopwatch />);

    act(() => fireEvent.press(getByText('Start')));
    await act(() => jest.advanceTimersByTime(100));
    act(() => fireEvent.press(getByText('Lap')));
    expect(getAllByTestId('lap-item').length).toBe(1);

    await act(() => jest.advanceTimersByTime(100));
    act(() => fireEvent.press(getByText('Lap')));
    expect(getAllByTestId('lap-item').length).toBe(2);
    jest.useRealTimers();
  });

  test('resets the stopwatch', async () => {
    jest.useFakeTimers();
    const { getByText, queryByTestId } = render(<Stopwatch />);

    act(() => fireEvent.press(getByText('Start')));
    await act(() => jest.advanceTimersByTime(100));
    act(() => fireEvent.press(getByText('Lap')));
    await act(() => jest.advanceTimersByTime(200));
    act(() => fireEvent.press(getByText('Reset')));

    expect(getByText('00:00:00')).toBeTruthy();
    expect(queryByTestId('lap-list')).toBeNull();
    jest.useRealTimers();
  });
});
