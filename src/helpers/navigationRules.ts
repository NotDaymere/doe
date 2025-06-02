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
    // 4
    {
        match: is(4),
        next: (s, d) => (d === "right" ? 4.5 : 4),
    },
    // 4.5
    {
        match: is(4.5),
        next: (s, d) => (d === "right" ? 4.5 : 4.5),
    },
    // 4.6-4.7
    {
        match: inRange(4.6, 4.7),
        next: (s, d) => (d === "right" ? 4.7 : 4.6),
    },
    // 5
    {
        match: is(5),
        next: (s, d) => (d === "right" ? 6 : 5),
    },
    // 8–8.4
    {
        match: inRange(8, 8.4),
        next: (s, d) => (d === "right" ? (s === 8.4 ? 9 : add(s, 0.1)) : 7),
    },
    // 9–9.4
    {
        match: inRange(9, 9.4),
        next: (s, d) => (d === "right" ? (s === 9.4 ? 10 : add(s, 0.1)) : 8),
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
    // 22
    {
        match: is(22),
        next: (s, d) => (d === "right" ? 22.1 : 21),
    },
    // 22.1
    {
        match: is(22.1),
        next: (s, d) => (d === "right" ? 23 : 21),
    },
    // 23
    {
        match: is(23),
        next: (s, d) => (d === "right" ? 24 : 22.1),
    },
    // 24-26
    {
        match: inRange(24, 26),
        next: (s, d) => (d === "right" ? 27 : 23),
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
    // 34
    {
        match: is(34),
        next: (s, d) => (d === "right" ? 35 : 31),
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
    // 40.1
    {
        match: is(40.1),
        next: (s, d) => (d === "right" ? 41 : 35),
    },
    // 41
    {
        match: is(41),
        next: (s, d) => (d === "right" ? 42 : 35),
    },
    // 43
    {
        match: is(43),
        next: (s, d) => (d === "right" ? 44 : 41),
    },
    // 44
    {
        match: is(44),
        next: (s, d) => (d === "right" ? 45 : 42),
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
        next: (s, d) => (d === "right" ? 53 : 49),
    },
    // 52
    {
        match: is(52),
        next: (s, d) => (d === "right" ? 53 : 51),
    },
    // 53
    {
        match: is(53),
        next: (s, d) => (d === "right" ? 54 : 51),
    },
    // 55
    {
        match: is(55),
        next: (s, d) => (d === "right" ? 56 : 53),
    },
    // 58-60
    {
        match: inRange(58, 60),
        next: (s, d) => (d === "right" ? 60 : 56),
    },
    // default
    {
        match: inRange(1, 999),
        next: (s, d) => (d === "right" ? s + 1 : s - 1),
    },
];
