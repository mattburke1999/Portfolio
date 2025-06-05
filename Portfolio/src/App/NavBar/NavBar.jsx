import styles from './NavBar.module.css'

export default function NavBar({homeRef, stackRef, expRef, projRef, scrollToSection, currentSection}) {
    return (
        <nav className={styles.navbar}>
            <button className={currentSection === 'home' ? `${styles.blue} ${styles.active}` : styles.blue} onClick={() => scrollToSection(homeRef, 'home')}>Home</button> 
            <button className={currentSection === 'stack' ? `${styles.green} ${styles.active}` : styles.green} onClick={() => scrollToSection(stackRef, 'stack')}>Tech Stack</button>
            <button className={currentSection === 'exp' ? `${styles.pink} ${styles.active}` : styles.pink} onClick={() => scrollToSection(expRef, 'exp')}>Experience</button>
            <button className={currentSection === 'proj' ? `${styles.blue} ${styles.active}` : styles.blue} onClick={() => scrollToSection(projRef, 'proj')}>Projects</button>
        </nav>
    );
}