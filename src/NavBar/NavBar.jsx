import styles from './NavBar.module.css'
import PropTypes from 'prop-types';

export default function NavBar({homeRef, stackRef, expRef, scrollToSection}) {
    return (
        <nav className={styles.navbar}>
            <button className={styles.link} onClick={() => scrollToSection(homeRef)}>Home</button> 
            <button className={styles.link} onClick={() => scrollToSection(stackRef)}>Tech Stack</button>
            <button className={styles.link} onClick={() => scrollToSection(expRef)}>Experience</button>
            <button className={styles.link} >Projects</button>
        </nav>
    );
}

NavBar.propTypes = {
    homeRef: PropTypes.object.isRequired,
    stackRef: PropTypes.object.isRequired,
    expRef: PropTypes.object.isRequired,
    scrollToSection: PropTypes.func.isRequired
};