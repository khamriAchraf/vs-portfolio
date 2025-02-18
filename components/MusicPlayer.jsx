import React, { useRef, useState, useEffect } from 'react';
import styles from '@/styles/MusicPlayer.module.css';

const tracks = [
  { name: 'The Stage is Set', src: '/music/tft.mp3' },
  { name: 'The Very Very Very Strongest', src: '/music/onepiece.mp3' },
];

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const visualizerInitialized = useRef(false);

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [shuffle, setShuffle] = useState(false);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (!visualizerInitialized.current) {
      initVisualizer();
      visualizerInitialized.current = true;
    }

    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      await audioCtxRef.current.resume();
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const nextTrack = () => {
    let nextIndex;
    if (shuffle) {
      do {
        nextIndex = Math.floor(Math.random() * tracks.length);
      } while (nextIndex === currentTrackIndex && tracks.length > 1);
    } else {
      nextIndex = (currentTrackIndex + 1) % tracks.length;
    }
    setCurrentTrackIndex(nextIndex);
  };

  const prevTrack = () => {
    let prevIndex;
    if (shuffle) {
      do {
        prevIndex = Math.floor(Math.random() * tracks.length);
      } while (prevIndex === currentTrackIndex && tracks.length > 1);
    } else {
      prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    }
    setCurrentTrackIndex(prevIndex);
  };

  const toggleShuffle = () => {
    setShuffle(!shuffle);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const selectTrack = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  const handleEnded = () => {
    nextTrack();
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = tracks[currentTrackIndex].src;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Initialize the AudioContext and visualizer.
  const initVisualizer = () => {
    if (!audioRef.current || !canvasRef.current) return;

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    audioCtxRef.current = audioCtx;

    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const source = audioCtx.createMediaElementSource(audioRef.current);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext('2d');

    const draw = () => {
      requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      canvasCtx.fillStyle = '#000';
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = canvas.width / bufferLength;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 2;
        canvasCtx.fillStyle = '#0f0';
        canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }
    };
    draw();
  };

  return (
    <div className={styles.player}>
      <canvas ref={canvasRef} className={styles.visualizer} />

      <div className={styles.controls}>
        <button onClick={prevTrack}>Prev</button>
        <button onClick={togglePlay}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button onClick={nextTrack}>Next</button>
        <button
          onClick={toggleShuffle}
          className={shuffle ? styles.active : ''}
        >
          Shuffle
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>

      <div className={styles.queue}>
        {tracks.map((track, index) => (
          <div
            key={index}
            className={`${styles.track} ${
              index === currentTrackIndex ? styles.activeTrack : ''
            }`}
            onClick={() => selectTrack(index)}
          >
            {track.name}
          </div>
        ))}
      </div>

      <audio ref={audioRef} onEnded={handleEnded} />
    </div>
  );
}
