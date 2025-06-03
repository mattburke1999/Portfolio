import { useRef } from 'react';

import Background from './Background/Background';
import NavBar from './NavBar/NavBar';
import Hello from './Hello/Hello';
import Stack from './Stack/Stack';


function App() {
    const homeRef = useRef(null);
    const stackRef = useRef(null);
    const expRef = useRef(null);

    const scrollToSection = (sectionRef) => {
        window.scrollTo({
            top: sectionRef.current.offsetTop,
            behavior: 'smooth', // Smooth scroll
        });
    };

    return (
        <>
            <Background />
            <NavBar 
                homeRef={homeRef} 
                stackRef={stackRef} 
                expRef={expRef} 
                scrollToSection={scrollToSection} />
            <Hello homeRef={homeRef}/>
            <Stack stackRef={stackRef} />
        </>
    )
}

export default App
