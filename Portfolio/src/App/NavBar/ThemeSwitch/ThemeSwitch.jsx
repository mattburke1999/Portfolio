import styles from './ThemeSwitch.module.css';

import { setTheme, getThemeStorage } from '../../utils';

import { useEffect, useState } from 'react';

export default function ThemeSwitch() {
    const [darkMode, setDarkMode] = useState(getThemeStorage());

    useEffect(() => {
        setTheme(darkMode ? 'dark' : 'light');
    }, [darkMode]);

    return (
        <label className={styles.switch}>
            <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
            <span className={styles.sliderRound}>
                <i className={`fa-solid fa-sun ${styles.lightIcon}`}></i>
                <i className={`fa-solid fa-moon ${styles.darkIcon}`}></i>
            </span>
        </label>
    );
}