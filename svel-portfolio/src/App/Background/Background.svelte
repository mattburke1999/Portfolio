<script lang="ts">

    import { onMount } from 'svelte';
    import { isMobile } from '../utils';

    type SquareData = {
        x: number;
        y: number;
        speed: number;
        angle: number;
        size: number;
        color: string;
        sizeIncreasing: boolean;
    };
    let canvasRef: HTMLCanvasElement;

    
    onMount(() => {
        const NUM_SQUARES = isMobile? 150 : 175;
        const root = document.getElementById('app') as HTMLDivElement;
        const TOTAL_SQUARES = NUM_SQUARES * 3;
        const COLORS = ['blue', 'green', 'pink'];
        const WIDTH = window.innerWidth;
        const HEIGHT = root.getBoundingClientRect().height;
        canvasRef.width = WIDTH;
        canvasRef.height = HEIGHT;
        const xPadding = (isMobile ? 0.1 : 0.025) * window.innerWidth;
        const MIN_X = - xPadding;
        const MAX_X = WIDTH + xPadding;
        const MIN_Y = window.innerHeight;
        const MAX_Y = HEIGHT;

        const SIZE_MULTIPLIER = 0.0095;
        const MIN_SIZE = 1.25;
        const MAX_SIZE = MIN_SIZE + TOTAL_SQUARES * SIZE_MULTIPLIER;

        const squares: SquareData[] = Array.from({ length: TOTAL_SQUARES }, (_, i) => ({
            x: Math.random() * WIDTH,
            y: MIN_Y + Math.random() * (MAX_Y - MIN_Y),
            speed: (isMobile ? 0.15 : 0.12) + Math.random() * 0.1,
            angle: Math.random() * 2 * Math.PI,
            size: MIN_SIZE + i * SIZE_MULTIPLIER,
            sizeIncreasing: i % 2 === 0,
            color: COLORS[i % COLORS.length]
        }));

        function updateSquares() {
            for (const square of squares) {
                square.x += square.speed * Math.cos(square.angle) * square.size / 5;
                square.y += square.speed * Math.sin(square.angle) * square.size / 5;

                if (square.x > MAX_X) square.x = MIN_X;
                else if (square.x < MIN_X) square.x = MAX_X;

                if (square.y > MAX_Y) square.y = MIN_Y;
                else if (square.y < MIN_Y) square.y = MAX_Y;
                
                if (square.sizeIncreasing) {
                    square.size += SIZE_MULTIPLIER / 1.25;
                    if (square.size >= MAX_SIZE) {
                        square.size = MAX_SIZE;
                        square.sizeIncreasing = false;
                    }
                } else {
                    square.size -= SIZE_MULTIPLIER / 1.25;
                    if (square.size <= MIN_SIZE) {
                        square.size = MIN_SIZE;
                        square.sizeIncreasing = true;
                    }
                }
            }
        }

        function animate() {
            const ctx = canvasRef.getContext('2d');
            if (ctx) {
                // console.log('Animating squares');
                ctx.clearRect(0, 0, WIDTH, HEIGHT);

                updateSquares();
                // sort by size, smallest to largest
                const sortedSquares = [...squares].sort((a, b) => a.size - b.size);
                // display squares
                for (const square of sortedSquares) {
                    const computedColor = getComputedStyle(document.documentElement).getPropertyValue(`--app-${square.color}`).trim();
                    ctx.fillStyle = computedColor;
                    ctx.shadowColor = computedColor;
                    ctx.shadowBlur = 7.5;
                    ctx.fillRect(square.x, square.y, square.size, square.size);
                }
            }
            requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
    });

</script>

<canvas bind:this={canvasRef}></canvas>

<style>
    canvas {
        position: absolute;
        inset: 0;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -2;
        pointer-events: none;
        background-color: var(--bg-color);
    }
</style>