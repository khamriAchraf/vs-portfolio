import React from 'react'
import styles from "@/styles/Footer.module.css";
import { VscSourceControl } from "react-icons/vsc";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <a
                    href="https://github.com/khamriAchraf"
                    target="_blank"
                    rel="noreferrer noopener"
                    className={styles.section}
                >
                    <VscSourceControl className={styles.sourceIcon} />
                    <p>master</p>
                </a>
            </div>
        </footer>
    )
}

export default Footer