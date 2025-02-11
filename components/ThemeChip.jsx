import React from "react";
import { useSelectedQuoteThemes } from "../context/selectedQuoteThemes";
import styles from "@/styles/ThemeChip.module.css";

const ThemeChip = ({ theme }) => {
    const { selectedTopics, handleAddTheme, handleRemoveTheme } = useSelectedQuoteThemes();

    // Determine if this theme is selected based on context
    const isSelected = selectedTopics.includes(theme);

    const handleClick = () => {
        if (isSelected) {
            handleRemoveTheme(theme);
        } else {
            handleAddTheme(theme);
        }
    };

    return (
        <div
            onClick={handleClick}
            className={isSelected ? styles.selectedTheme : styles.unselectedTheme}
        >
            {theme} {isSelected ? "✔️" : ""}
        </div>
    );
};

export default ThemeChip;