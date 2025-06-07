import { useRef, useState } from 'react';

import Background from './Background/Background';
import NavBar from './NavBar/NavBar';
import Hello from './Hello/Hello';
import Stack from './Stack/Stack';
import Experience from './Experience/Experience';
import Projects from './Projects/Projects';


function App() {
    const [currentSection, setCurrentSection] = useState('home');
    const homeRef = useRef(null);
    const stackRef = useRef(null);
    const expRef = useRef(null);
    const projRef = useRef(null);

    const scrollToSection = (sectionRef, page) => {
        window.scrollTo({
            top: sectionRef.current.offsetTop,
            behavior: 'smooth', // Smooth scroll
        });
        setCurrentSection(page);
    };

    

    return (
        <>
            <Background />
            <NavBar 
                homeRef={homeRef} 
                stackRef={stackRef} 
                expRef={expRef}
                projRef={projRef}
                currentSection={currentSection}
                scrollToSection={scrollToSection} />
            <Hello homeRef={homeRef}/>
            <div className='line-break'></div>
            <Stack stackRef={stackRef} />
            <div className='line-break'></div>
            <Experience expRef={expRef} />
            <div className='line-break'></div>
            <Projects projRef={projRef} />
            <div className='line-break'></div>
        </>
    )
}

export default App
