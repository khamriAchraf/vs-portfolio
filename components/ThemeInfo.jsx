import { useEffect, useState } from "react";
import styles from "@/styles/ThemeInfo.module.css";

export default function ThemeInfo({ theme }) {

    return (
        <div className={styles.container} data-theme={theme}>
            <div className="theme-box">
                <h3>{theme}</h3>
                <button className={styles.button} onClick={() => document.body.setAttribute("data-theme", theme)}>
                    Apply
                </button>
            </div>
        </div>
    );
}