import styles from './NavBar.module.css'

export default function NavBar({homeRef, stackRef, expRef, scrollToSection}) {
    return (
        <nav className={styles.navbar}>
            <button onClick={() => scrollToSection(homeRef)}>Home</button> 
            <button onClick={() => scrollToSection(stackRef)}>Tech Stack</button>
            <button onClick={() => scrollToSection(expRef)}>Experience</button>
            <button>Projects</button>
        </nav>
    );
}