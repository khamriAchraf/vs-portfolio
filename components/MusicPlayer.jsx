import React, { useRef, useState, useEffect, useMemo } from 'react';
import styles from '@/styles/MusicPlayer.module.css';
import {
    VscClose,
    VscDebugPause,
    VscDebugStart,
    VscDebugStepBack,
    VscDebugStepOver,
    VscSettingsGear,
    VscListSelection
} from 'react-icons/vsc';
import { MdVolumeUp, MdVolumeDown, MdVolumeOff } from 'react-icons/md';
import Link from 'next/link';

// Create a global state for music controls that can be accessed from anywhere
export const musicPlayerState = {
    isPlaying: false,
    togglePlay: null,
    listeners: new Set(),
    setGlobalControls: function(togglePlayFn) {
        this.togglePlay = togglePlayFn;
    },
    updatePlayingState: function(playing) {
        this.isPlaying = playing;
        // Notify all listeners
        this.listeners.forEach(listener => {
            try {
                listener(playing);
            } catch (error) {
                console.warn('Error notifying listener:', error);
            }
        });
    },
    subscribe: function(callback) {
        this.listeners.add(callback);
        // Immediately call with current state
        callback(this.isPlaying);
    },
    unsubscribe: function(callback) {
        this.listeners.delete(callback);
    }
};

