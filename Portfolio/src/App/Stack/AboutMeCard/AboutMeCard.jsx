import styles from './AboutMeCard.module.css';

export default function AboutMeCard({fadeClass}) {
    return (
        <div className={`${styles.aboutMeCard} ${fadeClass}`}>
            <h1 >About Me</h1>
            <div className={styles.profile}>
                <img src="/images/me-pic.jpg" alt="Profile Picture" />
            </div>
            <p>(Click a Stack Icon to learn more)</p>
            <div className={styles.description}>
                <p>
                    I am a software developer with a passion for creating innovative solutions. I have experience in various programming languages and technologies, and I enjoy learning new skills to enhance my expertise.
                </p>
                <p>
                    In my free time, I love to work on personal projects and explore new technologies. I also enjoy spending time outside running, camping, hiking, etc.
                </p>
            </div>
            <div className={styles.buttons}>
                <a href='/files/Burke, Matthew Resume 2025.pdf' target='_blank' rel='noopener noreferrer' >
                    <i className="fa-solid fa-file-pdf"></i>
                    <span>View Resume</span>
                </a>
                <a href='https://github.com/mattburke1999/' target='_blank' rel='noopener noreferrer'>
                    <img src={`https://cdn.simpleicons.org/github`} alt='GitHub' width={18} height={18} />
                    <span>View GitHub</span>
                </a>
            </div>
        </div>
    )
}