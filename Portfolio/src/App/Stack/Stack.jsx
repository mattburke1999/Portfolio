import styles from "./Stack.module.css"

import stackStyles from './TechStack/TechStack.module.css';

import AboutMeCard from "./AboutMeCard/AboutMeCard"
import TechStack from "./TechStack/TechStack"

import { useState } from "react";

import { isChildOfModal } from "../utils";

export default function Stack({ stackRef, scrollToSection, keyboardGamesRef, todoRef, garminMockRef, passwordManagerRef, codeCrackerRef, calculatorRef }) {
    const [modalVisible, setModalVisible] = useState(null);
    const [modalFadeClass, setModalFadeClass] = useState(null);
    const [stackItemFadeClass, setStackItemFadeClass] = useState(null);
    const aboutMeCardFadeClass = stackItemFadeClass ? stackItemFadeClass + 'Modal' : null;
    const [stackPageClick, setStackPageClick] = useState(null);


    const openModal = (modalName) => {
        setModalFadeClass('fadeInModal');
        setStackItemFadeClass('fadeOut');
        setTimeout(() => {
            setModalVisible(modalName);
        }, 1000);
        setStackPageClick(() => {
            return (e) => {
                if (!isChildOfModal(e.target, stackStyles.modal)) {
                    closeModal();
                }
            }
        });
    }

    const closeModal = () => {
        setModalFadeClass('fadeOutModal');
        setStackItemFadeClass('fadeIn');
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
        setStackItemFadeClass('fadeIn');
        scrollToSection(ref, true);
    }

    return (
        <div className={styles.stackPage} onClick={stackPageClick} ref={stackRef}>
            {modalVisible === null && <AboutMeCard fadeClass={aboutMeCardFadeClass}/>}
            <TechStack 
                modalVisible={modalVisible} 
                modalFadeClass={modalFadeClass} 
                openModal={openModal} 
                closeModal={closeModal} 
                stackItemFadeClass={stackItemFadeClass}
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