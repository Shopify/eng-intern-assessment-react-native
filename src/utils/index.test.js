const { formatTimeSegment, convertSegmentsToCentis, convertCentisToSegments, getTotalRecordedLapTime } = require(".");

describe("Tests for the formatTimeSegment function", () => {
    it("Returns a leading zero for a single-digit input", () => {
        const input = 3;
        const output = formatTimeSegment(input);
        expect(output).toBe("03")
    })

    it("Returns a double-digit string for a double-digit input", () => {
        const input = 12;
        const output = formatTimeSegment(input);
        expect(output).toBe("12");
    })

    it("Returns an empty string for a negative integer", () => {
        const input = -12;
        const output = formatTimeSegment(input);
        expect(output).toBe("");
    })

    it("Returns an empty string for a number that has greater than 2 digits", () => {
        const input = 100;
        const output = formatTimeSegment(input);
        expect(output).toBe("");
    })

    it("Returns an empty string for a non-numerical input", () => {
        const input = false;
        const output = formatTimeSegment(input);
        expect(output).toBe("");
    })
})

describe("Tests for convertSegmentsToCentis function", () => {
    it("correctly converts [0, 0, 0] to 0 centis", () => {
        const input = [0,0,0];
        const output = convertSegmentsToCentis(input);
        expect(output).toBe(0)
    })

    it("correctly converts [0, 2, 0] to 200 centis", () => {
        const input = [0,2,0];
        const output = convertSegmentsToCentis(input);
        expect(output).toBe(200)
    })

    it("correctly converts [1, 2, 0] to 6200 centis", () => {
        const input = [1,2,0];
        const output = convertSegmentsToCentis(input);
        expect(output).toBe(6200)
    })

    it("correctly converts [1, 65, 120] to 12620 centis", () => {
        const input = [1,65,120];
        const output = convertSegmentsToCentis(input);
        expect(output).toBe(12620)
    })
})

describe("Tests for convertCentisToSegments function", () => {
    it("correctly converts 0 centis to [0, 0, 0]", () => {
        const input = 0;
        const output = convertCentisToSegments(input);
        expect(output[0]).toBe(0)
        expect(output[1]).toBe(0)
        expect(output[2]).toBe(0)
    })

    it("correctly converts 170 centis to [0, 1, 70]", () => {
        const input = 170;
        const output = convertCentisToSegments(input);
        expect(output[0]).toBe(0)
        expect(output[1]).toBe(1)
        expect(output[2]).toBe(70)
    })

    it("correctly converts 8577 centis to [1, 25, 77]", () => {
        const input = 8577;
        const output = convertCentisToSegments(input);
        expect(output[0]).toBe(1)
        expect(output[1]).toBe(25)
        expect(output[2]).toBe(77)
    })
})

describe("Tests for getTotalRecordedLapTime function", () => {
    it("returns [0, 0, 0] for an empty input array", () => {
        const input = [];
        const output = getTotalRecordedLapTime(input);
        expect(output[0]).toBe(0)
        expect(output[1]).toBe(0)
        expect(output[2]).toBe(0)
    })
    it("correctly calculates [1, 3, 95] for [[0, 1, 50], [1, 2, 45]]", () => {
        const input = [[0,1,50], [1,2,45]];
        const output = getTotalRecordedLapTime(input);
        expect(output[0]).toBe(1)
        expect(output[1]).toBe(3)
        expect(output[2]).toBe(95)
    })

    it("correctly calculates [1, 4, 25] for [[0, 1, 50], [1, 2, 75]]", () => {
        const input = [[0,1,50], [1,2,75]];
        const output = getTotalRecordedLapTime(input);
        expect(output[0]).toBe(1)
        expect(output[1]).toBe(3)
        expect(output[2]).toBe(125)
    })
})