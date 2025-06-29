import styles from './NavBar.module.css'

import { useState } from 'react';

import ThemeSwitch from './ThemeSwitch/ThemeSwitch';


export default function NavBar({homeRef, stackRef, expRef, projRef, scrollToSection, currentSection}) {
    const isMobile = window.innerWidth <= 768;
    console.log(`isMobile: ${isMobile}`);
    const [isNavOpen, setIsNavOpen] = useState(!isMobile);
    const [showBtns, setShowBtns] = useState(!isMobile);
    console.log(`isNavOpen: ${isNavOpen}`);

    const sectionClick = (sectionRef) => {
        if (isMobile) {
            setIsNavOpen(false);
        }
        scrollToSection(sectionRef);
    }
    const openNav = () => {
        setIsNavOpen(true);
        setTimeout(() => {
            setShowBtns(true);
        }, 200);
    }

    const closeNav = () => {
        setShowBtns(false);
        setIsNavOpen(false);
    }

    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.navLogo}>
                    <img src='/images/name-logo.png' alt='Name Logo'/>
                    <h1>Burke Dev</h1>
                </div>
                {isNavOpen ? 
                <>
                        <NavBtns 
                            homeRef={homeRef} 
                            stackRef={stackRef} 
                            expRef={expRef} 
                            projRef={projRef} 
                            sectionClick={sectionClick} 
                            currentSection={currentSection} 
                            isMobile={isMobile}
                            showBtns={showBtns}
                        />
                        {isMobile && <span className={styles.closeBtn} onClick={closeNav}>X</span>}
                </>
                :
                    <>
                        <ThemeSwitch/>
                        <i className="fa-solid fa-bars" onClick={openNav}></i>
                    </>
                }
            </nav>
        </>
    );
}

function NavBtns({homeRef, stackRef, expRef, projRef, sectionClick, currentSection, isMobile, showBtns}) {
    const navs = [
        { ref: homeRef, label: 'Home', section: 'home', style: styles.blue },
        { ref: stackRef, label: 'About Me', section: 'stack', style: styles.green },
        { ref: expRef, label: 'Experience', section: 'exp', style: styles.pink },
        { ref: projRef, label: 'Projects', section: 'proj', style: styles.blue }
    ]
    navs.forEach(nav => {
        if (currentSection === nav.section) {
            nav.style += ` ${styles.active}`;
        }
        if (isMobile && showBtns) {
            nav.style += ` ${styles.show}`;
        }
    });

    return (
        <div className={isMobile ? styles.mobileNavBtns : styles.navBtns}>
            {isMobile && <div className={'line-break' + ' ' + styles.lineBreak}></div>}
            {navs.map(nav => (
                <button 
                    key={nav.section} 
                    className={nav.style} 
                    onClick={() => sectionClick(nav.ref)}
                >
                    {nav.label}
                </button>
            ))}
            {!isMobile && <ThemeSwitch/>}
        </div>
    )
}