import styles from './Stack.module.css';

import PythonModal from './TechModals/PythonModal';
import CSharpModal from './TechModals/CSharpModal';
import JSModal from './TechModals/JSModal';
import AzFuncModal from './TechModals/AzFuncModal';
import SQLModal from './TechModals/SQLModal';
import HtmlModal from './TechModals/HtmlModal';
import GitModal from './TechModals/GitModal';
import CSSModal from './TechModals/CSSModal';
import JavaModal from './TechModals/JavaModal';
import RustModal from './TechModals/RustModal';

import cssLogo from '../../assets/logos/css-logo.png';
import javaLogo from '../../assets/logos/java-logo.png';
import pyLogo from '../../assets/logos/py-logo.png';
import htmlLogo from '../../assets/logos/html-logo.png';
import jsLogo from '../../assets/logos/js-logo.png';
import csLogo from '../../assets/logos/cs-logo.png';
import gitLogo from '../../assets/logos/git-logo.png';
import sqlLogo from '../../assets/logos/sql-logo.png';
import rustLogo from '../../assets/logos/rust-logo.png';
import azFuncLogo from '../../assets/logos/az-func-logo.png';

import { useState, useEffect } from 'react';

export default function Stack({ stackRef }) {

    const [scrolledBy, setScrolledBy] = useState(false);
    const [modalVisible, setModalVisible] = useState(null);
    const [showStackItems, setShowStackItems] = useState(true);

    const modals = [
        {
            name: 'css',
            title: 'CSS',
            img: cssLogo,
            fadeInStyle: 'fadeInNW',
            fadeOutStyle: showStackItems ? 'fadeOutSE' : 'fadeGone',
            modal: <CSSModal />,
            color: 'blue',
            col: 0
        },
        {
            name: 'java',
            title: 'Java',
            img: javaLogo,
            fadeInStyle: 'fadeInW',
            fadeOutStyle: showStackItems ? 'fadeOutE' : 'fadeGone',
            modal: <JavaModal />,
            color: 'red',
            col: 0
        },
        {
            name: 'python',
            title: 'Python',
            img: pyLogo,
            fadeInStyle: 'fadeInSW',
            fadeOutStyle: showStackItems ? 'fadeOutNE' : 'fadeGone',
            modal: <PythonModal setModalVisible={setModalVisible} />,
            color: 'blue',
            col: 0
        },
        {
            name: 'html',
            title: 'HTML',
            img: htmlLogo,
            fadeInStyle: 'fadeInN',
            fadeOutStyle: showStackItems ? 'fadeOutS' : 'fadeGone',
            modal: <HtmlModal />,
            color: 'orange',
            col: 1
        },
        {
            name: 'js',
            title: 'JavaScript',
            img: jsLogo,
            fadeInStyle: 'fadeIn',
            fadeOutStyle: showStackItems ? 'fadeOut' : 'fadeGone',
            modal: <JSModal />,
            color: 'yellow',
            col: 1
        },
        {
            name: 'csharp',
            title: 'C#',
            img: csLogo,
            fadeInStyle: 'fadeIn',
            fadeOutStyle: showStackItems ? 'fadeOut' : 'fadeGone',
            modal: <CSharpModal />,
            color: 'purple',
            col: 1
        },
        {
            name: 'git',
            title: 'Git',
            img: gitLogo,
            fadeInStyle: 'fadeInS',
            fadeOutStyle: showStackItems ? 'fadeOutN' : 'fadeGone',
            modal: <GitModal />,
            color: 'orange',
            col: 1
        },
        {
            name: 'sql',
            title: 'SQL',
            img: sqlLogo,
            fadeInStyle: 'fadeInNE',
            fadeOutStyle: showStackItems ? 'fadeOutSW' : 'fadeGone',
            modal: <SQLModal />,
            color: 'blue',
            col: 2
        },
        {
            name: 'rust',
            title: 'Rust',
            img: rustLogo,
            fadeInStyle: 'fadeInE',
            fadeOutStyle: showStackItems ? 'fadeOutW' : 'fadeGone',
            modal: <RustModal />,
            color: 'orange',
            col: 2
        },
        {
            name: 'azFunc',
            title: 'Azure Functions',
            img: azFuncLogo,
            fadeInStyle: 'fadeInSE',
            fadeOutStyle: showStackItems ? 'fadeOutNW' : 'fadeGone',
            modal: <AzFuncModal setModalVisible={setModalVisible} />,
            color: 'blue',
            col: 2
        }
    ];

    const itemClick = (name) => {
        setModalVisible(name);
        setTimeout(() => {
            setShowStackItems(false);
        }, 1000);
    }

    const closeModal = () => {
        setModalVisible(prev => prev + '-closing');
        setShowStackItems(true);
        setScrolledBy(true);
        setTimeout(() => {
            setModalVisible(null);
        }, 1000);
    }

    const scrollView = () => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
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
        <div className={styles.stackPage} ref={stackRef}>
            <h1>My Tech Stack</h1>
            <div className={styles.stackContainer}>
                {Array.from({ length: 3 }).map((_, index) => (
                    <StackColumn key={index} modals={modals.filter(modal => modal.col === index)} setModalVisible={itemClick} scrolledBy={scrolledBy} modalVisible={modalVisible}/>
                ))}
            </div>
            {modals.map((modal) => (
                (modalVisible!==null && (modalVisible.replace('-closing', '') === modal.name)) && (
                    <TechModal key={modal.name} closeModal={closeModal} color={`var(--${modal.color}-color)`} modalContent={modal.modal} />
                )
            ))}
        </div>
    );
}

function StackColumn({ modals, setModalVisible, scrolledBy, modalVisible }) {
    return (
        <div className={styles.stackColumn}>
            {modals.map((modal) => (
                <StackItem
                    key={modal.name}
                    scrollByClass={(modalVisible!==null && !modalVisible.includes('-closing')) ? modal.fadeOutStyle : scrolledBy ? modal.fadeInStyle : ''}
                    image={modal.img}
                    text={modal.title}
                    onclick={() => setModalVisible(modal.name)}
                    color={modal.color}
                />
            ))}
        </div>
    );
}

function StackItem({ image, text, scrollByClass, onclick = () => {}, color='black'}) {
    // if hoverEffect is not true add stackItem class to div
    let btnClassName = `${styles.stackItem} ${styles[`${color}`]}`;
    if (scrollByClass) {
        btnClassName += ` ${scrollByClass}`;
    }
    return (
        <button className={btnClassName} onClick={onclick}>
            <img draggable={false} src={image} alt={text} />
            <h3>{text}</h3>
        </button>
    );
}

function TechModal({ closeModal, modalContent, color }) {
    const [closed, setClosed] = useState(false);

    let modalClass = styles.modal;
    if (closed) {
        modalClass += ' fadeOutModal';
    } else {
        modalClass += ' fadeInModal';
    }

    const handleClose = () => {
        setClosed(true);
        closeModal();
    };

    return (
        <>
            <div className={modalClass} style={{ borderColor: color, boxShadow: `0px 0px 20px ${color}` }}>
                {modalContent}
                <button className={styles.closeButton} onClick={handleClose}>X</button>
            </div>
            <div className={styles.modalBackdrop} onClick={handleClose}></div>
        </>
    );
}