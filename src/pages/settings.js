import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Settings.module.css";
import ThemeChip from "../../components/ThemeChip";
import ThemeInfo from "../../components/ThemeInfo";
import MusicSettings from "../../components/MusicSettings";

const Settings = () => {
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
      <h2 id="theme" className={styles.title}>
        Theme
      </h2>
      <p>Customize the way the website looks.</p>
      <div className={styles.container}>
        {themes.map((theme) => (
          <ThemeInfo key={theme} theme={theme} />
        ))}
      </div>
      <div className={styles.divider}></div>
      <h2 id="music-player" className={styles.title}>
        Music Player
      </h2>
      <div>
        <MusicSettings />
      </div>
      <div className={styles.divider}></div>
      <h2 id="quote-of-the-day" className={styles.title}>
        Quote of the day
      </h2>
      <p>Select the themes you wish to see in the quote of the day.</p>
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
