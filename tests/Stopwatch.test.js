import React from "react";
import { render, fireEvent, within } from "@testing-library/react-native";
import Stopwatch from "../src/Stopwatch";

describe("Stopwatch", () => {
  test("renders initial state correctly", () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);

    expect(getByText("00:00:00")).toBeTruthy();
    expect(queryByTestId("lap-list")).toBeNull();
  });

  test("starts and stops the stopwatch", () => {
    const { getByText, queryByText } = render(<Stopwatch />);

    fireEvent.press(getByText("Start"));
    expect(queryByText(/(\d{2}:){2}\d{2}/)).toBeTruthy();

    fireEvent.press(getByText("Stop"));
    expect(queryByText(/(\d{2}:){2}\d{2}/)).toBeNull();
  });

  test("pauses and resumes the stopwatch", async () => {
    let requestAnimationMock = () => {};
    jest
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation((cb) => (requestAnimationMock = cb));

    const { getByText } = render(<Stopwatch />);

    fireEvent.press(getByText("Start"));
    fireEvent.press(getByText("Pause"));
    const pausedTime = getByText(/(\d{2}:){2}\d{2}/).props.children;

    fireEvent.press(getByText("Resume"));

    // Mock two animation frames if needed
    if (requestAnimationMock) {
      requestAnimationMock(0);
    }
    if (requestAnimationMock) {
      requestAnimationMock(1000);
    }

    expect(getByText(/(\d{2}:){2}\d{2}/).props.children).not.toBe(pausedTime);
  });

  test("records and displays lap times", () => {
    const { getByText, getByTestId } = render(<Stopwatch />);

    fireEvent.press(getByText("Start"));
    fireEvent.press(getByText("Lap"));
    expect(
      within(getByTestId("lap-list")).getByText(/(\d{2}:){2}\d{2}/),
    ).toBeTruthy();

    fireEvent.press(getByText("Lap"));
    expect(getByTestId("lap-list").children.length).toBe(2);
  });

  test("resets the stopwatch", () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);

    fireEvent.press(getByText("Start"));
    fireEvent.press(getByText("Lap"));
    fireEvent.press(getByText("Reset"));

    expect(getByText("00:00:00")).toBeTruthy();
    expect(queryByTestId("lap-list")).toBeNull();
  });
});
