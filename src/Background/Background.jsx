import styles from './Background.module.css';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


function Square({color, speed}) {
    const [x, setX] = useState(Math.random() * window.innerWidth);
    const [y, setY] = useState(Math.random() * window.innerHeight * 4 + window.innerHeight / 2);
    // Initialize angle with a random value
    const angle = Math.random() * 2 * Math.PI;
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
                newY = 0;
            }
            // If the square goes off the top of the screen, reset it to the bottom
            else if (newY < 0) {
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
            width=".2rem"
            height=".2rem"
            // set x and y as random place on screen
            x={x}
            y={y}
            ry="0" 
        />
    );
}
Square.propTypes = {
    color: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired
}

function create_squares() {
    const squares = [];
    for (let i = 0; i < 225; i++){
        let speed = .8 * Math.random() + .1;
        squares.push(<Square color="blue" speed={speed} key={`blue${i}`}/>);
        squares.push(<Square color="green" speed={speed} key={`green${i}`}/>);
        squares.push(<Square color="purple" speed={speed} key={`purple${i}`}/>);
    }
    return squares;
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