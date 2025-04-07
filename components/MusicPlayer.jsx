import React, { useRef, useState, useEffect, useMemo } from 'react';
import styles from '@/styles/MusicPlayer.module.css';
import {
    VscClose,
    VscDebugPause,
    VscDebugStart,
    VscDebugStepBack,
    VscDebugStepOver,
    VscSettingsGear,
} from 'react-icons/vsc';
import { MdVolumeUp, MdVolumeDown, MdVolumeOff } from 'react-icons/md';
import Link from 'next/link';

const tracks = [
    { name: 'The Stage is Set', src: '/music/tft.mp3', tag: 'gaming' },
    { name: 'The Very Very Very Strongest', src: '/music/onepiece.mp3', tag: 'gaming' },
    { name: 'Orange Sea', author: 'Hoogway', src: '/music/lofi1.mp3', tag: 'lofi' },
    { name: 'Albatross', author: 'Blue Fox', src: '/music/lofi2.mp3', tag: 'lofi' },
    { name: 'Young Again', author: 'xander.', src: '/music/lofi3.mp3', tag: 'lofi' },
    { name: 'Frozen Snow', author: 'A[way]', src: '/music/lofi4.mp3', tag: 'lofi' },
    { name: 'Canon in D', author:'Johann Pachelbel', src: '/music/canon.mp3', tag: 'classical' },
    { name: "Mariage d'amour", author:'Paul de Senneville', src: '/music/amour.mp3', tag: 'classical' },
    { name: "Swan Lake", author:'Pyotr Ilyich Tchaikovsky', src: '/music/swan.mp3', tag: 'classical' },
    { name: "Nessun Dorma", author:'Fernando Varela', src: '/music/nessun.mp3', tag: 'opera' },
    { name: "Con te partirò", author:'Sarah Brightman, Andrea Bocelli', src: '/music/conn.mp3', tag: 'opera' },
];

export default function MusicPlayer({ playerVisible, togglePlayer }) {
    // Load selectedMusicTag from localStorage, default to 'lofi'
    const [selectedTag, setSelectedTag] = useState('lofi');
    useEffect(() => {
        const storedTag = localStorage.getItem('selectedMusicTag') || 'lofi';
        setSelectedTag(storedTag);
    }, []);

    // Memoize filteredTracks so its reference doesn't change every render.
    const filteredTracks = useMemo(
        () => tracks.filter(track => track.tag === selectedTag),
        [selectedTag]
    );

    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.1);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);

    const audioRef = useRef(null);

    useEffect(() => {
        if (filteredTracks.length > 0) {
            const randomIndex = Math.floor(Math.random() * filteredTracks.length);
            setCurrentTrackIndex(randomIndex);
        }
    }, [selectedTag, filteredTracks.length]);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    const nextTrack = () => {
        const storedTag = localStorage.getItem('selectedMusicTag') || 'lofi';
        setSelectedTag(storedTag);
        if (filteredTracks.length > 0) {
            let nextIndex;
            do {
                nextIndex = Math.floor(Math.random() * filteredTracks.length);
            } while (nextIndex === currentTrackIndex && filteredTracks.length > 1);
            setCurrentTrackIndex(nextIndex);
        }
    };

    const prevTrack = () => {
        if (filteredTracks.length > 0) {
            const prevIndex = (currentTrackIndex - 1 + filteredTracks.length) % filteredTracks.length;
            setCurrentTrackIndex(prevIndex);
        }
    };

    const increaseVolume = () => {
        const newVolume = Math.min(volume + 0.1, 1);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
            if (isMuted && newVolume > 0) {
                audioRef.current.muted = false;
                setIsMuted(false);
            }
        }
    };

    const decreaseVolume = () => {
        const newVolume = Math.max(volume - 0.1, 0);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
            if (newVolume === 0) {
                audioRef.current.muted = true;
                setIsMuted(true);
            }
        }
    };

    const toggleMute = () => {
        if (!audioRef.current) return;
        if (isMuted) {
            audioRef.current.muted = false;
            setIsMuted(false);
        } else {
            audioRef.current.muted = true;
            setIsMuted(true);
        }
    };

    const handleEnded = () => {
        nextTrack();
    };

    const updateProgress = () => {
        if (audioRef.current && audioRef.current.duration) {
            const percentage =
                (audioRef.current.currentTime / audioRef.current.duration) * 100;
            setProgress(percentage);
        }
    };

    const handleProgressClick = (e) => {
        if (!audioRef.current || !audioRef.current.duration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const newTime = (clickX / rect.width) * audioRef.current.duration;
        audioRef.current.currentTime = newTime;
    };

    useEffect(() => {
        if (audioRef.current && filteredTracks.length > 0) {
            // Only update the src if it has actually changed.
            const newSrc = filteredTracks[currentTrackIndex].src;
            if (audioRef.current.src !== newSrc) {
                audioRef.current.src = newSrc;
            }
            if (isPlaying) {
                audioRef.current.play();
            }
        }
    }, [currentTrackIndex, filteredTracks, isPlaying]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    return (
        <div className={`${styles.player} ${playerVisible ? styles.visible : styles.hidden}`}>
            <div className={styles.titleContainer}>
                <p className={styles.title}>Music Player</p>
                <div className={styles.content}>
                    <Link href="/settings?section=music-player">
                        <VscSettingsGear className={styles.icon} />
                    </Link>
                    <VscClose onClick={() => togglePlayer()} className={styles.closeIcon} />
                </div>
            </div>
            <div className={styles.controls}>
                <div className={styles.actionButtons}>
                    <button onClick={prevTrack} className={styles.actionButton}>
                        <VscDebugStepBack />
                    </button>
                    <button onClick={togglePlay} className={styles.actionButton}>
                        {isPlaying ? <VscDebugPause /> : <VscDebugStart />}
                    </button>
                    <button onClick={nextTrack} className={styles.actionButton}>
                        <VscDebugStepOver />
                    </button>

                </div>


                <div className={styles.volumeControls}>
                    <button onClick={decreaseVolume} className={styles.actionButton}>
                        <MdVolumeDown />
                    </button>
                    <div>{(volume * 10).toFixed(0)}</div>
                    <button onClick={increaseVolume} className={styles.actionButton}>
                        <MdVolumeUp />
                    </button>
                    <button
                        onClick={toggleMute}
                        className={`${styles.muteButton} ${isMuted && styles.muted}`}
                    >
                        <MdVolumeOff />
                    </button>
                </div>
            </div>

            <div className={styles.currentTrack}>
                <div>{filteredTracks.length > 0 && filteredTracks[currentTrackIndex].name}  -  {filteredTracks[currentTrackIndex].author}</div>

                <div className={styles.tag}>{selectedTag}</div>
            </div>

            <div className={styles.progressBar} onClick={handleProgressClick}>
                <div className={styles.progress} style={{ width: `${progress}%` }} />
            </div>

            <audio
                ref={audioRef}
                onTimeUpdate={updateProgress}
                onEnded={handleEnded}
            />
        </div>
    );
}
