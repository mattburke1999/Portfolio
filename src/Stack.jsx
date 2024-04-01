import styles from './Stack.module.css';
import { useState } from 'react';

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

function PythonExtra() {
    return (
        <div>
            <h3>Python</h3>
            <ul>
                <li>flask</li>
                <li>pandas</li>
                <li>numpy</li>
                <li>matplotlib</li>
                <li>seaborn</li>
                <li>scikit-learn</li>
                <li>tkinter</li>
                <li>sqlalchemy</li>
                <li>BeautifulSoup</li>
                <li>selenium</li>
            </ul>
        </div>
    );

}

export default function Stack({ stackRef }) {
    const [isPythonExtraVisible, setIsPythonExtraVisible] = useState(false);
    return (
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
                    <button className={`${styles.stackItem} ${styles.hoverEffect}`} onClick={() => setIsPythonExtraVisible(true)}>
                        <StackItem image='./py-logo.png' text='Python' hoverEffect={true} />
                    </button>
                    {isPythonExtraVisible && (
                        <div className={styles.modalBackground}>
                            <div className={styles.modal}>
                                <button onClick={() => setIsPythonExtraVisible(false)}>Close Modal</button>
                                <PythonExtra />
                            </div>
                        </div>
                    )}
                    <button className={`${styles.stackItem} ${styles.hoverEffect}`}>
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
        </div>
    );
}