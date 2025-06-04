import styles from './Stack.module.css';

import PythonModal from './TechModals/PythonModal';
import CSharpModal from './TechModals/CSharpModal';
import JSModal from './TechModals/JSModal';
import AzFuncModal from './TechModals/AzFuncModal';
import SQLModal from './TechModals/SQLModal';
import HtmlModal from './TechModals/HtmlModal';
import GitModal from './TechModals/GitModal';

import { useState, useEffect } from 'react';

export default function Stack({ stackRef }) {

    const [scrolledBy, setScrolledBy] = useState(false);
    const [modalVisible, setModalVisible] = useState(null);

    const modals = [
        {
            name: 'java',
            title: 'Java',
            img: './java-logo.png',
            fadeStyle: styles.fadeNW,
            modal: null,
            color: 'red',
            col: 0
        },
        {
            name: 'css',
            title: 'CSS',
            img: './css-logo.png',
            fadeStyle: styles.fadeW,
            modal: null,
            color: 'blue',
            col: 0
        },
        {
            name: 'js',
            title: 'JavaScript',
            img: './js-logo.png',
            fadeStyle: styles.fadeIn,
            modal: <JSModal />,
            color: 'yellow',
            col: 0
        },
        {
            name: 'html',
            title: 'HTML',
            img: './html-logo.png',
            fadeStyle: styles.fadeN,
            modal: <HtmlModal />,
            color: 'orange',
            col: 1
        },
        {
            name: 'sql',
            title: 'SQL',
            img: './sql-logo.png',
            fadeStyle: styles.fadeIn,
            modal: <SQLModal />,
            color: 'blue',
            col: 1
        },
        {
            name: 'python',
            title: 'Python',
            img: './py-logo.png',
            fadeStyle: styles.fadeIn,
            modal: <PythonModal setModalVisible={setModalVisible} />,
            color: 'blue',
            col: 1
        },
        {
            name: 'csharp',
            title: 'C#',
            img: './cs-logo.png',
            fadeStyle: styles.fadeS,
            modal: <CSharpModal />,
            color: 'purple',
            col: 1
        },       
        {
            name: 'git',
            title: 'Git',
            img: './git-logo.png',
            fadeStyle: styles.fadeNE,
            modal: <GitModal />,
            color: 'orange',
            col: 2
        },
        {
            name: 'rust',
            title: 'Rust',
            img: './rust-logo.png',
            fadeStyle: styles.fadeE,
            modal: null,
            color: 'orange',
            col: 2
        },
        {
            name: 'azFunc',
            title: 'Azure Functions',
            img: './az-func-logo.png',
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