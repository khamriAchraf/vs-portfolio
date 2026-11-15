import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/Footer.module.css";
import { VscQuote, VscSourceControl } from "react-icons/vsc";
import { VscError } from "react-icons/vsc";
import { VscWarning } from "react-icons/vsc";
import { VscCheckAll } from "react-icons/vsc";
import { VscBell } from "react-icons/vsc";
import { VscRemote } from "react-icons/vsc";
import { VscMusic, VscDebugPause, VscDebugStart } from "react-icons/vsc";
import { musicPlayerState } from './MusicPlayer';
import { useTranslation } from "react-i18next";

const Footer = ({ quoteVisible, playerVisible, toggleQuote, togglePlayer, toggleTimeMachine }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { t } = useTranslation();

  // Keep local state in sync with global state
  useEffect(() => {
    const updatePlayingState = (playing) => {
      setIsPlaying(playing);
    };

    // Subscribe to state changes and store the callback reference
    musicPlayerState.subscribe(updatePlayingState);

    // Cleanup: unsubscribe when component unmounts
    return () => {
      musicPlayerState.unsubscribe(updatePlayingState);
    };
  }, []); // Empty dependency array since we want this effect to run once

  // Check playing state periodically as a backup
  useEffect(() => {
    const interval = setInterval(() => {
      setIsPlaying(musicPlayerState.isPlaying);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handlePlayPauseClick = (e) => {
    e.stopPropagation();
    if (musicPlayerState.togglePlay) {
      try {
        musicPlayerState.togglePlay();
      } catch (error) {
        console.warn('Failed to toggle play state:', error);
        // Ensure our state is correct even if there's an error
        setIsPlaying(musicPlayerState.isPlaying);
      }
    }
  };

  const handleMusicClick = (e) => {
    // If clicking the play/pause button, don't toggle the player
    if (e.target.closest(`.${styles.playPauseButton}`)) {
      e.stopPropagation();
      return;
    }
    togglePlayer();
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.remoteSection} onClick={toggleTimeMachine} title={t("timeMachine", "Time Machine")}>
          <VscRemote className={styles.remoteIcon} />
        </div>
        

        <a
          href="https://github.com/khamriAchraf"
          target="_blank"
          rel="noreferrer noopener"
          className={styles.section}
        >
          <VscSourceControl className={styles.icon} />
          <p>{t("master", "master")}</p>
        </a>
        <div className={styles.section}>
          <VscError className={styles.icon} />
          <p>0</p>&nbsp;&nbsp;
          <VscWarning className={styles.icon} />
          <p>0</p>
        </div>
        {/* Credit link to Nitin Ranganath */}
        <a
          href="https://github.com/itsnitinr"
          target="_blank"
          rel="noreferrer noopener"
          className={styles.section}
        >
          <p>{t("inspiredByNitinRanganath", "Inspired by Nitin Ranganath")}</p>
        </a>
      </div>
      <div className={styles.container}>
        <div
          className={`${styles.section} ${styles.musicSection} ${isPlaying ? styles.playing : ''}`}
          onClick={handleMusicClick}
        >
          {/* Wave animation elements */}
          <div className={styles.wave}></div>
          <div className={styles.wave}></div>
          <div className={styles.wave}></div>
          <VscMusic className={styles.qicon} />
          <p>{t("musicPlayer", "Music Player")}</p>
          <button 
            className={styles.playPauseButton}
            onClick={handlePlayPauseClick}
            type="button"
            aria-label={isPlaying ? t("pause", "Pause") : t("play", "Play")}
          >
            {isPlaying ? <VscDebugPause /> : <VscDebugStart />}
          </button>
        </div>
        <div
          className={styles.section}
          onClick={() => toggleQuote()}
        >
          <VscQuote className={styles.qicon} />
          <p>{t("quoteOfTheDay", "Quote of the day")}</p>
        </div>
        <div className={styles.section}>
          <VscCheckAll className={styles.icon} />
          <p>{t("prettier", "Prettier")}</p>
        </div>
        <div className={styles.section}>
          <VscBell className={styles.icon} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
