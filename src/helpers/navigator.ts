import { navigationRules } from "./navigationRules";

export function calcNextStep(current: number, dir: "left" | "right"): number {
    for (const r of navigationRules) {
        if (r.match(current)) {
            const maybe = r.next(current, dir);
            if (maybe != null) return maybe;
        }
    }
    return current;
}
