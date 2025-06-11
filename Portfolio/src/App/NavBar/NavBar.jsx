import styles from './NavBar.module.css'

import { useState } from 'react';

export default function NavBar({homeRef, stackRef, expRef, projRef, scrollToSection, currentSection}) {
    const isMobile = window.innerWidth <= 768;
    console.log(`isMobile: ${isMobile}`);
    const [isNavOpen, setIsNavOpen] = useState(!isMobile);
    console.log(`isNavOpen: ${isNavOpen}`);

    const sectionClick = (sectionRef) => {
        if (isMobile) {
            setIsNavOpen(false);
        }
        scrollToSection(sectionRef);
    }

    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.navLogo}>
                    <img src='/name-logo.png' alt='Name Logo'/>
                    <h1>Matthew Burke Dev</h1>
                </div>
                {isNavOpen ? 
                    <NavBtns 
                        homeRef={homeRef} 
                        stackRef={stackRef} 
                        expRef={expRef} 
                        projRef={projRef} 
                        sectionClick={sectionClick} 
                        currentSection={currentSection} 
                        isMobile={isMobile}
                        setIsNavOpen={setIsNavOpen}
                    />
                :
                ! isNavOpen && <i class="fa-solid fa-bars" onClick={() => setIsNavOpen(true)}></i>
                }
            </nav>
        </>
    );
}

function NavBtns({homeRef, stackRef, expRef, projRef, sectionClick, currentSection, isMobile, setIsNavOpen}) {
    return (
        <div className={isMobile ? styles.mobileNavBtns : styles.navBtns}>
            {isMobile && <div className={'line-break' + ' ' + styles.lineBreak}></div>}
            <button className={currentSection === 'home' ? `${styles.blue} ${styles.active}` : styles.blue} onClick={() => sectionClick(homeRef)}>Home</button> 
            <button className={currentSection === 'stack' ? `${styles.green} ${styles.active}` : styles.green} onClick={() => sectionClick(stackRef)}>Tech Stack</button>
            <button className={currentSection === 'exp' ? `${styles.pink} ${styles.active}` : styles.pink} onClick={() => sectionClick(expRef)}>Experience</button>
            <button className={currentSection === 'proj' ? `${styles.blue} ${styles.active}` : styles.blue} onClick={() => sectionClick(projRef)}>Projects</button>
            {isMobile && <span className={styles.closeBtn} onClick={() => setIsNavOpen(false)}>X</span>}
        </div>
    )
}