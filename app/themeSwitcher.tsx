"use client"
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const handleThemeChange = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <div
            className="fixed bottom-4 right-4 flex items-center space-x-2"
            style={{ zIndex: 9999 }}
        >
            <label
                htmlFor="themeToggle"
                className={`text-${theme === "light" ? "black" : "white"}`}
            >
                <i className={`fas ${theme === "light" ? "fa-sun" : "fa-moon"}`}></i>
            </label>
            <div
                id="themeToggle"
                className={`slider ${theme === "dark" ? "dark" : ""}`}
                onClick={handleThemeChange}
            >
                <div className="slider-circle"></div>
            </div>
        </div>
    );
};
