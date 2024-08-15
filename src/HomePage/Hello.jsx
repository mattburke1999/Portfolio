import styles from './Hello.module.css'
import { useState } from 'react';
import Rotatable from '../RotatableComponent/Rotatable';
import PropTypes from 'prop-types';

export default function HelloPage({ homeRef }) {

    const [hingeActive, setHingeActive] = useState(false);
    const [hingeDone, setHingeDone] = useState(false);
    const [rotatable, setRotatable] = useState(false);
    const [fixTimer, setFixTimer] = useState(false);
    const [target_style, setTargetStyle] = useState({});

    const handleMouseOver = () => {
        let hingeRow = document.getElementById('hingeRow');
        // find top of hingeRow relative to it's parent div
        let hingeTop = hingeRow.getBoundingClientRect().top - homeRef.current.getBoundingClientRect().top + 2*hingeRow.clientHeight;
        console.log(hingeTop);
        setTargetStyle({ top: `${hingeTop}px` });
        console.log(target_style);
        setHingeActive(true);
        setTimeout(() => {
            //get the top of hingeRow relative to the viewport
            setHingeDone(true);
            setRotatable(true);
        }, 3200);
    };

    const targetOverlap = () => {
        setRotatable(false);
        setFixTimer(true);
        setTimeout(() => {
            setFixTimer(false);
        }
        , 3000);
    };

    return (
        <>
            <div className={styles.hello} ref={homeRef}>
                <h1 className={styles.name}>
                    <span className={styles.hoverEffect}>Hello,&nbsp;</span>
                    <span className={styles.hoverEffect}>I&apos;m&nbsp;</span>
                    <span className={`${styles.highlight1} ${styles.hoverEffect}`}>Matthew</span>
                    .
                </h1>
                <h1 className={styles.description}>
                    <span className={styles.hoverEffect}>I&apos;m&nbsp;</span>
                    <span className={styles.hoverEffect}>a&nbsp;</span>
                    <span className={`${styles.highlight2} ${styles.hoverEffect}`}>full-stack&nbsp;</span>
                    <span className={styles.hoverEffect}>web&nbsp;</span>
                    <span className={styles.hoverEffect}>developer&nbsp;</span>
                    <span className={styles.hoverEffect}>with&nbsp;</span>
                    <span className={styles.hoverEffect}>a&nbsp;</span>
                    <span className={styles.hoverEffect}>focus</span>
                </h1>
                {!hingeDone ?
                    <h1
                        id='hingeRow'
                        className={`${styles.description1} ${styles.hingeEffect} ${hingeActive ? styles.hingeEffectActive : ''}`}
                        onMouseOver={handleMouseOver}
                    >
                        in <span className={styles.highlight3}>big-data</span> applications.
                    </h1>
                : rotatable ?
                    <>
                        <div className={styles.alert}>
                            <h1>Woah! Looks like that wasn&apos;t</h1>
                            <h1>fully secured. Can you help</h1>
                            <h1>me put it back?</h1>
                        </div>
                        <div id='target' className={styles.target} style={target_style}>Drag here</div>
                        <Rotatable canRotate={rotatable} overlapFunction={targetOverlap}>
                            <h1
                                id='hingedRow'
                                className={`${styles.hinged}`}
                            >
                                in <span className={styles.highlight3}>big-data</span> applications.
                            </h1>
                        </Rotatable>
                    </>
                :
                <>
                    {fixTimer&&(
                        <div className={styles.fixed}>
                            <h1>Thanks, that&apos;s</h1>
                            <h1>much better.</h1>
                        </div>
                    )}
                    <h1 className={styles.description}>
                        <span className={styles.hoverEffect}>in&nbsp;</span>
                        <span className={`${styles.highlight3} ${styles.hoverEffect}`}>big-data&nbsp;</span> 
                        <span className={styles.hoverEffect}>applications.</span>
                    </h1>
                </>
                }
            </div>
        </>
    );
}

HelloPage.propTypes = {
    homeRef: PropTypes.object.isRequired,
};