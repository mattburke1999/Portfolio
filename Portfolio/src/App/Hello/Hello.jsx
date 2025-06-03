import { useState, useEffect } from 'react';

import styles from './Hello.module.css';

export default function HelloPage({ homeRef }) {
    const [fadedIn, setFadedIn] = useState(0);
    const [typed, setTyped] = useState(0);
    const isMobile = window.innerWidth <= 768;

    let descClass = styles.description;
    if (fadedIn === 1) {
        descClass += ` ${styles.typing}`;
    } else if (fadedIn === 2 && isMobile) {
        descClass += ` ${styles.typedNoCaret}`;
    } else if (fadedIn === 2) {
        descClass += ` ${styles.typed}`;
    }
    let descClass1 = styles.description;
    if (typed === 1) {
        descClass1 += ` ${styles.typing}`;
    } else if (typed === 2) {
        descClass1 += ` ${styles.typed}`;
    }

    const setUpTimeouts = (firstCallback, secondCallback, firstTimeout) => {
        setTimeout(() => {
            firstCallback();
            setTimeout(() => {
                secondCallback();
            }, 3500);
        }, firstTimeout);
    }

    useEffect(() => {
        setUpTimeouts(() => {
            setFadedIn(1);
        }, () => {
            setFadedIn(2);
            setTyped(1);
            setTimeout(() => {
                setTyped(2);
            }, 3500);
        }, 1500);
    }, []);

    return (
        <div className={styles.hello} ref={homeRef}>
            <h1 className={`${styles.name} ${styles.fadeLeft}`}>
                <span>Hello,&nbsp;</span>
                <span>I&apos;m&nbsp;</span>
                <span className={styles.highlight1}>Matthew</span>
                .
            </h1>
            <div className={styles.descriptionContainer}>
                {isMobile 
                ?  <>
                    <h1 className={descClass}>
                        <span>I&apos;m&nbsp;</span>
                        <span>a&nbsp;</span>
                        <span className={styles.highlight2}>full-stack&nbsp;</span>
                        <span>web&nbsp;</span>
                        <span>developer&nbsp;</span>
                        <span>with&nbsp;</span>
                    </h1>
                    <h1 className={descClass1}>
                        <span>a&nbsp;</span>
                        <span>focus&nbsp;</span>
                        <span>in&nbsp;</span>
                        <span className={styles.highlight3}>big-data&nbsp;</span> 
                        <span>applications.</span>
                    </h1>
                </> 
                : <h1 className={descClass}>
                    <span>I&apos;m&nbsp;</span>
                    <span>a&nbsp;</span>
                    <span className={styles.highlight2}>full-stack&nbsp;</span>
                    <span>web&nbsp;</span>
                    <span>developer&nbsp;</span>
                    <span>with&nbsp;</span>
                    <span>a&nbsp;</span>
                    <span>focus&nbsp;</span>
                    <span>in&nbsp;</span>
                    <span className={styles.highlight3}>big-data&nbsp;</span> 
                    <span>applications.</span>
                </h1>
                }
            </div>
        </div>
    ) 
}