import styles from './Background.module.css';
import { useEffect, useRef, forwardRef } from 'react';

export default function Background() {
    const squaresRef = useRef([]);
    const allSquares = useRef([]);

    const numSquares = 125;
    useEffect(() => {
        const isMobile = window.innerWidth <= 768;
        const backgroundPixels = document.getElementById('root').getBoundingClientRect().height * (isMobile ? 1.1 : 1.05);
        console.log('Background height:', backgroundPixels); 
        const totalSquares = numSquares * 3;

        // Initialize square data
        allSquares.current = Array.from({ length: totalSquares }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * backgroundPixels,
            speed: 0.1 + Math.random() * 0.05,
            angle: Math.random() * 2 * Math.PI,
        }));

        function animate() {
            for (let i = 0; i < allSquares.current.length; i++) {
                let s = allSquares.current[i];
                s.x += s.speed * Math.cos(s.angle);
                s.y += s.speed * Math.sin(s.angle);

                if (s.x > window.innerWidth) s.x = 0;
                else if (s.x < 0) s.x = window.innerWidth;

                if (s.y > backgroundPixels) s.y = window.innerHeight;
                else if (s.y < window.innerHeight) s.y = backgroundPixels;

                const el = squaresRef.current[i];
                if (el) {
                    el.setAttribute('x', s.x);
                    el.setAttribute('y', s.y);
                }
            }
            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
    }, []);

    const squares = [];
    let id = 0;
    for (let i = 0; i < numSquares; i++) {
        for (let color of ['blue', 'green', 'pink']) {
            const index = id; // Capture current id for ref assignment
            squares.push(
                <Square
                    key={id}
                    id={`square-${id}`}
                    color={color}
                    width={0.025 + i * 0.0015}
                    ref={(el) => (squaresRef.current[index] = el)}
                />
            );
            id++;
        }
    }

    return (
        <svg className={styles.bg} width="100%" height="100%">
            <g id="bg-layer">
                <rect
                    style={{
                        fill: "#1c1c1c",
                        stroke: '#4d4d4d',
                        strokeWidth: 0.264583
                    }}
                    width="100%"
                    height="100%"
                    x="0"
                    y="0"
                />
                {squares}
            </g>
        </svg>
    );
}

const Square = forwardRef(function Square({ color, width, id }, ref) {
    return (
        <rect
            ref={ref}
            id={id}
            className={styles.square}
            style={{
                fill: `var(--app-${color})`,
                stroke: '#4d4d4d',
                strokeWidth: 0.264583
            }}
            width={`${width}rem`}
            height={`${width}rem`}
            x={0}
            y={window.innerHeight + 55}
        />
    );
});
