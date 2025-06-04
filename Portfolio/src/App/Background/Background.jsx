import styles from './Background.module.css';
import { useState, useEffect } from 'react';


function Square({color, speed, angle, width}) {
    const [x, setX] = useState(Math.random() * window.innerWidth);
    const [y, setY] = useState(Math.random() * window.innerHeight * 4 + window.innerHeight / 2);
    // const speed = Math.random() + .1;
    useEffect(() => {
        const id = window.requestAnimationFrame(() => {
            // Calculate the new x and y positions
            let newX = x + speed * Math.cos(angle);
            let newY = y + speed * Math.sin(angle);
    
            // If the square goes off the right edge of the screen, reset it to the left edge
            if (newX > window.innerWidth) {
                newX = 0;
            }
            // If the square goes off the left edge of the screen, reset it to the right edge
            else if (newX < 0) {
                newX = window.innerWidth;
            }
    
            // If the square goes off the bottom of the screen, reset it to the top
            if (newY > window.innerHeight*5) {
                newY = window.innerHeight + 55; // 55 is the height of the nav bar
            }
            // If the square goes off the top of the screen, reset it to the bottom
            else if (newY < window.innerHeight + 55) {
                newY = window.innerHeight*5;
            }
    
            // Update x and y
            setX(newX);
            setY(newY);
        });

        // Clean up the effect by cancelling the animation frame
        return () => window.cancelAnimationFrame(id);
    }, [x, y, angle, speed]);
    return (
        <rect className={styles.square}
            style={{fill: `var(--app-${color})`, stroke: '#4d4d4d', strokeWidth: 0.264583}}
            width={`${width}rem`}
            height={`${width}rem`}
            // set x and y as random place on screen
            x={x}
            y={y}
            ry="0" 
        />
    );
}

// Shuffle arrays using the Fisher-Yates algorithm for faster performance and uniform distribution
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function create_squares() {
    let s = .002;
    let w = .0015;
    let base = 0.1;
    let num_squares = 50;
    const speeds = Array.from({ length: num_squares }, (_, i) => i * s + base);
    const widths = Array.from({ length: num_squares }, (_, i) => i * w + base);

    shuffle(speeds);
    shuffle(widths);
    const squares = [];
    for (let i = 0; i < num_squares; i++){
        let speed = speeds[i];
        let width = widths[i];
        let angle = Math.random() * 2 * Math.PI;
        squares.push(<Square color="blue" speed={speed} angle={angle} width={width} key={`blue${i}`} />);
        squares.push(<Square color="green" speed={speed} angle={angle} width={width} key={`green${i}`} />);
        squares.push(<Square color="pink" speed={speed} angle={angle} width={width} key={`pink${i}`} />);
    }
    return squares;
}


export default function Background() {

    return (
        <svg className={styles.bg}
            width="100%"
            height="100%"
            version="1.1"
            id="bg-svg"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:svg="http://www.w3.org/2000/svg"> --fix
            <defs
                id="defs1" />
            <g
                id="bg-layer">
                <rect 
                    style={{fill:"#1c1c1c", stroke: '#4d4d4d', strokeWidth: 0.264583}}
                    id="bg"
                    width="100vw"
                    height="400vh"
                    x="0"
                    y="0"
                    ry="0" />
                {create_squares()}
            </g>
        </svg>
    );
}