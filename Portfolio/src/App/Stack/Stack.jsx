import styles from './Stack.module.css';
import PythonModal from './TechModals/PythonModal';

import { useState, useEffect } from 'react';

export default function Stack({ stackRef }) {

    const [scrolledBy, setScrolledBy] = useState(false);
    const [modalVisible, setModalVisible] = useState(null);

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
                <div className={styles.stackColumn}>
                    <StackItem scrollByClass={scrolledBy ? styles.fadeNW : ''} image='./java-logo.png' text='Java' />
                    <StackItem scrollByClass={scrolledBy ? styles.fadeW : ''} image='./css-logo.png' text='CSS'/>
                    <StackItem scrollByClass={scrolledBy ? styles.fadeSW : ''} image='./js-logo.png' text='JavaScript' hoverEffect={true} />
                </div>
                <div className={styles.stackColumn}>
                    <StackItem scrollByClass={scrolledBy ? styles.fadeN : ''} image='./html-logo.png' text='HTML' />
                    <StackItem scrollByClass={scrolledBy ? styles.fadeIn : ''} image='./sql-logo.png' text='SQL' hoverEffect={true} />
                    <StackItem scrollByClass={scrolledBy ? styles.fadeIn : ''} image='./py-logo.png' text='Python' hoverEffect={true} onclick={() => setModalVisible('python')}/>
                    <StackItem scrollByClass={scrolledBy ? styles.fadeS : ''} image='./cs-logo.png' text='C#' hoverEffect={true} />
                </div>
                <div className={styles.stackColumn}>
                    <StackItem scrollByClass={scrolledBy ? styles.fadeNE : ''} image='./git-logo.png' text='git' />
                    <StackItem scrollByClass={scrolledBy ? styles.fadeE : ''} image='./rust-logo.png' text='Rust' />
                    <StackItem scrollByClass={scrolledBy ? styles.fadeSE : ''} image='./az-func-logo.png' text='Azure Functions' hoverEffect={true} />
                </div>
            </div>
            <TechModal isModalVisible={modalVisible === 'python'} setModalVisible={setModalVisible} modalName='pyModal' modalContent={<PythonModal setModalVisible={setModalVisible} />} />
        </div>
    );
}

function StackItem({ image, text, scrollByClass, onclick = () => {}, hoverEffect = false }) {
    // if hoverEffect is not true add stackItem class to div
    let btnClassName = styles.stackItem;
    if (hoverEffect) {
        btnClassName += ` ${styles.hoverEffect}`;
    }
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

function TechModal({ isModalVisible, setModalVisible, modalName, modalContent }) {
    return (
        <>
            {isModalVisible && (
                <>
                    <div className={styles[modalName]}>
                        {modalContent}
                        <button className={styles.closeButton} onClick={() => setModalVisible(null)}>X</button>
                    </div>
                    <div className={styles.modalBackground}>
                    </div>
                </>
            )}
        </>
    );
}