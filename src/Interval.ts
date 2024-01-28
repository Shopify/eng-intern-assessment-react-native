type interval = {
    readonly hours: number;
    readonly minutes: number;
    readonly seconds: number;
    readonly milliseconds: number;
    totalMilliseconds: number;
}

export const Interval = (elpasedMilliseconds: number): interval => {
    const interval = {
        get milliseconds() {
            return this.totalMilliseconds % 1000;
        },
        get seconds() {
            // math trunc will work because it's showing the time representation hh:mm:ss:mmmm
            // so if it's fractional then a whole x (second, minute,etc.) hasn't elapsed yet so show 0
            return Math.trunc((this.totalMilliseconds / 1000) % 60);
        },
        get minutes() {
            // * remember a divisor with a divisor is equal to the (1st) dividend divided by the product of the divisors
            // * tl;dr x/y/z = x/yz
            return Math.trunc((this.totalMilliseconds / (1000 * 60)) % 60);
        },
        get hours() {
            return Math.trunc((this.totalMilliseconds / (1000 * 60 * 60)) % 24);
        },

        totalMilliseconds: elpasedMilliseconds
    };
    return interval;
};

export default interval;