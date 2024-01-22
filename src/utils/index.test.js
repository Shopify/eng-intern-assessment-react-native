const { formatTimeSegment } = require(".");

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

