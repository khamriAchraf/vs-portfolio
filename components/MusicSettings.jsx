import React, { useState, useEffect } from 'react';
import styles from '@/styles/MusicSettings.module.css';
import { useTranslation } from 'react-i18next'

const availableTags = [
    'gaming',
    'lofi',
    'classical',
    'opera',
    'all'
];

export default function MusicSettings({ onTagChange }) {
    const { t } = useTranslation()
    const [selectedTag, setSelectedTag] = useState('lofi');
    const tagLabels = {
        gaming: t("musicTagGaming", "Gaming"),
        lofi: t("musicTagLofi", "Lo-fi"),
        classical: t("musicTagClassical", "Classical"),
        opera: t("musicTagOpera", "Opera"),
        all: t("musicTagAll", "All"),
    };

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
            <label htmlFor="musicTag">{t('pickAMusicStyle', 'Pick a music style:')}</label>
            <select
                id="musicTag"
                value={selectedTag}
                onChange={handleChange}
                className={styles.select}
            >
                {availableTags.map(tag => (
                    <option key={tag} value={tag}>
                        {tagLabels[tag]}
                    </option>
                ))}
            </select>
        </div>
    );
}
