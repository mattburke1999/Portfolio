<script lang="ts">

    import { onMount } from 'svelte';
    import type { Image } from './gallery-types';

    type Props = {
        images: Image[];
        autoPlay?: boolean;
        includeArrows?: boolean;
        includePause?: boolean;
        intervalTime?: number;
        includeFullScreen?: boolean;
        addThumbnailsBelow?: boolean;
    }
    let { 
        images, 
        autoPlay=false, 
        includeArrows=true,
        includePause=true,
        intervalTime=2000,
        includeFullScreen=true,
        addThumbnailsBelow=false
    }: Props = $props();

    import Thumbnails from './Thumbnails.svelte';
    import Buttons from './Buttons.svelte';

    let currentIndex = $state<number>(0);
    let intervalId = $state<number | null>(null);

    let translations = $derived(images.map((_, index) => {
        let translation = index - currentIndex
        if (Math.abs(translation) === images.length - 1) {translation = -1 * translation / Math.abs(translation);}
        return translation * 100;
    }));
    // svelte-ignore state_referenced_locally
    let activeIndexes = $state<number[]>(Array.from({ length: images.length }, (_, i) => i));

    let activeIndexResetTimeoutId: number | null = null;

    let galleryContainer = $state<HTMLDivElement | null>(null);

    let isFullscreen = $state(false);

    const mod = (n: number) => ((n % images.length) + images.length) % images.length;

    const startInterval = () => {
        intervalId = setInterval(() => selectImage(currentIndex + 1), intervalTime);
    };

    const toggleInterval = (reset:boolean=false) => {
        let shouldStart = intervalId === null || reset;
        if (intervalId !== null) {
            clearInterval(intervalId);
            intervalId = null;
        }
        if(shouldStart) {
            startInterval();
        }
    };
    
    const selectImage = (index: number) => {
        if (!galleryContainer) return;
        if (intervalId !== null) toggleInterval(true);
        if (activeIndexResetTimeoutId !== null) clearTimeout(activeIndexResetTimeoutId);
        index = mod(index);
        const targetTranslation = translations[index];
        const currentTranslation = translations[currentIndex];
        if (Math.abs(targetTranslation - currentTranslation) === 100) {
            activeIndexes = [currentIndex, index];
        } else {
            let smallerIndex, largerIndex: number;
            if (index > currentIndex) {
                smallerIndex = currentIndex;
                largerIndex = index;
            } else {
                smallerIndex = index;
                largerIndex = currentIndex;
            }
            // activeIndexes are all indexes between smallerIndex and largerIndex, inclusive
            const newActiveIndexes = [];
            for (let i = smallerIndex; i <= largerIndex; i++) {
                newActiveIndexes.push(i);
            }
            activeIndexes = newActiveIndexes;
        }
        currentIndex = index;
        activeIndexResetTimeoutId = setTimeout(() => {
            activeIndexes = Array.from({ length: images.length }, (_, i) => i);
        }, 500);
    }        
    
    onMount(() => {
        if (autoPlay) startInterval();

        return () => {
            if(intervalId !== null) clearInterval(intervalId);
        }
    });

</script>

<div class="gallery" bind:this={galleryContainer}>
    <div class="gallery-imgs">
        <Buttons 
            {includeArrows} 
            {includePause} 
            {includeFullScreen}
            {galleryContainer}
            {toggleInterval}
            {selectImage}
            {currentIndex}
            bind:isFullscreen
            paused={intervalId === null}
        />
        {#each images as image, index (image.original)}
            <img 
                class={image.className}
                src={image.original} 
                alt={image.alt} 
                style:transform={`translateX(${translations[index]}%)`}
                style:position={index === currentIndex ? 'relative' : 'absolute'}
                style:display={activeIndexes.includes(index) ? 'block' : 'none'}
                style:height={isFullscreen ? 'auto' : ''}
                style:object-fit={isFullscreen ? 'contain' : ''}
            />
        {/each}
    </div>
    {#if addThumbnailsBelow}
        <Thumbnails 
            {images} 
            {currentIndex} 
            {selectImage} 
            {galleryContainer}
        />
    {/if}
</div>

<style>
    * {
        box-sizing: border-box;
    }
    .gallery{
        position: relative;
        height: 100%;
    }
    .gallery-imgs {
        position: relative;
        overflow: hidden;
    }
    .gallery-imgs img {
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        max-height: 90vh;
        transition: transform 0.5s ease-in-out;
    }
    
</style>