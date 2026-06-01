<script lang="ts">

    import { onMount } from 'svelte';

    import type { ProjectType } from '../../../PageData/projects';

    import ImageGallery from '../../../Components/ImageGallery/ImageGallery.svelte';
    import ButtonLink from '../../../Components/ButtonLink.svelte';
    
    import { projectsRefs } from '../../../Stores/projectRefs.svelte';

    type Props = {
        project: ProjectType;
        side: '' | '-reverse';
    }

    let { 
        project,
        side
    }: Props = $props();

    let scrolledBy = $state<boolean>(false);

    let projRef: HTMLDivElement;

    const simpleIconsLink = 'https://cdn.simpleicons.org'

    let percent = $derived(project.imageSize ? (project.imageSize === 'small' ? '5%' : '2.5%') : '1%');
 

    onMount(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    scrolledBy = true;
                    observer.disconnect(); // Stop observing after first intersection
                }
            },
            {
                threshold: 0.4, // Trigger when 20% of the element is visible
            }
        );

        observer.observe(projRef);

        const currentProjRef = projRef; // Capture the current ref

        return () => {
            if (currentProjRef) {
                observer.unobserve(currentProjRef);
            }
        };
    })

</script>

<div bind:this={projRef} 
    style:flex-direction={`row${side}`}
    style:opacity={scrolledBy ? 1 : 0}
    class={['project', scrolledBy && (side ? 'fadeE' : 'fadeW')]}
>
    <div class='projectSummary'>
        <h2 bind:this={projectsRefs.projects[project.refName]}>{project.name}</h2>
        <ul>
            {#each project.description as line}
                <li>{line}</li>
            {/each}
        </ul>
        <div class='projectIcons'>
            {#each project.icons as icon (icon.name)}
                <div class='icon'>
                    <img src={icon.link ? icon.link : `${simpleIconsLink}/${icon.name}`} color={'white'} sizes={'24'} alt={`${icon.name} Icon`}/>
                    <p>{icon.name}</p>
                </div>
            {/each}
        </div>
        <div class='links'>                    
            {#if project.githubLink}
                <ButtonLink 
                    href={project.githubLink} 
                    text='View Code' 
                    title='View on GitHub' 
                    --button-color='var(--tag-background-color)' 
                    --color='var(--tag-text-color)'
                    className='projectLink'
                >
                    <img src={`${simpleIconsLink}/github`} alt='GitHub' width={18} height={18} />
                </ButtonLink>
            {/if}
            {#if project.link}
                <ButtonLink 
                    href={project.link} 
                    text='View Site' 
                    --button-color='var(--tag-background-color)' 
                    --color='var(--tag-text-color)'
                    className='projectLink'
                >
                    <i class="fa-solid fa-link"></i>
                </ButtonLink>
            {/if}
            {#if project.demoLink}
                <ButtonLink 
                    href={project.demoLink} 
                    text='View Demo' 
                    --button-color='var(--tag-background-color)' 
                    --color='var(--tag-text-color)'
                    className='projectLink'
                >
                    <i class="fa-solid fa-link"></i>
                </ButtonLink>
            {/if}
        </div>
    </div>
    <div 
        class={['projectImages', project.imageSize]} 
        style:margin-right={side ? percent: null}
        style:margin-left={!side ? percent : null}
    >
        <ImageGallery images={project.images} addThumbnailsBelow={true} autoPlay={true}/>
    </div>
</div>

<style>
    .project {
        width: 90%;
        display: flex;
        flex-direction: row;
        align-self: center;
        gap: 1rem;
        padding-bottom: 2rem;
    }
    .projectSummary {
        max-width: 40%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 2rem;
        border: 1px solid var(--text-color);
        padding: 1rem;
        border-radius: 0.5rem;
        height: fit-content;
        background-color: var(--app-gray);
        box-shadow: 2px 2px 10px 1px black;
    }
    .projectSummary h2 {
        font-size: 1.75rem;
        margin: 0;
        color: var(--light-blue-color);
        text-decoration: underline;
        margin-bottom: -1rem
    }
    .projectSummary ul {
        display: flex;
        flex-direction: column;
        gap: .85rem;
        margin: 0;
    }

    .projectImages {
        width: 100%;
        max-width: 35vw;
    }
    .projectImages.small {
        max-width: 12.5vw;
    }
    .projectImages.medium {
        max-width: 25vw;
    }
    :global(.projImages) {
        height: 35vh;
    }
    .projectImages.small :global(.projImages), .projectImages.medium :global(.projImages) {
        height: 40vh;
    }
    .projectIcons {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: .5rem;
        margin-bottom: -1rem;
    }
    .links {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    .links :global(.projectLink) {
        min-width: 7.5rem;
        padding: 0.25rem 0.5rem;
    }


    .icon {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: fit-content;
        max-width: 150px;
        background-color: var(--tag-background-color);
        padding: 0.25rem 0.4rem;
        border-radius: 0.5rem;
        color: #93c5fd;
        width: fit-content;
    }
    .icon img {
        width: 1rem;
        height: 1rem;
    }
    .icon p {
        font-size: 0.875rem;
        font-weight: bold;
        margin: 0;
        color: var(--tag-text-color);
    }


    @media (max-width: 768px) {
        .project {
            flex-direction: column !important;
            align-items: center;
            width: 100%;
        }
        .projectSummary {
            width: 90%;
            max-width: 90%;
            gap: .75rem;
            padding: 0.5rem;
        }
        .projectSummary ul {
            gap: 1rem;
        }

        .projectSummary h2 {
            font-size: 1rem;
        }
        .projectIcons {
            margin-bottom: 0
        }
        .icon {
            padding: 0.25rem 0.3rem;
        }
        .icon p {
            font-size: 0.65rem; 
        }
        .projectImages {
            width: 90%;
            max-width: 90%;
            margin-right: 0 !important;
            margin-left: 0 !important;
        }
        :global(.projImages) {
            height: 25vh;
        }
        .projectImages.small :global(.projImages), .projectImages.medium :global(.projImages) {
            height: 45vh;
        }
        .projectImages.small {
            max-width: 60%;
        }
        .projectImages.medium {
            max-width: 95%;
        }
    }


</style>