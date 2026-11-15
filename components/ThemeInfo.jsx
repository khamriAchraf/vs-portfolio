import { useEffect, useState } from "react";
import styles from "@/styles/ThemeInfo.module.css";
import { useTranslation } from 'react-i18next'

export default function ThemeInfo({ theme }) {
    const { t } = useTranslation()

    const handleChangeTheme = () => {
        document.body.setAttribute("data-theme", theme)
        localStorage.setItem("theme", theme);
    }

    return (
        <div className={styles.container} data-theme={theme}>
            <img src={`/${theme}.png`} alt={theme} className={styles.image} />
            <h4 className={styles.title}>{theme}</h4>
            <button className={styles.button} onClick={() => handleChangeTheme()}>
                {t('applyColorTheme', 'Apply Color Theme')}
            </button>
        </div>
    );
}