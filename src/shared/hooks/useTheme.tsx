import { useEffect, useState } from "react";

export type Themes = "light" | "dark";
export const useTheme = () => {
    const localTheme = localStorage.getItem("theme") as Themes | null;
    console.log(" useTheme ~ localTheme:", localTheme);
    const [appTheme, setAppTheme] = useState<Themes>(localTheme ?? "light");
    const toggleTheme = () => {
        const nextTheme = appTheme === "light" ? "dark" : "light";
        setAppTheme(nextTheme);
        localStorage.setItem("theme", nextTheme);
        document.body.classList.replace(appTheme, nextTheme);
    };
    useEffect(() => {
        if (localTheme) {
            document.body.classList.add(localTheme);
            return;
        }
        document.body.classList.add(appTheme);
    }, []);
    return { theme: appTheme, toggleTheme };
};
