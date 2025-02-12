import React from "react";
import Terminal from "../../components/Terminal";
import styles from "@/styles/TerminalPage.module.css";

const TerminalPage = () => {
  return (
    <div>
      <h2 className={styles.title}>A cool terminal</h2>
      <div className={styles.terminal}>
        <Terminal />
      </div>
    </div>
  );
};

export default TerminalPage;
