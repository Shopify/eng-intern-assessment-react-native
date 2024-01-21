import React from "react";
import { act, render, fireEvent } from "@testing-library/react-native";
import Stopwatch from "../src/Stopwatch";

jest.useFakeTimers();

describe("Stopwatch", () => {
  test("renders initial state correctly", () => {
    const { getByText, queryAllByTestId } = render(<Stopwatch />);

    // Check that the timer display shows "00:00:00" initially
    expect(getByText("00:00:00")).toBeTruthy();

    // Query all lap items by their test ID
    const lapItems = queryAllByTestId(/lap-item-.+/);

    // The length of lapItems array gives the number of laps
    expect(lapItems.length).toBe(0); // Expecting no laps initially
  });

  test("starts and stops the stopwatch", () => {
    const { getByText, getByTestId, queryByText } = render(<Stopwatch />);

    const timerDisplay = getByTestId("timer-display");

    // Check that the timer display shows "00:00:00" initially
    expect(getByText("00:00:00")).toBeTruthy();

    // Start the stopwatch
    let startButton = getByTestId("start-btn");
    act(() => {
      if (startButton) {
        fireEvent.press(startButton);
      }
    });
    // Allow 2 second to pass
    act(() => {
      jest.advanceTimersByTime(2000); // Advance time by 1 seconds
    });

    // Assert that time has advanced
    expect(queryByText("00:00:00")).toBeNull(); // Indicates time has moved passed 00:00:00

    // Stop the stopwatch
    let stopButton = getByTestId("stop-btn");
    act(() => {
      if (stopButton) {
        fireEvent.press(stopButton);
      }
    });
    // Allow 2 second to pass
    act(() => {
      jest.advanceTimersByTime(2000); // Advance time by 2 seconds
    });

    // Collect time after pause
    const pausedTime = timerDisplay.props.children;

    // Allow 2 seconds to pass
    act(() => {
      jest.advanceTimersByTime(2000); // Advance time by 1 seconds
    });

    // Collect the time after 2 seconds have passed
    const currentTime = timerDisplay.props.children;

    // Assert that the timer is no longer advancing (i.e, paused timee === current time)
    expect(pausedTime).toBe(currentTime);
  });

  test("pauses and resumes the stopwatch", () => {
    const { getByText, getByTestId, queryByText } = render(<Stopwatch />);

    // Check if the timer display is present initially
    const timerDisplay = getByTestId("timer-display");

    // Check that the timer display shows "00:00:00" initially
    expect(getByText("00:00:00")).toBeTruthy();

    // Run stopwatch for 2 seconds
    let startButton = getByTestId("start-btn");
    act(() => {
      if (startButton) {
        fireEvent.press(startButton);
      }
    });
    // Allow 2 second to pass
    act(() => {
      jest.advanceTimersByTime(2000); // Advance time by 2 seconds
    });

    // Stop the stopwatch for 2 seconds
    let stopButton = getByTestId("stop-btn");
    act(() => {
      if (stopButton) {
        fireEvent.press(stopButton);
      }
    });
    act(() => {
      jest.advanceTimersByTime(2000); // Advance time by 2 seconds
    });

    // Collect paused time
    const pausedTime = timerDisplay.props.children;

    // Assert that time has advanced
    expect(queryByText("00:00:00")).toBeNull(); // Indicates time has moved passed 00:00:00

    // Resume the clock for another 2 seconds
    act(() => {
      if (startButton) {
        fireEvent.press(startButton);
      }
    });
    act(() => {
      jest.advanceTimersByTime(2000); // Advance time by 2 seconds
    });

    // Collect the Final Time
    const finalTime = timerDisplay.props.children;

    // Assert Final time !== Pasued Time
    expect(finalTime).not.toBe(pausedTime);
  });

  test("records and displays lap times", () => {
    const { getByTestId, queryAllByTestId } = render(<Stopwatch />);

    // Start the stopwatch
    let startButton = getByTestId("start-btn");
    act(() => {
      if (startButton) {
        fireEvent.press(startButton);
      }
    });
    // Allow 1 second to pass
    act(() => {
      jest.advanceTimersByTime(1000); // Advance time by 1 second
    });

    // Record the first lap
    let lapButton = getByTestId("lap-btn");
    act(() => {
      if (lapButton) {
        fireEvent.press(lapButton);
      }
    });
    // Allow 1 second to pass
    act(() => {
      jest.advanceTimersByTime(1000); // Advance time by 1 second
    });

    // Check that the first lap is recorded
    let lapItems = queryAllByTestId(/lap-item-.+/);
    expect(lapItems.length).toBe(1);

    // Extract the time text from the first lap item and check it against the regex
    const lapTimeText = lapItems[0].props.children[1].props.children;
    expect(lapTimeText).toEqual(expect.stringMatching(/(\d{2}:){2}\d{2}/));

    // Record the second lap
    act(() => {
      if (lapButton) {
        fireEvent.press(lapButton);
      }
    });
    // Allow 1 second to pass
    act(() => {
      jest.advanceTimersByTime(1000); // Advance time by 1 second
    });

    // Check that the second lap is recorded
    lapItems = queryAllByTestId(/lap-item-.+/);
    expect(lapItems.length).toBe(2);
  });

  test("resets the stopwatch", () => {
    const { getByText, getByTestId, queryAllByTestId } = render(<Stopwatch />);

    // Check that the timer display shows "00:00:00" initially
    expect(getByText("00:00:00")).toBeTruthy();

    // Start the stopwatch
    let startButton = getByTestId("start-btn");
    act(() => {
      if (startButton) {
        fireEvent.press(startButton);
      }
    });
    // Allow 1 second to pass
    act(() => {
      jest.advanceTimersByTime(1000); // Advance time by 1 second
    });

    // Record lap
    let lapButton = getByTestId("lap-btn");
    act(() => {
      if (lapButton) {
        fireEvent.press(lapButton);
      }
    });
    // Allow 1 second to pass
    act(() => {
      jest.advanceTimersByTime(1000); // Advance time by 1 second
    });

    let stopButton = getByTestId("stop-btn");
    act(() => {
      if (stopButton) {
        fireEvent.press(stopButton);
      }
    });

    // Reset
    let resetButton = getByTestId("reset-btn");
    act(() => {
      if (resetButton) {
        fireEvent.press(resetButton);
      }
    });

    // Check that the timer display shows "00:00:00" after reset
    expect(getByText("00:00:00")).toBeTruthy();

    // Check that there are no laps recorded (lap list is empty)
    const lapItems = queryAllByTestId(/lap-item-.+/);
    expect(lapItems.length).toBe(0);
  });
});

afterAll(() => {
  jest.useRealTimers();
});
