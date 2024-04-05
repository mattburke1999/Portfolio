import React from 'react'
import ReactDOM from 'react-dom/client'
import HelloPage from './Hello.jsx'
import NavBar from './NavBar.jsx'
import Stack from './Stack.jsx'
// import './main.css'
import { useRef } from 'react';
import styles from './main.module.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);


function App() {
    const homeRef = useRef(null);
    const stackRef = useRef(null);
    // const WorkRef = useRef(null);
    // const ProjectsRef = useRef(null);
  
    const scrollToSection = (sectionRef) => {
      window.scrollTo({
        top: sectionRef.current.offsetTop,
        behavior: 'smooth', // Smooth scroll
      });
    };
    return (
        <>
            <NavBar scrollToSection={scrollToSection} homeRef={homeRef} stackRef={stackRef}/>
            <HelloPage homeRef={homeRef}/>
            <hr className={styles.pageBreak}/>
            <Stack stackRef={stackRef}/>
        </>
    );
}