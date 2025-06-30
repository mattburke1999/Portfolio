import { useState, useEffect } from 'react';

import styles from './Hello.module.css';

export default function HelloPage({ homeRef }) {
    const [fadedIn, setFadedIn] = useState(0);
    const [phraseNum, setPhraseNum] = useState(0);

    let descClass = styles.description;
    if (fadedIn === 1) {
        descClass += ` ${styles.typing}`;
    } else if (fadedIn === 2) {
        descClass += ` ${styles.typed}`;
    } else if (fadedIn === 3) {
        descClass += ` ${styles.backTyping}`;
    }

    const phrases = [
        [
            {text: "full-stack&nbsp;", class: styles.highlight2},
            {text: "web&nbsp;", class: null},
            {text: "developer", class: styles.highlight3},
            {text: ".", class: null}
        ],
        [
            {text: "curious&nbsp;", class: styles.highlight2},
            {text: "problem&nbsp;", class: null},
            {text: "solver", class: styles.highlight3},
            {text: ".", class: null}
        ],
        [
            {text: "detail-oriented&nbsp;", class: styles.highlight2},
            {text: "data&nbsp;", class: null},
            {text: "analyst", class: styles.highlight3},
            {text: ".", class: null}
        ],
        [
            {text: "creative&nbsp;", class: styles.highlight2},
            {text: "software&nbsp;", class: null},
            {text: "engineer", class: styles.highlight3},
            {text: ".", class: null}
        ],
        [
            {text: "reliable&nbsp;", class: styles.highlight2},
            {text: "team&nbsp;", class: null},
            {text: "player", class: styles.highlight3},
            {text: ".", class: null}
        ]
    ];

    const intervalFunction = (firstTime = false) => {
        setTimeout(() => {
            setTimeout(() => {
                setFadedIn(2);
            }, 3500);
            setTimeout(() => {
                setFadedIn(3);
            }, 4500);
            setTimeout(() => {
                setFadedIn(1);
                setPhraseNum(prev => (prev + 1) % phrases.length);
            }, 8000);
            intervalFunction();
        }, firstTime ? 0 : 8000);
    }

    useEffect(() => {
        setTimeout(() => {
            setFadedIn(1);
            intervalFunction(true);
        }, 1500);
    }, []);


    return (
        <div className={styles.hello} ref={homeRef} id='home'>
            <h1 className={`${styles.name} fadeInE`}>
                <span>Hello,&nbsp;</span>
                <span>I&apos;m&nbsp;</span>
                <span className={styles.highlight1}>Matthew</span>
                .
            </h1>
            <div className={styles.descriptionContainer}>
                <h1 className={descClass}>
                    <span>I&apos;m&nbsp;</span>
                    <span>a&nbsp;</span>
                    {phrases[phraseNum].map((phrase, index) => (
                        <span key={index} className={phrase.class} dangerouslySetInnerHTML={{__html: phrase.text}}></span>
                    ))}
                </h1>
            </div>
        </div>
    ) 
}