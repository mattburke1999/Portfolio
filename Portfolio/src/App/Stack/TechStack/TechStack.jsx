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

import { useRef, useEffect } from 'react';

export default function TechStack({ 
    modalVisible, openModal, closeModal, modalFadeClass, useFadeInClass, scrollToProject, keyboardGamesRef, 
    todoRef, garminMockRef, passwordManagerRef, codeCrackerRef, calculatorRef  
}) {

    const modals = [
        {
            name: 'java',
            title: 'Java',
            img: javaLogo,
            posStyle: styles.NW,
            fadeInStyle: 'fadeInNW',
            color: 'red',
            modal: <JavaModal/>
        },
        {
            name: 'python',
            title: 'Python',
            img: pyLogo,
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
            posStyle: styles.NE,
            fadeInStyle: 'fadeInNE',
            color: 'blue',
            modal: <HtmlModal />
        },
        {
            name: 'js',
            title: 'JavaScript',
            img: jsLogo,
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
            posStyle: styles.S,
            fadeInStyle: 'fadeInS',
            color: 'blue',
            modal: <SQLModal />
        },
        {
            name: 'rust',
            title: 'Rust',
            img: rustLogo,
            posStyle: styles.SW,
            fadeInStyle: 'fadeInSW',
            color: 'orange',
            modal: <RustModal scrollToProject={scrollToProject} keyboardGamesRef={keyboardGamesRef} />
        },
        {
            name: 'azFunc',
            title: 'Azure',
            img: azFuncLogo,
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
                        <StackItem key={index} modal={modal} containerRef={containerRef} openModal={openModal} useFadeInClass={useFadeInClass} />
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
const speed = .5;
function moveItem(itemRef, containerRect) {
    const item = itemRef.current;
    const innerItem = item.querySelector(`.${styles.stackItem}`);
    const innerItemComputed = window.getComputedStyle(innerItem);
    const itemWidth = parseFloat(innerItemComputed.width);
    const itemHeight = parseFloat(innerItemComputed.height);
    const itemRect = item.getBoundingClientRect();

    const computedStyle = window.getComputedStyle(item);

    let top = parseFloat(computedStyle.top) || 0;
    let left = parseFloat(computedStyle.left) || 0;

    // Determine which edge the item is touching (allow 1px wiggle room)
    const touchingTop = Math.abs(itemRect.top - containerRect.top) < 1;
    const touchingRight = Math.abs((itemRect.left + itemWidth) - containerRect.right) < 1;
    const touchingBottom = Math.abs((itemRect.top + itemHeight) - containerRect.bottom) < 1;
    const touchingLeft = Math.abs(itemRect.left - containerRect.left) < 1;
    if (touchingTop && !touchingRight) {
        left += speed; // Move right
    } else if (touchingRight && !touchingBottom) {
        top += speed; // Move down
    } else if (touchingBottom && !touchingLeft) {
        left -= speed; // Move left
    } else if (touchingLeft) {
        top -= speed; // Move up
    }

    item.style.top = top + 'px';
    item.style.left = left + 'px';
}

function StackItem({ modal, containerRef, openModal, useFadeInClass }) {

    const itemRef = useRef(null);
    

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
                moveItem(itemRef, containerRect);
                requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
        }, 1250); // Start animation after 1.25 seconds
    }, []);


    return (
        <div className={`${styles.stackItemWrapper} ${modal.posStyle}`} ref={itemRef} >
            <div className={`${styles.stackItem} ${styles[modal.color]} ${useFadeInClass ? modal.fadeInStyle : ''}`} onClick={() => openModal(modal.name)}>
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