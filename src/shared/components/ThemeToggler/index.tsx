import { useState } from "react";
import MoonIcon from "src/shared/icons/Moon.icon";
import clsx from "clsx";
import LightThemeIcon from "src/shared/icons/LightTheme.icon";
import classes from "./ThemeToggler.module.less";
import { useTheme } from "src/shared/hooks/useTheme";

const ThemeToggleSwitch = ({ className }: { className?: string }) => {
    const { toggleTheme, theme } = useTheme();
    const [isHover, setIsHover] = useState(false);
    const [isTransition, setIsTransition] = useState(false);
    const handleTheme = () => {
        toggleTheme();
        setIsTransition(true);
        setTimeout(() => setIsTransition(false), 500);
    };
    return (
        <div
            className={clsx(
                classes.themeToggle,
                theme === "dark" ? classes.dark : classes.light,
                isHover || isTransition ? classes.effect : "",
                className
            )}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={handleTheme}
        >
            <div
                className={clsx(
                    classes.icon,
                    classes.sunIcon,
                    theme === "dark" ? classes.dark : classes.light,
                    isHover || isTransition ? classes.effect : "",
                    theme === "light" ? classes.active : ""
                )}
            >
                <LightThemeIcon />
            </div>
            <div
                className={clsx(
                    classes.icon,
                    classes.moonIcon,
                    theme === "dark" ? classes.dark : classes.light,
                    isHover || isTransition ? classes.effect : "",
                    theme === "dark" ? classes.active : ""
                )}
            >
                <MoonIcon />
            </div>
            <div
                className={clsx(
                    classes.glowBlock,
                    theme === "dark" ? classes.dark : classes.light,
                    isHover || isTransition ? classes.effect : ""
                )}
            />
            <div
                className={clsx(
                    classes.slider,
                    theme === "dark" ? classes.dark : classes.light,
                    isHover || isTransition ? classes.effect : ""
                )}
            />
            <div
                className={clsx(
                    classes.border,
                    theme === "dark" ? classes.dark : classes.light,
                    isHover || isTransition ? classes.effect : ""
                )}
            />
        </div>
    );
};

export default ThemeToggleSwitch;
