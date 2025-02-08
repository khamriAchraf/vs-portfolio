import React from 'react'
import styles from "@/styles/Titlebar.module.css";
import { VscVscode } from "react-icons/vsc";


export const Titlebar = () => {

    return (
        <div className={styles.titlebar}>
            <VscVscode height={15}
                width={15}
                className={styles.icon} />
            <div className={styles.items}>
                <p>File</p>
                <p>Edit</p>
                <p>View</p>
                <p>Go</p>
                <p>Run</p>
                <p>Terminal</p>
                <p>Help</p>
            </div>
            <p className={styles.title}>Achraf Khamri</p>
            <div className={styles.windowButtons}>
                <span className={styles.yellow}></span>
                <span className={styles.green}></span>
                <span className={styles.red}></span>
            </div>
        </div>
    )
}
