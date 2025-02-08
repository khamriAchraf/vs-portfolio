import React from 'react'
import styles from "@/styles/Content.module.css";
import { VscFiles } from "react-icons/vsc";
import { VscGithubAlt } from "react-icons/vsc";
import { VscCode } from "react-icons/vsc";
import { VscMention } from "react-icons/vsc";
import { VscSettingsGear } from "react-icons/vsc";
import { VscAccount } from "react-icons/vsc";
import Sidebar from './Sidebar';

const Content = () => {



    return (
        <div className={styles.content}>
            <Sidebar />
        </div>
    )
}

export default Content