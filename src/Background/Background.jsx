import styles from './Background.module.css';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


function Square({color, speed, angle, width}) {
    const [x, setX] = useState(Math.random() * window.innerWidth);
    const [y, setY] = useState(Math.random() * window.innerHeight * 4 + window.innerHeight / 2);
    // Initialize angle with a random value
    
    let colorCode;
    if (color === "green"){
        colorCode = "#008000";
    }
    else if (color === "purple"){
        colorCode = "#B53CD6";
    }
    else {// color is blue 
        colorCode = "#1180E8";
    }
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
            style={{fill: colorCode, stroke: '#4d4d4d', strokeWidth: 0.264583}}
            width={`${width}rem`}
            height={`${width}rem`}
            // set x and y as random place on screen
            x={x}
            y={y}
            ry="0" 
        />
    );
}
Square.propTypes = {
    color: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired,
    angle: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
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
    let num_squares = 75;
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
        squares.push(<Square color="purple" speed={speed} angle={angle} width={width} key={`purple${i}`} />);
    }
    return squares;
}
create_squares.propTypes = {
    homeRef: PropTypes.object.isRequired
}


export default function Background() {

    return (
        <svg className={styles.bg}
            width="100%"
            height="100%"
            version="1.1"
            id="svg1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:svg="http://www.w3.org/2000/svg"> --fix
            <defs
                id="defs1" />
            <g
                id="layer1">
                <rect 
                    style={{fill:"#404040", stroke: '#4d4d4d', strokeWidth: 0.264583}}
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