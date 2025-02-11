import React, { useEffect, useState } from "react";
import styles from "@/styles/Settings.module.css";
import ThemeChip from "../../components/ThemeChip";

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

  return (
    <>
      <h2 className={styles.title}>Quote of the day</h2>
      <p>Select the themes you wish to see in the quote of the day.</p>
      <div>
        {availableTags?.length > 0 &&
          availableTags?.map((topic) => (
            <ThemeChip key={topic} theme={topic} />
          ))}
      </div>
    </>
  );
};

export default Settings;
