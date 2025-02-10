import React from 'react'
import styles from "@/styles/Footer.module.css";
import { VscQuote, VscSourceControl } from "react-icons/vsc";
import { VscError } from "react-icons/vsc";
import { VscWarning } from "react-icons/vsc";
import { VscCheckAll } from "react-icons/vsc";
import { VscBell } from "react-icons/vsc";
import { VscRemote } from "react-icons/vsc";


const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
            <div className={styles.remoteSection}>
                    <VscRemote className={styles.remoteIcon} />
                </div>
                <a
                    href="https://github.com/khamriAchraf"
                    target="_blank"
                    rel="noreferrer noopener"
                    className={styles.section}
                >
                    <VscSourceControl className={styles.icon} />
                    <p>master</p>
                </a>
                <div className={styles.section}>
                    <VscError className={styles.icon} />
                    <p>0</p>&nbsp;&nbsp;
                    <VscWarning className={styles.icon} />
                    <p>0</p>
                </div>
            </div>
            <div className={styles.container}>
            <div className={styles.section}>
                    <VscQuote className={styles.qicon} />
                    <p>Quote of the day</p>
                </div>
                <div className={styles.section}>
                    <VscCheckAll className={styles.icon} />
                    <p>Prettier</p>
                </div>
                <div className={styles.section}>
                    <VscBell className={styles.icon} />
                </div>
            </div>
        </footer>
    )
}

export default Footer