
import type { Image } from '../Components/ImageGallery/gallery-types';
import type { ProjectType as ProjectRefType } from '../Stores/projectRefs.svelte';

export type ProjectType = {
    name: string;
    images: Image[];
    description: string[];
    refName: ProjectRefType;
    githubLink?: string;
    demoLink?: string;
    link?: string;
    imageSize?: 'small' | 'medium';
    icons: {name: string; link?: string}[];
}

function getProjImgs(imgClass?: string, thumbnailClass?: string): Record<string, Image[]> {
    const imageModules = import.meta.glob('../assets/projects/*/*.{png,jpg,jpeg,webp}', { eager: true }) as Record<string, {default: string}>; // Vite-specific

    // Organize into a map: { projectName: [img1, img2, ...] }
    const projectImages: Record<string, Image[]> = {};
    Object.entries(imageModules).forEach(([path, mod]) => {
        const parts = path.split('/');
        const projectName = parts[parts.length - 2]; // gets 'project1', 'project2'
        
        if (!projectImages[projectName]) {
            projectImages[projectName] = [];
        }
        projectImages[projectName].push({original: mod.default, thumbnail: mod.default, alt: projectName, className: imgClass, thumbnailClassName: thumbnailClass});
    });
    return projectImages;
}

const extraLinks = {
    pywebview: 'https://pywebview.flowrl.com/logo-no-text.png',
    tokio: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Tokio_logo.svg/120px-Tokio_logo.svg.png',
    chromeExt: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREHWmJqswjeSOHOsd8u_zIK6Fe8_rBiJDqsQ&s'
}
export const getProjects = (imgClass?: string, thumbnailClass?: string): ProjectType[] => {
    const projectImages = getProjImgs(imgClass, thumbnailClass);
    return [
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
            refName: 'todo',
            githubLink: 'https://github.com/mattburke1999/PersonalToDo',
            icons: [
                {name: 'Python'}, {name: 'JavaScript'}, {name: 'C#'}, 
                {name: 'PyWebView', link: extraLinks.pywebview}, 
                {name: 'React'}, {name: 'SQLite'}
            ]
        },
        {
            name: 'HIT-ZONE',
            images: projectImages['KeyBoardGames'] || [],
            description: [
                'Built a lightweight, custom JavaScript game engine to power ~10 reaction-based games, handling shared logic like game lifecycle, input, point tracking, socket interaction, and target generation.',
                'Each game defines its own config and optional overrides to customize behavior (e.g. moving targets, disappearing elements, restricted movement).',
                'Full-stack Flask app serves all HTML, JavaScript, and game pages, and manages user auth, score tracking, leaderboards, and skin purchases.',
                'Rust WebSocket server using Tokio + Warp for low-latency game-play and point validation.',
                'Redis shares session state between Flask and the WebSocket server; PostgreSQL stores user data, scores, and skin purchases.'
            ],
            refName: 'hitZone',
            demoLink: '/demos/HIT-ZONE/',
            githubLink: 'https://github.com/mattburke1999/hit-zone',
            icons: [
                {name: 'Python'}, {name: 'Rust'}, {name: 'React'}, {name: 'TypeScript'}, {name: 'Flask'}, 
                {name: 'Tokio', link: extraLinks.tokio}, 
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
            refName: 'garminMock',
            demoLink: '/demos/GarminMock/',
            githubLink: 'https://github.com/mattburke1999/GarminMock',
            icons: [{name: 'Python'}, {name: 'JavaScript'}, {name: 'Flask'}, {name: 'PostgreSQL'}]
        },
        {
            name: 'Password Manager',
            images: projectImages['PasswordManager'] || [],
            description: [
                'Developed a personal Chrome extension for managing encrypted passwords locally, with support for adding, editing, and viewing credentials.',
                'Used PBKDF2 and AES-GCM encryption; encrypted passwords (with salt and IV) are stored securely in PostgreSQL.',
                'Flask backend serves as the password API, handling secure authentication, retrieval, creation, updating, and deletion of credentials.',
                'Passwords are retrieved via a WebSocket and decrypted client-side for smooth, low-latency viewing (with initial masking and reveal-on-click UX).',
                'Everything runs locally, with no external communication, designed for privacy and control.'
            ],
            refName: 'passwordManager',
            imageSize: 'medium',
            icons: [{name: 'Chrome Ext.', link: extraLinks.chromeExt}, {name: 'Python'}, {name: 'JavaScript'}, {name: 'Flask'}, {name: 'React'}, {name: 'PostgreSQL'},
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
            refName: 'codeCracker',
            link: '/CodeCracker/',
            githubLink: 'https://github.com/mattburke1999/CodeCracker',
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
            refName: 'calculator',
            imageSize: 'small',
            icons: [
                {name: 'Python'}, {name: 'JavaScript'},
                {name: 'PyWebView', link: extraLinks.pywebview}, 
                {name: 'React'}
            ]
        },
    ]
}