import styles from './Projects.module.css';

import { useState, useEffect, useRef } from 'react';

import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import { getProjImgs } from '../utils';

export default function Projects({ projRef }) {

    const projectImages = getProjImgs(styles.projImgs);
    
    const projects = [
        {
            name: 'Personal ToDo',
            images: projectImages['PersonalToDo'] || [],
            description: [
                'Designed as a personalized, feature-rich alternative to the Windows To Do app, with full offline support.',
                'Built a Windows desktop task manager using Python, React, pywebview, and SQLite, packaged into a single executable with PyInstaller.',
                'The React frontend (bundled as a single HTML file) communicates with Python backend services via pywebview’s API bridge.',
                'Developed a C# background service that monitors upcoming tasks, listens for database changes, and triggers native Windows toast notifications.',
                'Task system supports sorting, filtering, search, a calendar view, and flexible scheduling options.',
                'Tasks can repeat at custom intervals or on specific days of the week, month, or year.'

            ],
            link: 'https://example.com',
            icons: [
                {name: 'Python'}, {name: 'JavaScript'}, {name: 'C#'}, 
                {name: 'PyWebView', link: 'https://pywebview.flowrl.com/logo-no-text.png'}, 
                {name: 'React'}, {name: 'SQLite'}
            ]
        },
        {
            name: 'KeyBoard Games',
            images: projectImages['KeyBoardGames'] || [],
            description: [
                'Built a lightweight, custom JavaScript game engine to power ~10 reaction-based games, handling shared logic like game lifecycle, input, point tracking, socket interaction, and target generation.',
                'Each game defines its own config and optional overrides to customize behavior (e.g. moving targets, disappearing elements, restricted movement).',
                'Full-stack Flask app serves all HTML, JavaScript, and game pages, and manages user auth, score tracking, leaderboards, and skin purchases.',
                'Rust WebSocket server using Tokio + Warp for low-latency game-play and point validation.',
                'Redis shares session state between Flask and the WebSocket server; PostgreSQL stores user data, scores, and skin purchases.'
            ],
            link: 'https://keyboardgames.com',
            icons: [
                {name: 'Python'}, {name: 'Rust'}, {name: 'JavaScript'}, {name: 'Flask'}, 
                {name: 'Tokio', link: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Tokio_logo.svg/1200px-Tokio_logo.svg.png'}, 
                {name: 'Warp'}, {name: 'PostgreSQL'}, {name: 'Redis'}
            ]
        },
        {
            name: 'Garmin Mock',
            images: projectImages['GarminMock'] || [],
            description: [
                'Developed a Flask web app as a personal mockup of Garmin Connect to visualize fitness data from .fit files.',
                'Parsed GPS, heart rate, elevation, and lap data using the fitparse Python library and stored it in PostgreSQL.',
                'Displayed workout details with interactive Folium maps and custom stat breakdowns.',
                'Implemented multi-user authentication with registration, login, session handling, and password hashing.',
                'Frontend built with Jinja templates, custom CSS, and minimal vanilla JavaScript.'
            ],
            link: 'https://example.com',
            icons: [{name: 'Python'}, {name: 'JavaScript'}, {name: 'Flask'}, {name: 'PostgreSQL'}]
        },
        {
            name: 'Password Manager',
            images: projectImages['PasswordManager'] || [],
            description: [
                'Developed a personal Chrome extension for managing encrypted passwords locally, with support for adding, editing, and viewing credentials.',
                'Used PBKDF2 and AES-GCM encryption; encrypted passwords (with salt and IV) are stored securely in PostgreSQL.',
                'Flask backend serves as the password API, spun up on-demand by a lightweight Next.js API that authenticates local access, applies rate limits, and logs all interactions.',
                'Passwords are decrypted client-side via a WebSocket for smooth, low-latency viewing (with initial masking and reveal-on-click UX).',
                'Everything runs locally, with no external communication, designed for privacy and control.'
            ],
            link: 'https://example.com',
            imageSize: 'medium',
            icons: [{name: 'Chrome Ext.', link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREHWmJqswjeSOHOsd8u_zIK6Fe8_rBiJDqsQ&s'}, {name: 'Python'}, {name: 'JavaScript'}, {name: 'Flask'}, {name: 'Next.js'}, {name: 'PostgreSQL'},
            ]
        },
        {
            name: 'Code Cracker',
            images: projectImages['CodeCracker'] || [],
            description: [
                'Built a static logic puzzle game with React where users guess a randomly generated 3-digit code.',
                'Game provides 5 logic-based hints (e.g. “One correct digit, wrong place”) to guide each round.',
                'Includes difficulty toggle (easy/medium/hard) to vary hint complexity and tracks guess count.',
                'Created as a personal mini-project inspired by similar styled logic games seen on social-media.'
            ],
            link: 'https://mattburke1999.github.io/CodeCracker/',
            icons: [{name: 'JavaScript'}, {name: 'React'}]
        },
        {
            name: 'Calculator',
            images: projectImages['Calculator'] || [],
            description: [
                'Created a basic desktop calculator app using React, packaged as a desktop app with pywebview.',
                'React handles all UI and logic; pywebview provides a lightweight Python wrapper for desktop deployment.',
                'Built as a simple personal project to experiment with React and desktop app delivery.'
            ],
            link: 'https://example.com',
            imageSize: 'small',
            icons: [
                {name: 'Python'}, {name: 'JavaScript'},
                {name: 'PyWebView', link: 'https://pywebview.flowrl.com/logo-no-text.png'}, 
                {name: 'React'}
            ]
        },
        
    ]

    return (
        <>
            <style>
                    {`.image-gallery-content.fullscreen .${styles.projImgs} {
                        height: auto !important;
                    }`}
            </style>
            <div className={styles.projects} ref={projRef} id='proj'>
                <h1 className={styles.title}>Projects</h1>
                {projects.map((project, i) => (
                    <div key={i} className={styles.projectContainer}>
                        <Project 
                            name={project.name} 
                            images={project.images}
                            description={project.description}
                            side={i % 2 === 0 ? '' : '-reverse'}
                            imageSize={project.imageSize || null}
                            link={project.link}
                            icons={project.icons}
                        />
                        <div className={styles.mobileLineBreak}></div>
                    </div>
                )) }
            </div>
        </>
    );
}

function Project({ name, images, description, side, link, imageSize = null, icons = []}) {
    const [scrolledBy, setScrolledBy] = useState(false);
    const projRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setScrolledBy(true);
                    observer.disconnect(); // Stop observing after first intersection
                }
            },
            {
                threshold: 0.4, // Trigger when 20% of the element is visible
            }
        );

        if (projRef.current) {
            observer.observe(projRef.current);
        }

        return () => {
            if (projRef.current) {
                observer.unobserve(projRef.current);
            }
        };
    }, []);

    let projectStyle = {flexDirection: `row${side}`};
    if (!scrolledBy) {
        projectStyle = {...projectStyle, opacity: '0'};
    }
    let imageStyle = {}
    let percent = '1%';
    if (imageSize) {
        percent = imageSize === 'small' ? '5%' : '2.5%'
    }
    if(side){
        imageStyle = {marginRight: percent};
    } else {
        imageStyle = {marginLeft: percent};
    }
    return (
        <div ref={projRef} style={projectStyle} className={`${styles.project}${scrolledBy ? (' ' + (side ? 'fadeE' : 'fadeW')) : ''}`}>
            <div className={styles.projectSummary} >
                <h2>{name}</h2>
                <ul>
                    {description.map((line, index) => (
                        <li key={index}>{line}</li>
                    ))}
                </ul>
                <div className={styles.projectIcons}>
                    {icons.map((icon) => (
                        <div className={styles.icon} key={icon.name}>
                            <img src={icon.link ? icon.link : `https://cdn.simpleicons.org/${icon.name}`} color={'white'} size={24} />
                            <p>{icon.name}</p>
                        </div>
                    ))}
                </div>
                {link && <a href={link} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>{name}</a>}
            </div>
            <div className={`${styles.projectImages}${imageSize ? ` ${styles[imageSize]}` : ''}`} style={imageStyle}>
                <ImageGallery items={images} autoPlay={true}/>
            </div>
        </div>
    )
}