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

import cssLogo from '../assets/logos/css-logo.png';
import javaLogo from '../assets/logos/java-logo.png';
import pyLogo from '../assets/logos/py-logo.png';
import htmlLogo from '../assets/logos/html-logo.png';
import jsLogo from '../assets/logos/js-logo.png';
import csLogo from '../assets/logos/cs-logo.png';
import gitLogo from '../assets/logos/git-logo.png';
import sqlLogo from '../assets/logos/sql-logo.png';
import rustLogo from '../assets/logos/rust-logo.png';
import azFuncLogo from '../assets/logos/az-func-logo.png';

import { useState, useEffect } from 'react';

export default function Stack({ stackRef }) {

    const [scrolledBy, setScrolledBy] = useState(false);
    const [modalVisible, setModalVisible] = useState(null);

    const modals = [
        {
            name: 'css',
            title: 'CSS',
            img: cssLogo,
            fadeStyle: styles.fadeNW,
            modal: <CSSModal />,
            color: 'blue',
            col: 0
        },
        {
            name: 'java',
            title: 'Java',
            img: javaLogo,
            fadeStyle: styles.fadeW,
            modal: <JavaModal />,
            color: 'red',
            col: 0
        },
        {
            name: 'python',
            title: 'Python',
            img: pyLogo,
            fadeStyle: styles.fadeSW,
            modal: <PythonModal setModalVisible={setModalVisible} />,
            color: 'blue',
            col: 0
        },
        {
            name: 'html',
            title: 'HTML',
            img: htmlLogo,
            fadeStyle: styles.fadeN,
            modal: <HtmlModal />,
            color: 'orange',
            col: 1
        },
        {
            name: 'js',
            title: 'JavaScript',
            img: jsLogo,
            fadeStyle: styles.fadeIn,
            modal: <JSModal />,
            color: 'yellow',
            col: 1
        },
        {
            name: 'csharp',
            title: 'C#',
            img: csLogo,
            fadeStyle: styles.fadeIn,
            modal: <CSharpModal />,
            color: 'purple',
            col: 1
        },
        {
            name: 'git',
            title: 'Git',
            img: gitLogo,
            fadeStyle: styles.fadeS,
            modal: <GitModal />,
            color: 'orange',
            col: 1
        },
        {
            name: 'sql',
            title: 'SQL',
            img: sqlLogo,
            fadeStyle: styles.fadeNE,
            modal: <SQLModal />,
            color: 'blue',
            col: 2
        },
        {
            name: 'rust',
            title: 'Rust',
            img: rustLogo,
            fadeStyle: styles.fadeE,
            modal: <RustModal />,
            color: 'orange',
            col: 2
        },
        {
            name: 'azFunc',
            title: 'Azure Functions',
            img: azFuncLogo,
            fadeStyle: styles.fadeSE,
            modal: <AzFuncModal setModalVisible={setModalVisible} />,
            color: 'blue',
            col: 2
        }
    ];

    const scrollView = () => {
        setScrolledBy(true);
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
                    <StackColumn key={index} modals={modals.filter(modal => modal.col === index)} setModalVisible={setModalVisible} scrolledBy={scrolledBy} />
                ))}
            </div>
            {modals.map((modal) => (
                (modalVisible === modal.name) && (
                    <TechModal key={modal.name} setModalVisible={setModalVisible} color={`var(--${modal.color}-color)`} modalContent={modal.modal} />
                )
            ))}
        </div>
    );
}

function StackColumn({ modals, setModalVisible, scrolledBy }) {
    return (
        <div className={styles.stackColumn}>
            {modals.map((modal) => (
                <StackItem
                    key={modal.name}
                    scrollByClass={scrolledBy ? modal.fadeStyle : ''}
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

function TechModal({ setModalVisible, modalContent, color }) {
    return (
        <>
            <div className={styles.modal} style={{ borderColor: color, boxShadow: `0px 0px 20px ${color}` }}>
                {modalContent}
                <button className={styles.closeButton} onClick={() => setModalVisible(null)}>X</button>
            </div>
            <div className={styles.modalBackdrop} onClick={() => setModalVisible(null)}>
            </div>
        </>
    );
}