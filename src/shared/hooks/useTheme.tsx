import { useEffect, useState } from "react";
import { useAppStore } from "../providers";

export type Themes = "light" | "dark";
export const useTheme = () => {
    const [appTheme, setAppTheme] = useState<Themes>(() => {
        return (localStorage.getItem("theme") as Themes | null) ?? "light";
    });
    const { theme, setTheme } = useAppStore();

    const toggleTheme = () => {
        const nextTheme = appTheme === "light" ? "dark" : "light";
        setAppTheme(nextTheme);
        setTheme(nextTheme);
        localStorage.setItem("theme", nextTheme);
        document.body.classList.replace(appTheme, nextTheme);
    };
    useEffect(() => {
        document.body.classList.add(appTheme);
        setTheme(appTheme);
    }, []);
    return { theme, toggleTheme };
};
