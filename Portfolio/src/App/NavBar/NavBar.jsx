import styles from './NavBar.module.css'

export default function NavBar({homeRef, stackRef, expRef, projRef, scrollToSection, currentSection}) {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navLogo}>
                <img src='/name-logo.png' alt='Name Logo'/>
                <h1>Matthew Burke Dev</h1>
            </div>
            <div className={styles.navBtns}>
                <button className={currentSection === 'home' ? `${styles.blue} ${styles.active}` : styles.blue} onClick={() => scrollToSection(homeRef)}>Home</button> 
                <button className={currentSection === 'stack' ? `${styles.green} ${styles.active}` : styles.green} onClick={() => scrollToSection(stackRef)}>Tech Stack</button>
                <button className={currentSection === 'exp' ? `${styles.pink} ${styles.active}` : styles.pink} onClick={() => scrollToSection(expRef)}>Experience</button>
                <button className={currentSection === 'proj' ? `${styles.blue} ${styles.active}` : styles.blue} onClick={() => scrollToSection(projRef)}>Projects</button>
            </div>
        </nav>
    );
}