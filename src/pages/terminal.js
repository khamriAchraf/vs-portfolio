import React from "react";
import Terminal from "../../components/Terminal";
import styles from "@/styles/TerminalPage.module.css";
import { useTranslation } from "react-i18next";

const TerminalPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className={styles.title}>{t("aCoolTerminal", "A cool terminal")}</h2>
      <div className={styles.terminal}>
        <Terminal />
      </div>
    </div>
  );
};

export default TerminalPage;
