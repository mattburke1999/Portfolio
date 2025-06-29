import { useRef, useState, useEffect } from 'react';

import Background from './Background/Background';
import NavBar from './NavBar/NavBar';
import Hello from './Hello/Hello';
import Stack from './Stack/Stack';
import Experience from './Experience/Experience';
import Projects from './Projects/Projects';

import NewStack from './NewStack/Stack';

import { getThemeStorage, setTheme } from './utils';


function App() {
    const [currentSection, setCurrentSection] = useState('home');
    const homeRef = useRef(null);
    const stackRef = useRef(null);
    const expRef = useRef(null);
    const projRef = useRef(null);

    const todoRef = useRef(null);
    const keyboardGamesRef = useRef(null);
    const garminMockRef = useRef(null);
    const passwordManagerRef = useRef(null);
    const codeCrackerRef = useRef(null);
    const calculatorRef = useRef(null);

    const refs = [homeRef, stackRef, expRef, projRef];

    const scrollToSection = (sectionRef, moreOffset = false) => {
        window.scrollTo({
            top: sectionRef.current.offsetTop - (moreOffset ? 125 : 75),
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
                threshold: 0.4,
            }
        );
        const observerLast = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setCurrentSection(entry.target.id);
                }
            },
            {
                threshold: 0.2,
            }
        );
        
        refs.forEach((ref, index) => {
            if (ref.current) {
                const observerInstance = index === refs.length - 1 ? observerLast : observer;                
                observerInstance.observe(ref.current);
            }
        });

        const theme = getThemeStorage();
        setTheme(theme);

        return () => {
            refs.forEach((ref, index) => {
                if (ref.current) {
                    const observerInstance = index === refs.length - 1 ? observerLast : observer;                
                    observerInstance.unobserve(ref.current);
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
            <NewStack />
            <div className='line-break'></div>
            <Stack 
                scrollToSection={scrollToSection}
                stackRef={stackRef}
                keyboardGamesRef={keyboardGamesRef}
                todoRef={todoRef}
                garminMockRef={garminMockRef}
                passwordManagerRef={passwordManagerRef}
                codeCrackerRef={codeCrackerRef}
                calculatorRef={calculatorRef}
            />
            <div className='line-break'></div>
            <Experience expRef={expRef} />
            <div className='line-break'></div>
            <Projects 
                scrollToSection={scrollToSection}
                projRef={projRef}
                keyboardGamesRef={keyboardGamesRef}
                todoRef={todoRef}
                garminMockRef={garminMockRef}
                passwordManagerRef={passwordManagerRef}
                codeCrackerRef={codeCrackerRef}
                calculatorRef={calculatorRef}
            />
            <div className='line-break'></div>
        </>
    )
}

export default App
