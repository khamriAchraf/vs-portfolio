import React, { useState, useEffect } from 'react';
import styles from '@/styles/MusicSettings.module.css';

const availableTags = [
    'gaming',
    'lofi',
    'classical',
    'soft rock',
    'retro'
];

export default function MusicSettings({ onTagChange }) {
    const [selectedTag, setSelectedTag] = useState('lofi');

    useEffect(() => {
        const storedTag = localStorage.getItem('selectedMusicTag') || 'lofi';
        setSelectedTag(storedTag);
    }, []);

    const handleChange = (e) => {
        const newTag = e.target.value;
        setSelectedTag(newTag);
        localStorage.setItem('selectedMusicTag', newTag);
        if (onTagChange) {
            onTagChange(newTag);
        }
    };

    return (
        <div className={styles.settings}>
            <label htmlFor="musicTag">Pick a music style:</label>
            <select
                id="musicTag"
                value={selectedTag}
                onChange={handleChange}
                className={styles.select}
            >
                {availableTags.map(tag => (
                    <option key={tag} value={tag}>
                        {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    );
}
