import styles from './Projects.module.css';

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
            images: projectImages['KeyBoardGames'] || [],
            description: [
                'Built a Flask web app mimicking GarminConnect; parsed .fit files and stored GPS/activity data in PostgreSQL',
                'Displays workouts with Folium maps, detailed stats (HR, elevation, laps), and multi-user auth with session control'
            ],
            link: 'https://example.com',
            icons: [{name: 'Python'}, {name: 'JavaScript'}, {name: 'Flask'}, {name: 'PostgreSQL'}, {name: 'Redis'}]
        },
        {
            name: 'Personal ToDo',
            images: projectImages['KeyBoardGames'] || [],
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
                    <Project 
                        key={project.name} 
                        name={project.name} 
                        images={project.images}
                        side={i % 2 === 0 ? '' : '-reverse'}
                        description={project.description}
                        link={project.link}
                        icons={project.icons}
                    />
                )) }
            </div>
        </>
    );
}

function Project({ name, images, description, link, side, icons = []}) {
    return (
        <div style={{flexDirection: `row${side}`}} className={styles.project}>
            <div className={styles.projectSummary}>
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
            <div className={styles.projectImages}>
                <ImageGallery items={images} autoPlay={true}/>
            </div>
        </div>
    )
}