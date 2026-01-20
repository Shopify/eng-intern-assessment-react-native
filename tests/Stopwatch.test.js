import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import Stopwatch from "../src/Stopwatch";

describe("Stopwatch", () => {
  test("renders initial state correctly", () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);

    expect(getByText("00:00:00")).toBeTruthy();
    expect(queryByTestId("lap-list")).toBeNull();
  });

  test("starts and stops the stopwatch", async () => {
    const { getByText, queryByText } = render(<Stopwatch />);

    await act(() => {
      fireEvent.press(getByText("Start"));
    });

    expect(queryByText(/(\d{2}:){2}\d{2}/)).toBeTruthy();

    await act(() => {
      fireEvent.press(getByText("Stop"));
    });
    expect(getByText("Resume")).toBeTruthy();
  });

  test("pauses and resumes the stopwatch", async () => {
    const { getByText } = render(<Stopwatch />);

    await act(async () => {
      fireEvent.press(getByText("Start"));
      await new Promise((r) => setTimeout(r, 100));
      fireEvent.press(getByText("Stop"));
      const pausedTime = await getByText(/(\d{2}:){2}\d{2}/).props.children;
      fireEvent.press(getByText("Resume"));
      await new Promise((r) => setTimeout(r, 100));
      const resumedTime = await getByText(/(\d{2}:){2}\d{2}/).props.children;
      expect(resumedTime).not.toBe(pausedTime);
    });
  });

  test("records and displays lap times", async () => {
    const { getByText, getByTestId, getAllByTestId } = render(<Stopwatch />);

    await act(async () => {
      fireEvent.press(getByText("Start"));
      await new Promise((r) => setTimeout(r, 100));
      fireEvent.press(getByText("Laps"));
      expect(getByTestId("lap-list")).toBeDefined();
      const allLapText = getAllByTestId("lap-text");
      expect(allLapText[0].props.children).toMatch(/Lap \d : (\d{2}:){2}\d{2}/);
    });

    await act(() => {
      fireEvent.press(getByText("Laps"));
    });
    const allLapText = getAllByTestId("lap-text");
    expect(allLapText.length).toBe(2);
  });

  test("resets the stopwatch", async () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);

    await act(async () => {
      fireEvent.press(getByText("Start"));
      await new Promise((r) => setTimeout(r, 100));
      fireEvent.press(getByText("Laps"));
      await new Promise((r) => setTimeout(r, 100));
      fireEvent.press(getByText("Reset"));
      expect(getByText("00:00:00")).toBeTruthy();
      expect(queryByTestId("lap-list")).toBeNull();
    });
  });
});
