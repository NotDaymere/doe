import { useState } from "react";
import MoonIcon from "src/shared/icons/Moon.icon";
import clsx from "clsx";
import LightThemeIcon from "src/shared/icons/LightTheme.icon";
import classes from "./ThemeToggler.module.less";

const ThemeToggleSwitch = ({ className }: { className?: string }) => {
    const [isDark, setIsDark] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const [isTransition, setIsTransition] = useState(false);
    const toggleTheme = () => {
        document.body.classList.replace(isDark ? "dark" : "light", isDark ? "light" : "dark");
        setIsTransition(true);
        setIsDark(!isDark);
        setTimeout(() => setIsTransition(false), 500);
    };
    return (
        <div
            className={clsx(
                classes.themeToggle,
                isDark ? classes.dark : classes.light,
                isHover || isTransition ? classes.effect : "",
                className
            )}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={toggleTheme}
        >
            <div
                className={clsx(
                    classes.icon,
                    classes.sunIcon,
                    isDark ? classes.dark : classes.light,
                    isHover || isTransition ? classes.effect : "",
                    !isDark ? classes.active : ""
                )}
            >
                <LightThemeIcon />
            </div>
            <div
                className={clsx(
                    classes.icon,
                    classes.moonIcon,
                    isDark ? classes.dark : classes.light,
                    isHover || isTransition ? classes.effect : "",
                    isDark ? classes.active : ""
                )}
            >
                <MoonIcon />
            </div>
            <div
                className={clsx(
                    classes.glowBlock,
                    isDark ? classes.dark : classes.light,
                    isHover || isTransition ? classes.effect : ""
                )}
            />
            <div
                className={clsx(
                    classes.slider,
                    isDark ? classes.dark : classes.light,
                    isHover || isTransition ? classes.effect : ""
                )}
            />
            <div
                className={clsx(
                    classes.border,
                    isDark ? classes.dark : classes.light,
                    isHover || isTransition ? classes.effect : ""
                )}
            />
        </div>
    );
};

export default ThemeToggleSwitch;
