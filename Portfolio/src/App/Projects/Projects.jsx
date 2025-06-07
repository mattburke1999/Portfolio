import styles from './Projects.module.css';

import { useState, useEffect, useRef } from 'react';

import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import { getProjImgs } from '../utils';

export default function Projects({ projRef }) {

    const projectImages = getProjImgs(styles.projImgs);
    
    const projects = [
        {
            name: 'KeyBoard Games',
            images: projectImages['KeyBoardGames'] || [],
            description: [
                'Web game suite with Flask backend, vanilla JS frontend, and Rust websocket server using warp for low-latency play',
                'Tracks scores and cosmetics; supports skins, keyboard controls, real-time updates, and game result validation'
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
                'Built a Flask web app mimicking GarminConnect; parsed .fit files and stored GPS/activity data in PostgreSQL',
                'Displays workouts with Folium maps, detailed stats (HR, elevation, laps), and multi-user auth with session control'
            ],
            link: 'https://example.com',
            icons: [{name: 'Python'}, {name: 'JavaScript'}, {name: 'Flask'}, {name: 'PostgreSQL'}, {name: 'Redis'}]
        },
        {
            name: 'Personal ToDo',
            images: projectImages['PersonalToDo'] || [],
            description: [
                'Windows desktop app using React, pywebview, and SQLite; C# service handles task scheduling and alerts',
                'Supports lists, sorting, filtering, searching, calendar page, and advanced scheduling options for repeated tasks'

            ],
            link: 'https://example.com',
            icons: [
                {name: 'Python'}, {name: 'JavaScript'}, {name: 'C#'}, 
                {name: 'PyWebView', link: 'https://pywebview.flowrl.com/logo-no-text.png'}, 
                {name: 'React'}, {name: 'SQLite'}
            ]
        },
        {
            name: 'Code Cracker',
            images: projectImages['CodeCracker'] || [],
            description: [
                'Built a Flask web app mimicking GarminConnect; parsed .fit files and stored GPS/activity data in PostgreSQL',
                'Displays workouts with Folium maps, detailed stats (HR, elevation, laps), and multi-user auth with session control'
            ],
            link: 'https://mattburke1999.github.io/CodeCracker/',
            icons: [{name: 'JavaScript'}, {name: 'React'}]
        },
        {
            name: 'Calculator',
            images: projectImages['Calculator'] || [],
            description: [
                'Built a Flask web app mimicking GarminConnect; parsed .fit files and stored GPS/activity data in PostgreSQL',
                'Displays workouts with Folium maps, detailed stats (HR, elevation, laps), and multi-user auth with session control'
            ],
            link: 'https://example.com',
            imageSize: 'small',
            icons: [
                {name: 'Python'}, {name: 'JavaScript'},
                {name: 'PyWebView', link: 'https://pywebview.flowrl.com/logo-no-text.png'}, 
                {name: 'React'}
            ]
        },
        {
            name: 'Password Manager',
            images: projectImages['PasswordManager'] || [],
            description: [
                'Built a Flask web app mimicking GarminConnect; parsed .fit files and stored GPS/activity data in PostgreSQL',
                'Displays workouts with Folium maps, detailed stats (HR, elevation, laps), and multi-user auth with session control'
            ],
            link: 'https://example.com',
            imageSize: 'medium',
            icons: [{name: 'Python'}, {name: 'JavaScript'}, {name: 'Flask'}, {name: 'Next.js'}, {name: 'PostgreSQL'}]
        },
        
    ]

    return (
        <>
            <style>
                    {`.image-gallery-content.fullscreen .${styles.projImgs} {
                        height: auto !important;
                    }`}
            </style>
            <div className={styles.projects} ref={projRef}>
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
                threshold: 0.2, // Trigger when 20% of the element is visible
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
    if (imageSize) {
        const percent = imageSize === 'small' ? '12.5%' : '7.5%'
        if(side){
            imageStyle = {marginRight: percent};
        } else {
            imageStyle = {marginLeft: percent};
        }
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