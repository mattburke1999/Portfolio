import { useRef, useState, useEffect } from 'react';

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

    const refs = [homeRef, stackRef, expRef, projRef];

    const scrollToSection = (sectionRef) => {
        window.scrollTo({
            top: sectionRef.current.offsetTop,
            behavior: 'smooth', // Smooth scroll
        });
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setCurrentSection(entry.target.id);
                }
            },
            {
                threshold: 0.2, // Trigger when 20% of the element is visible
            }
        );
        
        refs.forEach(ref => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        return () => {
            refs.forEach(ref => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        });
        };
    }, []);

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
