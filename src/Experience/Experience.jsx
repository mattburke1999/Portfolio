import styles from './Experience.module.css'


function ExperienceItem({ itemContent, side }) {
    return (
        <div className={`${styles.container} ${styles[side]}`}>
            <div className={styles.content}>
                {itemContent}
            </div>
        </div>
    );
}

export default function Experience({expRef}) {
    return (
        <>
        <h1 className={styles.title}>Experience</h1>
        <div className={styles.timeline} ref={expRef}>
            <ExperienceItem itemContent={
                <>
                    <h2>Nov 2022 - Present</h2>
                    <h3>Loyalty Lane (Givex)</h3>
                    <h3>Software Data Engineer</h3>
                    <ul className={styles.expBulletContainer}>
                        <li className={styles.expBullet}>Bullet 1</li>
                        <li className={styles.expBullet}>Bullet 2</li>
                    </ul>
                </>
            } side='left' />
            <ExperienceItem itemContent={
                <>
                    <h2>Aug 2022 - Nov 2022</h2>
                    <h3>Loyalty Lane (Givex)</h3>
                    <h3>Data Analyst Intern</h3>
                    <p>Lorem ipsum..</p>
                </>
            } side='right' />

            <ExperienceItem itemContent={
                <>
                    <h2>May 2022</h2>
                    <h3>Graduated Emory University</h3>
                    <h3>Mathematics/Computer Science Joint Major B.S.</h3>
                    <h3>Economics Minor</h3>
                    <p>Lorem ipsum..</p>
                </>
            } side='left' />
            <ExperienceItem itemContent={
                <>
                    <h2>Spring 2019 - Spring 2022</h2>
                    <h3>Emory Data Science Club</h3>

                </>
            } side='right' />
        </div>
        </>
    );
}