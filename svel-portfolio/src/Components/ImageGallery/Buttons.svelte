<script lang="ts">

    import { onMount } from 'svelte';

    type Props = {
        includeArrows?: boolean;
        includePause?: boolean;
        includeFullScreen?: boolean;
        isFullscreen: boolean;
        galleryContainer: HTMLDivElement | null;
        toggleInterval: (reset?: boolean) => void;
        selectImage: (index: number) => void;
        currentIndex: number;
        paused: boolean;
    }

    let { 
        includeArrows=true,
        includePause=true,
        includeFullScreen=true,
        isFullscreen = $bindable(),
        galleryContainer,
        toggleInterval,
        selectImage,
        currentIndex,
        paused
    }: Props = $props();



    function toggleFullScreen() {
        if (!galleryContainer) return;
        if (!document.fullscreenElement) {
            galleryContainer.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    function handleFullscreenChange() {
        isFullscreen = Boolean(document.fullscreenElement);
    }

    

    const rightArrow = () => {
        selectImage(currentIndex + 1);
    }

    const leftArrow = () => {
        selectImage(currentIndex - 1);
    }        

    onMount(() => {
        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        }
    });

</script>

{#if includePause}
    <button class='pause gallery-btn' onclick={() => toggleInterval()} title={(paused ? "Play" : "Pause") + " Slideshow"}>
        <i class={["fa-solid", paused ? "fa-play" : "fa-pause"]}></i>
    </button>
{/if}
{#if includeFullScreen}
    <button class='fullscreen gallery-btn' onclick={toggleFullScreen} title={isFullscreen ? "Exit Full Screen" : "Full Screen"}>
        <i class={["fa-solid", isFullscreen ? "fa-compress" : "fa-expand"]}></i>
    </button>
{/if}
{#if includeArrows}
    <button class='right gallery-btn' onclick={rightArrow} title="Next Image">
        <i class="fa-solid fa-angle-right"></i>
    </button>
    <button class='left gallery-btn' onclick={leftArrow} title="Previous Image">
        <i class="fa-solid fa-angle-left"></i>
    </button>
{/if}

<style>
    
    .gallery-btn {
        position: absolute;
        z-index: 2;
        cursor: pointer;
        border: none;
        outline: none;
        background: transparent;
        color: white;
        font-size: 30px;
        padding: 10px;
    }
    .gallery-btn i {
        text-shadow: 0 0 5px rgb(0 0 0);
    }
    .pause {
        bottom: 0;
        left: 10px;
    }
    .fullscreen {
        bottom: 0;
        right: 10px;
    }
    .right, .left {
        top: 50%;
        transform: translateY(-50%);
        font-size: 40px;
    }
    .right {
        right: 10px;
    }
    .left {
        left: 10px;
    }

</style>