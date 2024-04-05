import styles from './Stack.module.css';
import { useState } from 'react';
import PythonModal from './TechModals/PythonModal';
import CSharpModal from './TechModals/CSharpModal';

function StackItem({ image, text, hoverEffect = false }) {
    // if hoverEffect is true, name the div className stackItem.hoverEffect, else name it stackItem
    const divClassName = hoverEffect ? '' : styles.stackItem;
    return (
        <div className={divClassName}>
            <img className={styles.stackLogo} src={image} alt='stack-item' />
            <h3 className={styles.description}>{text}</h3>
        </div>
    );
}

function StackColumn({ children }) {
    return (
        <div className={styles.stackColumn}>
            {children}
        </div>
    );
}

export default function Stack({ stackRef }) {
    const [isPythonExtraVisible, setIsPythonModalVisible] = useState(false);
    const [isCSharpExtraVisible, setIsCSharpModalVisible] = useState(false);
    return (
        <>
            <div className={styles.stackPage} ref={stackRef}>
                <h1 className={styles.stackTitle}>My Tech Stack</h1>
                <div className={styles.stackContainer}>
                    <StackColumn >
                        <StackItem image='./java-logo.png' text='Java' />
                        <StackItem image='./css-logo.png' text='CSS' />
                        <button className={`${styles.stackItem} ${styles.hoverEffect}`}>
                            <StackItem image='./js-logo.png' text='JavaScript' hoverEffect={true} />
                        </button>
                    </StackColumn>
                    <StackColumn >
                        <StackItem image='./html-logo.png' text='HTML' />
                        <button className={`${styles.stackItem} ${styles.hoverEffect}`}>
                            <StackItem image='./sql-logo.png' text='SQL' hoverEffect={true} />
                        </button>
                        <button className={`${styles.stackItem} ${styles.hoverEffect}`} onClick={() => setIsPythonModalVisible(true)}>
                            <StackItem image='./py-logo.png' text='Python' hoverEffect={true} />
                        </button>

                        <button className={`${styles.stackItem} ${styles.hoverEffect}`} onClick={() => setIsCSharpModalVisible(true)}>
                            <StackItem image='./cs-logo.png' text='C#' hoverEffect={true} />
                        </button>
                    </StackColumn>
                    <StackColumn >
                        <StackItem image='./git-logo.png' text='git' />
                        <StackItem image='./r-logo.png' text='R' />
                        <button className={`${styles.stackItem} ${styles.hoverEffect}`}>
                            <StackItem image='./az-func-logo.png' text='Azure Functions' hoverEffect={true} />
                        </button>
                    </StackColumn>
                </div>
                {isPythonExtraVisible && (
                    <>
                        <div className={styles.pyModal}>
                            <PythonModal />
                            <button className={styles.closeButton} onClick={() => setIsPythonModalVisible(false)}>X</button>
                        </div>
                        <div className={styles.modalBackground}>
                        </div>
                    </>
                )}
                {isCSharpExtraVisible && (
                    <>
                        <div className={styles.csModal}>
                            <CSharpModal />
                            <button className={styles.closeButton} onClick={() => setIsCSharpModalVisible(false)}>X</button>
                        </div>
                        <div className={styles.modalBackground}>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}