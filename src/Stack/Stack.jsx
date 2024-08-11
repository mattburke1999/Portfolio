import styles from './Stack.module.css';
import { useState, useRef } from 'react';
import PythonModal from '../TechModals/Python/PythonModal';
import CSharpModal from '../TechModals/CSharp/CSharpModal';
import SQLModal from '../TechModals/SQL/SQLModal';
import JSModal from '../TechModals/JS/JSModal';
import AzFuncModal from '../TechModals/AzFunc/AzFuncModal';

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

function TechModal({ isModalVisible, setModalVisible, modalName, modalContent }) {
    return (
        <>
            {isModalVisible && (
                <>
                    <div className={styles[modalName]}>
                        {modalContent}
                        <button className={styles.closeButton} onClick={() => setModalVisible(false)}>X</button>
                    </div>
                    <div className={styles.modalBackground}>
                    </div>
                </>
            )}
        </>
    );
}

export default function Stack({ stackRef, pageBreak }) {
    const [isPythonModalVisible, setIsPythonModalVisible] = useState(false);
    const [isCSharpModalVisible, setIsCSharpModalVisible] = useState(false);
    const [isSQLModalVisible, setIsSQLModalVisible] = useState(false);
    const [isJSModalVisible, setIsJSModalVisible] = useState(false);
    const [isAzFuncModalVisible, setIsAzFuncModalVisible] = useState(false);

    const [fallen, setFallen] = useState(false);
    const [pickedUp, setPickedUp] = useState(false);

    const falldownRef = useRef(null);

    const cssFallDown = (element) => {
        if (!fallen && !pickedUp) {    
            let elementPosition = element.getBoundingClientRect();
            let pageBreakPosition = pageBreak.current.getBoundingClientRect();
            let distanceToBottom = pageBreakPosition.bottom - elementPosition.bottom;

            let animation = [
                { transform: `translateY(0)` }
            ];

            for (let i = 1; i <= 8; i++) {
                let decrement = 80 / Math.pow(1.5, i); // Reduce the divisor for more pronounced bounces
                animation.push({ transform: `translateY(${distanceToBottom + decrement}px)` });
                animation.push({ transform: `translateY(${distanceToBottom - decrement}px)` });
            }

            // Ensure the element ends up at distanceToBottom
            animation.push({ transform: `translateY(${distanceToBottom}px)` });

            element.animate(animation, {
                duration: 3500, // Slightly longer duration for more pronounced effect
                iterations: 1,
                easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Custom easing for bouncier effect
            });
            // set the elements position to the bottom of the page
            element.style.transform = `translateY(${distanceToBottom}px)`;
            setFallen(true);
        }
    }

    const draggedOver = () => {
        setPickedUp(true);
        setFallen(false);
        //remove transform style
        let button = falldownRef.current;
        button.style.transform = '';

    }

    return (
        <div className={styles.stackPage} ref={stackRef}>
            <h1 className={styles.stackTitle}>My Tech Stack</h1>
            <div className={styles.stackContainer}>
                <StackColumn >
                    <StackItem image='./java-logo.png' text='Java' />
                    {fallen && (
                        <div 
                        className = {styles.target}
                        onDrop={() => draggedOver()}
                        onDragOver = {(event) => event.preventDefault()}
                    ></div>   
                    )}
                    <button 
                        ref = {falldownRef}
                        className={`${styles.stackItem} ${(!pickedUp) ? styles.hoverEffect: ''}`} 
                        onClick={() => cssFallDown(falldownRef.current)}
                        draggable={fallen && !pickedUp}
                    >
                        <StackItem image='./css-logo.png' text='CSS' hoverEffect={true}/>
                    </button>
                    <button className={`${styles.stackItem} ${styles.hoverEffect}`} onClick={() => setIsJSModalVisible(true)}>
                        <StackItem image='./js-logo.png' text='JavaScript' hoverEffect={true} />
                    </button>
                </StackColumn>
                <StackColumn >
                    <StackItem image='./html-logo.png' text='HTML' />
                    <button className={`${styles.stackItem} ${styles.hoverEffect}`} onClick={() => setIsSQLModalVisible(true)}>
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
                    <button className={`${styles.stackItem} ${styles.hoverEffect}`} onClick={() => setIsAzFuncModalVisible(true)}>
                        <StackItem image='./az-func-logo.png' text='Azure Functions' hoverEffect={true} />
                    </button>
                </StackColumn>
            </div>
            <TechModal isModalVisible={isPythonModalVisible} setModalVisible={setIsPythonModalVisible} modalName='pyModal' modalContent={<PythonModal setIsPythonModalVisible={setIsPythonModalVisible} setIsAzFuncModalVisible={setIsAzFuncModalVisible} />} />
            <TechModal isModalVisible={isCSharpModalVisible} setModalVisible={setIsCSharpModalVisible} modalName='csModal' modalContent={<CSharpModal />} />
            <TechModal isModalVisible={isSQLModalVisible} setModalVisible={setIsSQLModalVisible} modalName='sqlModal' modalContent={<SQLModal />} />
            <TechModal isModalVisible={isJSModalVisible} setModalVisible={setIsJSModalVisible} modalName='jsModal' modalContent={<JSModal />} />
            <TechModal isModalVisible={isAzFuncModalVisible} setModalVisible={setIsAzFuncModalVisible} modalName='azFuncModal' modalContent={<AzFuncModal />} />
        </div>
    );
}