import React, { useEffect, useState } from "react";
import styles from "@/styles/Settings.module.css";
import ThemeChip from "../../components/ThemeChip";
import ThemeInfo from "../../components/ThemeInfo";

const Settings = () => {
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
      console.error("Error fetching quote:", error);
    }
  };

  useEffect(() => {
    setSelectedTopics(
      localStorage.getItem("selectedTopics") || [
        "success",
        "motivation",
        "growth",
      ]
    );
    fetchAvailableTags();
  }, []);

  const themes = ["", "dracula", "ayu-dark", "ayu-mirage", "nord", "night-owl"];

  return (
    <>
      <h2 className={styles.title}>Quote of the day</h2>
      <p>Select the themes you wish to see in the quote of the day.</p>
      <div className={styles.topics}>
        {availableTags?.length > 0 &&
          availableTags?.map((topic) => (
            <ThemeChip key={topic} theme={topic} />
          ))}
      </div>
      <h2 className={styles.title}>Theme</h2>
      <p>Customize the way the website looks.</p>
      {themes.map((theme) => (
        <ThemeInfo key={theme} theme={theme} />
      ))}
    </>
  );
};

export default Settings;
