<script lang="ts">
    import type { Image } from './gallery-types';

    type Props = {
        images: Image[];
        currentIndex: number;
        selectImage: (index: number) => void;
        galleryContainer: HTMLDivElement | null;
    }

    let { 
        images, 
        currentIndex,
        selectImage,
        galleryContainer
    }: Props = $props();

    const getNavTranslation = (index: number) => {
         if (!galleryContainer) return 0;
         const galleryWidth = galleryContainer.clientWidth;
         if (images.length * 97 > galleryWidth) {
             return 97 * index
         }
         return 0;
    };

</script>   

<div class="gallery-thumbnails">
    <nav style:transform={`translateX(-${getNavTranslation(currentIndex)}px)`}>
        {#each images as image, index (image.original)}
        <button style:border-color={index === currentIndex ? '#0d74b3' : 'transparent'} onclick={() => selectImage(index)}>
            <img 
                class={image.thumbnailClassName}
                src={image.thumbnail} 
                alt={image.alt} 
            />
        </button>
        {/each}
    </nav>
</div>

<style>    
    .gallery-thumbnails {
        overflow: hidden;
    }
    nav {
        text-align: center;
        padding: 5px 0;
        white-space: nowrap;
        transition: transform 0.5s ease-in-out;
    }
    button {
        border: 3px solid transparent;
        background: none;
        padding: 0;
        cursor: pointer;
        width: 100px;
        transition: border-color 0.3s;
    }
    img {
        width: 100%;
        height: auto;
        vertical-align: middle;
    }
</style>