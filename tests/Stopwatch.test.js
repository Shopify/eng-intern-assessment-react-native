import React from "react";
import { render, fireEvent, within } from "@testing-library/react-native";
import Stopwatch from "../src/Stopwatch";

describe("Stopwatch Component", () => {
  // Tests the initial state of the stopwatch.
  test("initial state is rendered correctly", () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);
    expect(getByText("00:00:00")).toBeTruthy(); // Checks if initial time is 00:00:00
    expect(queryByTestId("lap-list")).toBeNull(); // Ensures no laps are listed initially
  });

  // Tests the start and stop functionality of the stopwatch.
  test("starts and stops the stopwatch", () => {
    const { getByText, queryByText } = render(<Stopwatch />);
    fireEvent.press(getByText("Start"));
    expect(queryByText(/(\d{2}:){2}\d{2}/)).toBeTruthy(); // Verifies the timer starts
    fireEvent.press(getByText("Stop"));
    expect(getByText("00:00:00")).toBeTruthy(); // Confirms the timer resets to 00:00:00
  });

  // Tests the pause and resume functionality of the stopwatch.
  test("pauses and resumes the stopwatch", () => {
    const { getByText } = render(<Stopwatch />);
    fireEvent.press(getByText("Start"));
    fireEvent.press(getByText("Pause"));
    const pausedTime = getByText(/(\d{2}:){2}\d{2}/).props.children;
    fireEvent.press(getByText("Resume"));
    const resumedTime = getByText(/(\d{2}:){2}\d{2}/).props.children;
    expect(resumedTime).not.toBe(pausedTime); // Ensures the time changes after resuming
  });

  // Tests the lap recording functionality of the stopwatch.
  test("records and displays lap times", () => {
    const { getByText, getByTestId } = render(<Stopwatch />);
    fireEvent.press(getByText("Start"));
    fireEvent.press(getByText("Lap"));
    const lapList = getByTestId("lap-list");
    expect(lapList).toBeDefined(); // Confirms the lap list is present
    fireEvent.press(getByText("Lap"));
    const { queryAllByText: queryAllByTextWithinLapList } = within(lapList);
    const matchingElements = queryAllByTextWithinLapList(/(\d{2}:){2}\d{2}/);
    expect(matchingElements.length).toBe(2); // Verifies two laps are recorded
  });

  // Tests the reset functionality of the stopwatch.
  test("resets the stopwatch", () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);
    fireEvent.press(getByText("Start"));
    fireEvent.press(getByText("Lap"));
    fireEvent.press(getByText("Reset"));
    expect(getByText("00:00:00")).toBeTruthy(); // Confirms the timer resets to 00:00:00
    expect(queryByTestId("lap-list")).toBeNull(); // Ensures no laps are listed after reset
  });
});