const tracks = [
    { name: 'The Stage is Set', src: '/music/tft.mp3', tag: 'gaming' },
    { name: 'The Very Very Very Strongest', src: '/music/onepiece.mp3', tag: 'gaming' },
    { name: 'Ma Meilleure Ennemie (from Arcane)', author: 'Stromae, Pomme, Coldplay', src: '/music/ennemie.mp3', tag: 'gaming' },
    { name: 'Orange Sea', author: 'Hoogway', src: '/music/lofi1.mp3', tag: 'lofi' },
    { name: 'Albatross', author: 'Blue Fox', src: '/music/lofi2.mp3', tag: 'lofi' },
    { name: 'Young Again', author: 'xander.', src: '/music/lofi3.mp3', tag: 'lofi' },
    { name: 'Frozen Snow', author: 'A[way]', src: '/music/lofi4.mp3', tag: 'lofi' },
    { name: 'Canon in D', author:'Johann Pachelbel', src: '/music/canon.mp3', tag: 'classical' },
    { name: "Mariage d'amour", author:'Paul de Senneville', src: '/music/amour.mp3', tag: 'classical' },
    { name: "Swan Lake", author:'Pyotr Ilyich Tchaikovsky', src: '/music/swan.mp3', tag: 'classical' },
    { name: "Nessun Dorma", author:'Fernando Varela', src: '/music/nessun.mp3', tag: 'opera' },
    { name: "Con te partirò", author:'Sarah Brightman, Andrea Bocelli', src: '/music/conn.mp3', tag: 'opera' },
    { name: "Clair-Obscur", author:' Lorien Testard feat. Alice Duport-Percier', src: '/music/clairobscure.mp3', tag: 'gaming' },
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
        () => selectedTag === 'all'
            ? tracks
            : tracks.filter(track => track.tag === selectedTag),
        [selectedTag]
    );

    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.1);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    // NEW STATE
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [queueVisible, setQueueVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const audioRef = useRef(null);

    useEffect(() => {
        if (filteredTracks.length > 0) {
            // When tag changes, check if current index is still valid
            if (currentTrackIndex >= filteredTracks.length) {
                // If current index is out of bounds, pick a random track from the new filtered list
                const randomIndex = Math.floor(Math.random() * filteredTracks.length);
                setCurrentTrackIndex(randomIndex);
            }
        } else {
            // If no tracks available for this tag, reset to 0
            setCurrentTrackIndex(0);
        }
    }, [selectedTag, filteredTracks.length]);

    useEffect(() => {
        // Separate effect for initial random selection on mount
        if (filteredTracks.length > 0 && currentTrackIndex === 0) {
            const randomIndex = Math.floor(Math.random() * filteredTracks.length);
            setCurrentTrackIndex(randomIndex);
        }
    }, [filteredTracks.length]);

    const togglePlay = () => {
        if (!audioRef.current || isLoading) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
            musicPlayerState.updatePlayingState(false);
        } else {
            audioRef.current.play().catch(e => {
                console.warn('Play failed:', e);
                setIsPlaying(false);
                musicPlayerState.updatePlayingState(false);
            });
            setIsPlaying(true);
            musicPlayerState.updatePlayingState(true);
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
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleProgressClick = (e) => {
        if (!audioRef.current || !audioRef.current.duration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const newTime = (clickX / rect.width) * audioRef.current.duration;
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    useEffect(() => {
        if (audioRef.current && filteredTracks.length > 0 && currentTrackIndex < filteredTracks.length) {
            const audio = audioRef.current;
            const newSrc = filteredTracks[currentTrackIndex].src;
            
            // Only update if the source has actually changed
            if (audio.src !== window.location.origin + newSrc && audio.src !== newSrc) {
                const wasPlaying = isPlaying;
                
                // Pause current playback to prevent conflicts
                audio.pause();
                setIsLoading(true);
                
                // Reset audio state
                audio.currentTime = 0;
                setCurrentTime(0);
                setProgress(0);
                
                // Set new source
                audio.src = newSrc;
                audio.load(); // Ensure the new source is loaded
                
                // Auto-play if we should be playing
                if (wasPlaying) {
                    const playWhenReady = () => {
                        audio.play().then(() => {
                            setIsPlaying(true);
                        }).catch(e => {
                            console.warn('Auto-play prevented:', e);
                            setIsPlaying(false);
                        });
                    };
                    
                    // Wait for the audio to be ready to play
                    if (audio.readyState >= 2) {
                        playWhenReady();
                    } else {
                        const onCanPlay = () => {
                            playWhenReady();
                            audio.removeEventListener('canplay', onCanPlay);
                        };
                        audio.addEventListener('canplay', onCanPlay);
                    }
                }
            }
        }
    }, [currentTrackIndex, filteredTracks]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const formatTime = (time) => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current && audioRef.current.duration) {
            setDuration(audioRef.current.duration);
            setIsLoading(false);
        }
    };

    const handleLoadStart = () => {
        setIsLoading(true);
    };

    const handleError = (e) => {
        console.warn('Audio loading error (this is normal when switching tracks quickly):', e);
        setIsLoading(false);
    };

    const handleCanPlay = () => {
        setIsLoading(false);
    };

    // Register the toggle function in the global state
    useEffect(() => {
        const boundTogglePlay = togglePlay.bind(null);
        musicPlayerState.setGlobalControls(boundTogglePlay);
        return () => {
            musicPlayerState.setGlobalControls(null);
        };
    }, [isPlaying, isLoading]); // Add dependencies to ensure the function stays up to date

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
                        <button onClick={() => setQueueVisible(prev => !prev)} className={styles.actionButton}>
                            <VscListSelection />
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
                    {filteredTracks.length > 0 && currentTrackIndex < filteredTracks.length && (
                        <div>
                            {isLoading ? 'Loading...' : filteredTracks[currentTrackIndex].name}{!isLoading && filteredTracks[currentTrackIndex].author ? ` - ${filteredTracks[currentTrackIndex].author}` : ''}
                        </div>
                    )}
                    <div className={styles.tag}>{filteredTracks[currentTrackIndex].tag}</div>
                </div>

                <div className={styles.progressBar} onClick={handleProgressClick}>
                    <div className={styles.progress} style={{ width: `${progress}%` }} />
                </div>
                <div className={styles.timeInfo}>
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>

                {queueVisible && (
                    <div className={styles.queue}>
                        {filteredTracks.map((track, index) => (
                            <div
                                key={index}
                                className={`${styles.track} ${index === currentTrackIndex ? styles.activeTrack : ''}`}
                                onClick={() => {
                                    const wasPlaying = isPlaying;
                                    setCurrentTrackIndex(index);
                                    if (wasPlaying) {
                                        setIsPlaying(true);
                                    }
                                }}
                            >
                                {track.name}{track.author ? ` - ${track.author}` : ''}
                            </div>
                        ))}
                    </div>
                )}

                <audio
                    ref={audioRef}
                    onTimeUpdate={updateProgress}
                    onEnded={handleEnded}
                    onLoadedMetadata={handleLoadedMetadata}
                    onLoadStart={handleLoadStart}
                    onError={handleError}
                    onCanPlay={handleCanPlay}
                />
            </div>
    );
}
