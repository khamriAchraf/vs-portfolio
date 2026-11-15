import Image from 'next/image';
import GitHubCalendar from 'react-github-calendar';
import styles from '@/styles/GithubPage.module.css';
import { useTranslation } from "react-i18next";

const GithubPage = () => {
  const { t } = useTranslation();

  return (
    <>
    <h3 className={styles.title}>{t("iaposveBeenBusyThisYear", "I've been busy this year")}</h3>
      <div className={styles.user}>
        <div className={styles.contributions}>
          <GitHubCalendar
            username="khamriAchraf"
            hideColorLegend
            hideMonthLabels
          />
        </div>
      </div>
    </>
  );
};

export default GithubPage;