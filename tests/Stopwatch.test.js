import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import StopWatch from "../src/StopWatch";
import { formatTime } from "../src/utils/timeUtils";

describe("Stopwatch", () => {
	beforeEach(() => jest.useFakeTimers());
	afterEach(() => jest.useRealTimers());

	// Advances time and checks if the stopwatch displays the correct time
	const advanceTimeAndAssert = async (
		timeMs,
		expectedHr,
		expectedMin,
		expectedSec,
		expectedMs
	) => {
		const { getByTestId, getByText } = render(<StopWatch />);

		act(() => {
			fireEvent.press(getByText("Start"));
		});
		act(() => {
			jest.advanceTimersByTime(timeMs);
		});
		act(() => {
			fireEvent.press(getByText("Pause"));
		});

		const hrDisplay = getByTestId("hr-display").children[0];
		const minDisplay = getByTestId("min-display").children[0];
		const secDisplay = getByTestId("sec-display").children[0];
		const msDisplay = getByTestId("ms-display").children[0];

		expect(hrDisplay).toBe(expectedHr);
		expect(minDisplay).toBe(expectedMin);
		expect(secDisplay).toBe(expectedSec);
		expect(msDisplay).toBe(expectedMs);
	};

	// Checks if the stopwatch displays all zeros at the start
	test("displays all zeros in time segments at start", () => {
		const { getByTestId } = render(<StopWatch />);
		expect(getByTestId("hr-display").children[0]).toBe("00");
		expect(getByTestId("min-display").children[0]).toBe("00");
		expect(getByTestId("sec-display").children[0]).toBe("00");
		expect(getByTestId("ms-display").children[0]).toBe("00");
	});

	// Ensures no laps are displayed initially
	test("displays no laps at start", () => {
		const { queryAllByTestId } = render(<StopWatch />);
		expect(queryAllByTestId(/lap-\d/)).toHaveLength(0);
	});

	// Verifies that all display elements are present
	test("has all necessary display elements", () => {
		const { getByText } = render(<StopWatch />);
		expect(getByText("hr.").children[0]).toBe("hr.");
		expect(getByText("min.").children[0]).toBe("min.");
		expect(getByText("sec.").children[0]).toBe("sec.");
		expect(getByText("1/10s.").children[0]).toBe("1/10s.");
	});

	// Confirms that the stopwatch stops immediately after starting
	test("stops immediately after starting", () => {
		const { getByText, getByTestId } = render(<StopWatch />);

		act(() => {
			fireEvent.press(getByText("Start"));
		});
		act(() => {
			fireEvent.press(getByText("Pause"));
		});

		const secDisplay = getByTestId("sec-display").children[0];
		expect(secDisplay).toBe("00");
	});

	// Confirms that the stopwatch stops immediately after starting
	test("stops just before a full second", () => {
		const { getByText, getByTestId } = render(<StopWatch />);

		act(() => {
			fireEvent.press(getByText("Start"));
		});
		act(() => {
			jest.advanceTimersByTime(999);
		});
		act(() => {
			fireEvent.press(getByText("Pause"));
		});

		const secDisplay = getByTestId("sec-display").children[0];
		expect(secDisplay).toBe("00");
	});

	// Confirms that the stopwatch stops immediately after starting
	test("stops right after a full second", () => {
		const { getByText, getByTestId } = render(<StopWatch />);

		act(() => {
			fireEvent.press(getByText("Start"));
		});
		act(() => {
			jest.advanceTimersByTime(1000);
		});
		act(() => {
			fireEvent.press(getByText("Pause"));
		});

		const secDisplay = getByTestId("sec-display").children[0];
		expect(secDisplay).toBe("01");
	});

	// Confirms that the stopwatch stops immediately after starting
	test("resumes just before a second change", () => {
		const { getByText, getByTestId } = render(<StopWatch />);

		// Start and then pause
		act(() => {});
		act(() => {
			fireEvent.press(getByText("Start"));
		});
		act(() => {
			jest.advanceTimersByTime(990);
		});
		act(() => {
			fireEvent.press(getByText("Pause"));
		});

		// Resume
		act(() => {
			fireEvent.press(getByText("Resume"));
		});
		act(() => {
			jest.advanceTimersByTime(20);
		});

		const secDisplay = getByTestId("sec-display").children[0];
		expect(secDisplay).toBe("01");
	});

	// Confirms that the stopwatch stops immediately after starting
	test("quick pause and resume", () => {
		const { getByText, getByTestId } = render(<StopWatch />);

		// Start, pause, and resume quickly
		act(() => {
			fireEvent.press(getByText("Start"));
		});
		act(() => {
			jest.advanceTimersByTime(500);
		});
		act(() => {
			fireEvent.press(getByText("Pause"));
		});
		act(() => {
			fireEvent.press(getByText("Resume"));
		});
		act(() => {
			jest.advanceTimersByTime(500);
		});

		const secDisplay = getByTestId("sec-display").children[0];
		expect(secDisplay).toBe("01"); // Total of 1 second should have elapsed
	});

	// Verifies the handling of a large number of laps
	test("handles a large number of laps", () => {
		const { getByText, getAllByTestId } = render(<StopWatch />);
		act(() => {
			fireEvent.press(getByText("Start"));
		});

		// Record 100 laps
		for (let i = 0; i < 100; i++) {
			act(() => {
				jest.advanceTimersByTime(1000);
			});
			act(() => {
				fireEvent.press(getByText("Lap"));
			});
		}

		const laps = getAllByTestId(/lap-\d/);
		expect(laps.length).toBe(100);
	});

	// Checks lap time accuracy at short intervals
	test("accurately records laps at short intervals", () => {
		const { getByText, getAllByTestId } = render(<StopWatch />);
		act(() => {
			fireEvent.press(getByText("Start"));
		});

		// Record laps in quick succession
		act(() => {
			jest.advanceTimersByTime(10);
		});
		act(() => {
			fireEvent.press(getByText("Lap"));
		});
		act(() => {
			jest.advanceTimersByTime(10);
		});
		act(() => {
			fireEvent.press(getByText("Lap"));
		});

		const laps = getAllByTestId(/lap-\d/);
		expect(laps.length).toBe(2);
	});

	// Ensures long-term lap time accuracy
	test("maintains lap time accuracy over long periods", () => {
		const { getByText, getAllByTestId } = render(<StopWatch />);
		act(() => {
			fireEvent.press(getByText("Start"));
		});

		act(() => {
			jest.advanceTimersByTime(600000);
		});
		act(() => {
			fireEvent.press(getByText("Lap"));
		});

		const laps = getAllByTestId(/lap-\d/);
		const lapTime = laps[0].children[1].children[0].children.join("");
		expect(lapTime).toBe("00:10:00.00");
	});

	// Confirms the recording and display of lap times
	test("records and displays lap times", () => {
		const { getByText, getAllByTestId } = render(<StopWatch />);

		act(() => {
			fireEvent.press(getByText("Start"));
		});
		act(() => {
			fireEvent.press(getByText("Lap"));
		});

		expect(getAllByTestId(/lap-\d/).length).toBe(1);

		act(() => {
			fireEvent.press(getByText("Lap"));
		});

		expect(getAllByTestId(/lap-\d/).length).toBe(2);
	});

	// Tests the reset functionality after recording multiple laps
	test("resets correctly after recording multiple laps", () => {
		const { getByText, queryAllByTestId } = render(<StopWatch />);
		act(() => {
			fireEvent.press(getByText("Start"));
		});

		// Record 50 laps
		for (let i = 0; i < 50; i++) {
			act(() => {
				jest.advanceTimersByTime(1000);
			});
			act(() => {
				fireEvent.press(getByText("Lap"));
			});
		}

		act(() => {
			fireEvent.press(getByText("Pause"));
		});
		act(() => {
			fireEvent.press(getByText("Reset"));
		});

		const laps = queryAllByTestId(/lap-\d/);
		expect(laps.length).toBe(0);
	});

	// Ensures UI responsiveness with a high number of laps
	test("UI remains responsive with a high number of laps", () => {
		const { getByText, getAllByTestId } = render(<StopWatch />);
		act(() => {
			fireEvent.press(getByText("Start"));
		});

		for (let i = 0; i < 100; i++) {
			act(() => {
				jest.advanceTimersByTime(1000);
			});
			act(() => {
				fireEvent.press(getByText("Lap"));
			});
		}

		const laps = getAllByTestId(/lap-\d/);
		expect(laps.length).toBe(100);
	});

	// Verifies the reset functionality of the stopwatch
	test("resets the stopwatch", () => {
		const { getByText, queryAllByTestId, getByTestId } = render(<StopWatch />);

		act(() => {
			fireEvent.press(getByText("Start"));
		});
		act(() => {
			jest.advanceTimersByTime(2000);
		});
		act(() => {
			fireEvent.press(getByText("Lap"));
		});
		act(() => {
			fireEvent.press(getByText("Pause"));
		});
		act(() => {
			fireEvent.press(getByText("Reset"));
		});

		// Check if the stopwatch has reset to initial state
		const hrDisplay = getByTestId("hr-display").children[0];
		const minDisplay = getByTestId("min-display").children[0];
		const secDisplay = getByTestId("sec-display").children[0];
		const msDisplay = getByTestId("ms-display").children[0];

		expect(hrDisplay).toBe("00");
		expect(minDisplay).toBe("00");
		expect(secDisplay).toBe("00");
		expect(msDisplay).toBe("00");

		expect(queryAllByTestId(/lap-\d/).length).toBe(0);
	});

	// Confirms that the display shows 00:00:00 at the start
	test("displays 00:00:00 at start", async () => {
		await advanceTimeAndAssert(0, "00", "00", "00", "00");
	});

	// Tests the display for 1 hour elapsed time
	test("displays 01:00:00 after 1 hour", async () => {
		await advanceTimeAndAssert(3600000, "01", "00", "00", "00");
	});

	// Checks display accuracy at the edge of a minute
	test("displays correctly at edge of a minute", async () => {
		await advanceTimeAndAssert(3599990, "00", "59", "59", "90");
	});

	// Verifies the display for 1 minute elapsed time
	test("displays 00:01:00 after 1 minute", async () => {
		await advanceTimeAndAssert(60000, "00", "01", "00", "00");
	});

	// Confirms display accuracy at the edge of a second
	test("displays correctly at edge of a second", async () => {
		await advanceTimeAndAssert(990, "00", "00", "00", "90");
	});

	// Tests the display for 1 second elapsed time
	test("displays 00:00:01 after 1 second", async () => {
		await advanceTimeAndAssert(1000, "00", "00", "01", "00");
	});

	// Ensures the display is accurate at the edge of a millisecond
	test("displays correctly at edge of a millisecond", async () => {
		await advanceTimeAndAssert(0, "00", "00", "00", "00");
		await advanceTimeAndAssert(10, "00", "00", "00", "10");
	});

	// Checks that formatTime returns all zeros for zero milliseconds
	test("formatTime returns all zeros for zero milliseconds", () => {
		const resFormatTime = formatTime(0);

		expect(resFormatTime.formattedHours).toBe("00");
		expect(resFormatTime.formattedMins).toBe("00");
		expect(resFormatTime.formattedSecs).toBe("00");
		expect(resFormatTime.formattedMilliseconds).toBe("00");
	});

	// Ensures formatTime returns correct format for one millisecond
	test("formatTime returns 00:00:00:01 for one millisecond", () => {
		const res = formatTime(1);
		expect(res.formattedHours).toBe("00");
		expect(res.formattedMins).toBe("00");
		expect(res.formattedSecs).toBe("00");
		expect(res.formattedMilliseconds).toBe("01");
	});

	// Verifies formatTime for 999 milliseconds
	test("formatTime returns 00:00:00:99 for 999 milliseconds", () => {
		const res = formatTime(999);
		expect(res.formattedHours).toBe("00");
		expect(res.formattedMins).toBe("00");
		expect(res.formattedSecs).toBe("00");
		expect(res.formattedMilliseconds).toBe("99");
	});

	// Checks formatTime for exactly one second
	test("formatTime returns 00:00:01:00 for one second", () => {
		const res = formatTime(1000);
		expect(res.formattedHours).toBe("00");
		expect(res.formattedMins).toBe("00");
		expect(res.formattedSecs).toBe("01");
		expect(res.formattedMilliseconds).toBe("00");
	});

	// Ensures formatTime accuracy for 1001 milliseconds
	test("formatTime returns 00:00:01:01 for 1001 milliseconds", () => {
		const res = formatTime(1001);
		expect(res.formattedHours).toBe("00");
		expect(res.formattedMins).toBe("00");
		expect(res.formattedSecs).toBe("01");
		expect(res.formattedMilliseconds).toBe("01");
	});

	// Tests formatTime for just below one minute
	test("formatTime returns 00:00:59:99 for just below one minute", () => {
		const res = formatTime(59999);
		expect(res.formattedHours).toBe("00");
		expect(res.formattedMins).toBe("00");
		expect(res.formattedSecs).toBe("59");
		expect(res.formattedMilliseconds).toBe("99");
	});

	// Confirms formatTime for exactly one minute
	test("formatTime returns 00:01:00:00 for one minute", () => {
		const res = formatTime(60000);
		expect(res.formattedHours).toBe("00");
		expect(res.formattedMins).toBe("01");
		expect(res.formattedSecs).toBe("00");
		expect(res.formattedMilliseconds).toBe("00");
	});

	// Verifies formatTime for just over one minute
	test("formatTime returns 00:01:00:01 for just over one minute", () => {
		const res = formatTime(60001);
		expect(res.formattedHours).toBe("00");
		expect(res.formattedMins).toBe("01");
		expect(res.formattedSecs).toBe("00");
		expect(res.formattedMilliseconds).toBe("01");
	});

	// Tests formatTime for a large time value
	test("formatTime returns correct format for a large value", () => {
		// 10 hours in milliseconds: 10 * 60 * 60 * 1000
		const res = formatTime(36000000);
		expect(res.formattedHours).toBe("10");
		expect(res.formattedMins).toBe("00");
		expect(res.formattedSecs).toBe("00");
		expect(res.formattedMilliseconds).toBe("00");
	});

	// Ensures formatTime handles negative values correctly
	test("formatTime handles negative values", () => {
		const res = formatTime(-1000);

		expect(res.formattedHours).toBe("00");
		expect(res.formattedMins).toBe("00");
		expect(res.formattedSecs).toBe("00");
		expect(res.formattedMilliseconds).toBe("00");
	});
});
