import React from 'react'
import ReactDOM from 'react-dom/client'
import HelloPage from './HomePage/Hello.jsx'
import NavBar from './NavBar/NavBar.jsx'
import Stack from './Stack/Stack.jsx'
import Experience from './Experience/Experience.jsx'
// import './main.css'
import { useRef } from 'react';
import styles from './main.module.css';
import Background from './Background/Background.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);


function App() {
    const homeRef = useRef(null);
    const stackRef = useRef(null);
    const expRef = useRef(null);
    // const ProjectsRef = useRef(null);
  
    const scrollToSection = (sectionRef) => {
      window.scrollTo({
        top: sectionRef.current.offsetTop,
        behavior: 'smooth', // Smooth scroll
      });
    };
    return (
        <>
            <Background className={styles.bg}/>
            <NavBar scrollToSection={scrollToSection} homeRef={homeRef} stackRef={stackRef} expRef={expRef}/>
            <HelloPage homeRef={homeRef}/>
            <hr className={styles.pageBreak}/>
            <Stack stackRef={stackRef}/>
            <hr className={styles.pageBreak}/>
            <Experience expRef={expRef}/>

        </>
    );
}