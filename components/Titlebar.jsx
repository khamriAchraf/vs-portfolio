import React from 'react'
import styles from "@/styles/Titlebar.module.css";
import { VscVscode } from "react-icons/vsc";
import { useTranslation } from "react-i18next";


export const Titlebar = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.titlebar}>
            <VscVscode height={15}
                width={15}
                className={styles.icon} />
            <div className={styles.items}>
                <p>{t("file", "File")}</p>
                <p>{t("edit", "Edit")}</p>
                <p>{t("view", "View")}</p>
                <p>{t("go", "Go")}</p>
                <p>{t("run", "Run")}</p>
                <p>{t("terminal", "Terminal")}</p>
                <p>{t("help", "Help")}</p>
            </div>
            <p className={styles.title}>{t("achrafKhamri", "Achraf Khamri")}</p>
            <div className={styles.windowButtons}>
                <span className={styles.yellow}></span>
                <span className={styles.green}></span>
                <span className={styles.red}></span>
            </div>
        </div>
    )
}
