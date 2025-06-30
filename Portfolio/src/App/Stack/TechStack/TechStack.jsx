import styles from './TechStack.module.css';

import javaLogo from '../../../assets/logos/java-logo.png';
import JavaModal from './TechModals/JavaModal';
import pyLogo from '../../../assets/logos/py-logo.png';
import PythonModal from './TechModals/PythonModal';
import htmlCSSLogo from '../../../assets/logos/html-css-logo.png';
import HtmlModal from './TechModals/HtmlModal';
import jsLogo from '../../../assets/logos/js-logo.png';
import JSModal from './TechModals/JSModal';
import csLogo from '../../../assets/logos/cs-logo.png';
import CSharpModal from './TechModals/CSharpModal';
import sqlLogo from '../../../assets/logos/sql-logo.png';
import SQLModal from './TechModals/SQLModal';
import rustLogo from '../../../assets/logos/rust-logo.png';
import RustModal from './TechModals/RustModal';
import azFuncLogo from '../../../assets/logos/az-func-logo.png';
import AzFuncModal from './TechModals/AzFuncModal';

import { moveItem } from '../../utils';

import { useRef, useEffect } from 'react';

export default function TechStack({ 
    modalVisible, openModal, closeModal, modalFadeClass, stackItemFadeClass, scrollToProject, keyboardGamesRef, 
    todoRef, garminMockRef, passwordManagerRef, codeCrackerRef, calculatorRef  
}) {

    const modals = [
        {
            name: 'java',
            title: 'Java',
            img: javaLogo,
            fadeDir: 'NW',
            posStyle: styles.NW,
            fadeInStyle: 'fadeInNW',
            color: 'red',
            modal: <JavaModal/>
        },
        {
            name: 'python',
            title: 'Python',
            img: pyLogo,
            fadeDir: 'N',
            posStyle: styles.N,
            fadeInStyle: 'fadeInN',
            color: 'blue',
            modal: <PythonModal 
                setModalVisible={openModal}
                scrollToProject={scrollToProject} keyboardGamesRef={keyboardGamesRef} 
                todoRef={todoRef} garminMockRef={garminMockRef} passwordManagerRef={passwordManagerRef} 
            />
        },
        {
            name: 'html_css',
            title: 'HTML/CSS',
            img: htmlCSSLogo,
            fadeDir: 'NE',
            posStyle: styles.NE,
            fadeInStyle: 'fadeInNE',
            color: 'blue',
            modal: <HtmlModal />
        },
        {
            name: 'js',
            title: 'JavaScript',
            img: jsLogo,
            fadeDir: 'E',
            posStyle: styles.E,
            fadeInStyle: 'fadeInE',
            color: 'yellow',
            modal: <JSModal 
                scrollToProject={scrollToProject} keyboardGamesRef={keyboardGamesRef} 
                todoRef={todoRef} codeCrackerRef={codeCrackerRef} calculatorRef={calculatorRef}
            />
        },
        {
            name: 'csharp',
            title: 'C#',
            img: csLogo,
            fadeDir: 'SE',
            posStyle: styles.SE,
            fadeInStyle: 'fadeInSE',
            color: 'purple',
            modal: <CSharpModal 
                setModalVisible={openModal} 
                scrollToProject={scrollToProject} todoRef={todoRef} garminMockRef={garminMockRef}
            />,
        },
        {
            name: 'sql',
            title: 'SQL',
            img: sqlLogo,
            fadeDir: 'S',
            posStyle: styles.S,
            fadeInStyle: 'fadeInS',
            color: 'blue',
            modal: <SQLModal />
        },
        {
            name: 'rust',
            title: 'Rust',
            img: rustLogo,
            fadeDir: 'SW',
            posStyle: styles.SW,
            fadeInStyle: 'fadeInSW',
            color: 'orange',
            modal: <RustModal scrollToProject={scrollToProject} keyboardGamesRef={keyboardGamesRef} />
        },
        {
            name: 'azFunc',
            title: 'Azure',
            img: azFuncLogo,
            fadeDir: 'W',
            posStyle: styles.W,
            fadeInStyle: 'fadeInW',
            color: 'blue',
            modal: <AzFuncModal setModalVisible={openModal } />
        }
    ];

    const containerRef = useRef(null);

    return (
        <div className={styles.techStack}>
            <div className={styles.stackContainer} ref={containerRef}>
                {modals.map((modal, index) => (
                    <>
                        {modalVisible === null && <StackItem key={index} modal={modal} containerRef={containerRef} openModal={openModal} stackItemFadeClass={stackItemFadeClass} />}
                        {modalVisible === modal.name && 
                            <TechModal 
                                closeModal={closeModal}
                                content={modal.modal} 
                                color={modal.color} 
                                modalClass={`${styles.modal} ${modalFadeClass}`} 
                            />
                        }
                    </>
                ))}
            </div>
        </div>
    );
}


function StackItem({ modal, containerRef, openModal, stackItemFadeClass }) {

    const itemRef = useRef(null);

    let itemClass = `${styles.stackItem} ${styles[modal.color]}`;
    if (stackItemFadeClass) {
        itemClass += ` ${stackItemFadeClass}`;
    }
    
    useEffect(() => {
        // Initialize positions from CSS to inline style
        const item = itemRef.current;
        if (item) {
            const computedStyle = window.getComputedStyle(item);
            item.style.top = computedStyle.top;
            item.style.left = computedStyle.left;
        }

        setTimeout(() => {
            const animate = () => {
                const containerRect = containerRef.current.getBoundingClientRect();
                moveItem(itemRef, containerRect, styles.stackItem);
                requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
        }, 1250); // Start animation after 1.25 seconds
    }, []);



    return (
        <div className={`${styles.stackItemWrapper} ${styles[modal.fadeDir]}`} ref={itemRef} >
            <div className={itemClass} onClick={() => openModal(modal.name)}>
                <img draggable={false} src={modal.img} alt={modal.title}/>
                <h3>{modal.title}</h3>
            </div>
        </div>
    );
}

function TechModal({ closeModal, content, color, modalClass }) {
    return (
        <>
            <div className={modalClass} style={{ borderColor: color, boxShadow: `0px 0px 20px ${color}` }}>
                {content}
                <button className={styles.closeButton} onClick={closeModal}>X</button>
            </div>
            <div className={styles.modalBackdrop} onClick={closeModal}></div>
        </>
    );
}