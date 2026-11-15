import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Settings.module.css";
import ThemeChip from "../../components/ThemeChip";
import ThemeInfo from "../../components/ThemeInfo";
import MusicSettings from "../../components/MusicSettings";
import { useTranslation } from "react-i18next";

const Settings = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);

  const fetchAvailableTags = async () => {
    try {
      const response = await fetch(`/api/tags`);
      const data = await response.json();
      if (data) {
        console.log(data.tags);
        setAvailableTags(data.tags);
      }
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  useEffect(() => {
    setSelectedTopics(
      localStorage.getItem("selectedTopics") ||
      JSON.stringify(["success", "motivation", "growth"])
    );
    fetchAvailableTags();
  }, []);

  // When the router is ready, scroll to the section specified in the URL.
  useEffect(() => {
    if (!router.isReady) return;
    const { section } = router.query;
    if (section) {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [router.isReady, router.query]);

  const themes = [
    "github-dark",
    "one-light",
    "dracula",
    "ayu-dark",
    "ayu-mirage",
    "nord",
    "night-owl",
    "one-dark-pro",
  ];

  return (
    <>
      <h2 id="music-player" className={styles.title}>
        {t("lang", "Language")}
      </h2>
      <div className={styles.settings}>
        <label htmlFor="musicTag">{t('pickLang', 'Pick the content language:')}</label>
        <select
          id="language"
          value={i18n.resolvedLanguage || i18n.language}
          onChange={(event) => {
            const language = event.target.value;
            i18n.changeLanguage(language);
            localStorage.setItem("language", language);
            document.documentElement.lang = language;
          }}
          className={styles.select}
        >
          <option value="en">{t("english", "English")}</option>
          <option value="fr">{t("french", "French")}</option>
        </select>
      </div>
      <div className={styles.divider}></div>
      <h2 id="theme" className={styles.title}>
        {t("theme", "Theme")}
      </h2>
      <p>{t("customizeTheWayTheWebsiteLooks", "Customize the way the website looks.")}</p>
      <div className={styles.container}>
        {themes.map((theme) => (
          <ThemeInfo key={theme} theme={theme} />
        ))}
      </div>
      <div className={styles.divider}></div>
      <h2 id="music-player" className={styles.title}>
        {t("musicPlayer", "Music Player")}
      </h2>
      <div>
        <MusicSettings />
      </div>
      <div className={styles.divider}></div>
      <h2 id="quote-of-the-day" className={styles.title}>
        {t("quoteOfTheDay", "Quote of the day")}
      </h2>
      <p>{t("selectTheThemesYouWishToSeeInTheQuoteOfTheDay", "Select the themes you wish to see in the quote of the day.")}</p>
      <div className={styles.topics}>
        {availableTags?.length > 0 &&
          availableTags.map((topic) => (
            <ThemeChip key={topic} theme={topic} />
          ))}
      </div>
    </>
  );
};

export default Settings;
