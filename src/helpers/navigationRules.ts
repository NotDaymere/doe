type Step = number;
type Dir = "left" | "right";

interface Rule {
    match: (s: Step) => boolean;
    next: (s: Step, dir: Dir) => Step | null;
}

const is = (target: number) => (s: number) => s === target;
const inRange = (min: number, max: number) => (s: number) => s >= min && s <= max;
const sub = (s: number, val: number) => parseFloat((s - val).toFixed(1));
const add = (s: number, val: number) => parseFloat((s + val).toFixed(1));

export const navigationRules: Rule[] = [
    // 8–8.4
    {
        match: inRange(8, 8.4),
        next: (s, d) => (d === "right" ? (s === 8.4 ? 9 : add(s, 0.1)) : 7),
    },
    // 9–9.4
    {
        match: inRange(9, 9.4),
        next: (s, d) =>
            d === "right" ? (s === 9.4 ? 10 : add(s, 0.1)) : s === 9 ? 8 : sub(s, 0.1),
    },
    // 13
    {
        match: is(13),
        next: (s, d) => (d === "right" ? 14 : 11),
    },
    // 18–18.9
    {
        match: inRange(18, 18.9),
        next: (s, d) => (d === "right" ? (s === 18.4 ? 19 : s === 18 ? 18.1 : 18.4) : 16),
    },
    // 19–19.2
    {
        match: inRange(19, 19.2),
        next: (s, d) =>
            d === "right"
                ? s === 19.2
                    ? 20
                    : s === 19.1
                    ? 19.1
                    : add(s, 0.1)
                : s === 19
                ? 17
                : sub(s, 0.1),
    },
    // 21–21.2
    {
        match: inRange(21, 21.2),
        next: (s, d) =>
            d === "right"
                ? s === 21.2
                    ? 22
                    : s === 21.1
                    ? 21.1
                    : add(s, 0.1)
                : s === 21
                ? 20
                : sub(s, 0.1),
    },
    // 22
    {
        match: is(22),
        next: (s, d) => (d === "right" ? 22.1 : 20),
    },
    // 22.1
    {
        match: is(22.1),
        next: (s, d) => (d === "right" ? 23 : 20),
    },
    // 28.1
    {
        match: is(28.1),
        next: (s, d) => (d === "right" ? 30 : 28),
    },
    // 33
    {
        match: is(33),
        next: (s, d) => (d === "right" ? 34 : 31),
    },
    // 38–38.1
    {
        match: inRange(38, 38.1),
        next: (s, d) => (d === "right" ? (s === 38.1 ? 39 : add(s, 0.1)) : 35),
    },
    // 39
    {
        match: is(39),
        next: (s, d) => (d === "right" ? 40 : 35),
    },
    // 40
    {
        match: is(40),
        next: (s, d) => (d === "right" ? 41 : 35),
    },
    // 45.1
    {
        match: is(45.1),
        next: (s, d) => (d === "right" ? 46 : 44),
    },
    // 46–48
    {
        match: inRange(46, 48),
        next: (s, d) => (d === "right" ? (s === 48 ? 49 : 48) : 44),
    },
    // 51
    {
        match: is(51),
        next: (s, d) => (d === "right" ? 52 : 49),
    },
    // 55
    {
        match: is(55),
        next: (s, d) => (d === "right" ? 56 : 53),
    },
    // default
    {
        match: inRange(1, 999),
        next: (s, d) => (d === "right" ? s + 1 : s - 1),
    },
];
