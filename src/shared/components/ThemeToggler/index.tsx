import { useState } from "react";
import MoonIcon from "src/shared/icons/Moon.icon";
import clsx from "clsx";
import LightThemeIcon from "src/shared/icons/LightTheme.icon";
import classes from "./ThemeToggler.module.less";
import { useTheme } from "src/shared/hooks/useTheme";

const ThemeToggleSwitch = ({
    className,
    isHorizontal = false,
}: {
    className?: string;
    isHorizontal?: boolean;
}) => {
    const { toggleTheme, theme } = useTheme();
    const themeTitle = theme === "light" ? "Light Theme" : "Dark Theme";
    return (
        <div className={clsx(classes.themeToggleContainer, className)}>
            <div
                className={clsx(
                    classes.themeToggle,
                    theme === "dark" ? classes.dark : classes.light,
                    isHorizontal && classes.horizontal
                )}
                onClick={toggleTheme}
            >
                <div
                    className={clsx(
                        classes.themeToggle__icon,
                        classes.sunIcon,
                        theme === "dark" ? classes.dark : classes.light,
                        theme === "light" ? classes.active : ""
                    )}
                >
                    <LightThemeIcon />
                </div>
                <div
                    className={clsx(
                        classes.themeToggle__icon,
                        classes.moonIcon,
                        theme === "dark" ? classes.dark : classes.light,
                        theme === "dark" ? classes.active : ""
                    )}
                >
                    <MoonIcon />
                </div>
                <div
                    className={clsx(
                        classes.themeToggle__glowBlock,
                        theme === "dark" ? classes.dark : classes.light
                    )}
                />
                <div
                    className={clsx(
                        classes.themeToggle__slider,
                        theme === "dark" ? classes.dark : classes.light
                    )}
                />
                <div
                    className={clsx(
                        classes.themeToggle__border,
                        theme === "dark" ? classes.dark : classes.light
                    )}
                />
            </div>
            {isHorizontal && <p className={classes.themeToggle__title}>{themeTitle}</p>}
        </div>
    );
};

export default ThemeToggleSwitch;
