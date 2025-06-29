import styles from './TechStack.module.css';

import javaLogo from '../../../assets/logos/java-logo.png';
import pyLogo from '../../../assets/logos/py-logo.png';
import htmlCSSLogo from '../../../assets/logos/html-css-logo.png';
import jsLogo from '../../../assets/logos/js-logo.png';
import csLogo from '../../../assets/logos/cs-logo.png';
import sqlLogo from '../../../assets/logos/sql-logo.png';
import rustLogo from '../../../assets/logos/rust-logo.png';
import azFuncLogo from '../../../assets/logos/az-func-logo.png';

import { useRef, useEffect } from 'react';

export default function TechStack() {

    const modals = [
        {
            name: 'java',
            title: 'Java',
            img: javaLogo,
            posStyle: styles.NW,
            fadeInStyle: 'fadeInNW',
            color: 'red',
        },
        {
            name: 'python',
            title: 'Python',
            img: pyLogo,
            posStyle: styles.N,
            fadeInStyle: 'fadeInN',
            color: 'blue',
        },
        {
            name: 'html_css',
            title: 'HTML/CSS',
            img: htmlCSSLogo,
            posStyle: styles.NE,
            fadeInStyle: 'fadeInNE',
            color: 'orange',
        },
        {
            name: 'js',
            title: 'JavaScript',
            img: jsLogo,
            posStyle: styles.E,
            fadeInStyle: 'fadeInE',
            color: 'yellow',
        },
        {
            name: 'csharp',
            title: 'C#',
            img: csLogo,
            posStyle: styles.SE,
            fadeInStyle: 'fadeInSE',
            color: 'purple',
        },
        {
            name: 'sql',
            title: 'SQL',
            img: sqlLogo,
            posStyle: styles.S,
            fadeInStyle: 'fadeInS',
            color: 'blue',
        },
        {
            name: 'rust',
            title: 'Rust',
            img: rustLogo,
            posStyle: styles.SW,
            fadeInStyle: 'fadeInSW',
            color: 'orange',
        },
        {
            name: 'azFunc',
            title: 'Azure Functions',
            img: azFuncLogo,
            posStyle: styles.W,
            fadeInStyle: 'fadeInW',
            color: 'blue',
        }
    ];

    const containerRef = useRef(null);

    return (
        <div className={styles.techStack}>
            <div className={styles.stackContainer} ref={containerRef}>
                {modals.map((modal, index) => (
                    <StackItem key={index} modal={modal} containerRef={containerRef} />
                ))}
            </div>
        </div>
    );
}

function StackItem({ modal, containerRef }) {

    const itemRef = useRef(null);
    const speed = .5;
    
    const itemWidth = itemRef.current ? itemRef.current.offsetWidth : 96;
    const itemHeight = itemRef.current ? itemRef.current.offsetHeight : 96;

    function moveItem(itemRef, containerRect) {
        const item = itemRef.current;
        const itemRect = item.getBoundingClientRect();

        let top = parseFloat(item.style.top) || 0;
        let left = parseFloat(item.style.left) || 0;

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
            <div className={`${styles.stackItem} ${styles[modal.color]} ${modal.fadeInStyle}`}>
                <img draggable={false} src={modal.img} alt={modal.title}/>
                <h3>{modal.title}</h3>
            </div>
        </div>
    );
}