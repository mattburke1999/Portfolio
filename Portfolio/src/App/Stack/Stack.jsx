import styles from "./Stack.module.css"

import stackStyles from './TechStack/TechStack.module.css';

import AboutMeCard from "./AboutMeCard/AboutMeCard"
import TechStack from "./TechStack/TechStack"

import { useState, useEffect } from "react";

const stackClasses = [stackStyles.modal, stackStyles.stackItemWrapper]

export default function Stack({ stackRef, scrollToSection, keyboardGamesRef, todoRef, garminMockRef, passwordManagerRef, codeCrackerRef, calculatorRef }) {
    const [modalVisible, setModalVisible] = useState(null);
    const [modalFadeClass, setModalFadeClass] = useState(null);
    const [aboutMeCardFadeClass, setAboutMeCardFadeClass] = useState(null);
    const [stackPageClick, setStackPageClick] = useState(null);
    const [scrolledBy, setScrolledBy] = useState(false);


    const openModal = (modalName) => {
        setModalFadeClass('fadeInModal');
        setAboutMeCardFadeClass('fadeOutModal');
        setModalVisible(modalName);
        setStackPageClick(() => {
            return (e) => {
                if (!isChildOfModalOrStackItem(e.target)) {
                    closeModal();
                }
            }
        });
    }

    const closeModal = () => {
        setModalFadeClass('fadeOutModal');
        setAboutMeCardFadeClass('fadeInModal');
        setStackPageClick(null);
        setTimeout(() => {
            setModalVisible(null);
            setModalFadeClass(null);
        }, 1000);
    }

    const scrollToProject = (ref) => {
        setModalVisible(null);
        setModalFadeClass(null);
        setStackPageClick(null);
        setAboutMeCardFadeClass('fadeInModal');
        scrollToSection(ref, true);
    }

    const isChildOfModalOrStackItem = (targetElement) => {
        // check if any class in targetElement's classList matches any class in stackClasses
        if (stackClasses.some(cls => targetElement.classList.contains(cls))) {
            return true;
        } else if (targetElement.parentElement) {
            return isChildOfModalOrStackItem(targetElement.parentElement);
        }
        return false;
    }

    const scrollView = () => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setAboutMeCardFadeClass('fadeInModal');
                    setScrolledBy(true);
                    observer.disconnect(); // Stop observing after first intersection
                }
            },
            {
                threshold: 0.2, // Trigger when 20% of the element is visible
            }
        );

        if (stackRef.current) {
            observer.observe(stackRef.current);
        }

        return () => {
            if (stackRef.current) {
                observer.unobserve(stackRef.current);
            }
        };
    }

    useEffect(() => {
        window.addEventListener('scroll', scrollView);

        return () => {
            window.removeEventListener('scroll', scrollView);
        };
    }, []);

    return (
        <div className={styles.stackPage} onClick={stackPageClick} ref={stackRef}>
            {modalVisible === null && <AboutMeCard fadeClass={aboutMeCardFadeClass}/>}
            <TechStack 
                modalVisible={modalVisible} 
                modalFadeClass={modalFadeClass} 
                openModal={openModal} 
                closeModal={closeModal} 
                useFadeInClass={scrolledBy} 
                scrollToProject={scrollToProject}
                keyboardGamesRef={keyboardGamesRef}
                todoRef={todoRef}
                garminMockRef={garminMockRef}
                passwordManagerRef={passwordManagerRef}
                codeCrackerRef={codeCrackerRef}
                calculatorRef={calculatorRef}
            />
        </div>
    )
}