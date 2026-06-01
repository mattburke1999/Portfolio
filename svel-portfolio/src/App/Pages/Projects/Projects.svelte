<script lang="ts">

    import { getProjects } from '../../../PageData/projects';

    import Project from './Project.svelte';
    import PageTitle from '../../../Components/PageTitle.svelte';

    import { pageRefs } from '../../../Stores/pageRefs.svelte';

    const projects = getProjects('projImages');
</script>

<div class='projects' bind:this={pageRefs.pages.projects}>
    <PageTitle title='Projects' />
    {#each projects as project, i (project.name) }
        <div class='projectContainer'>
            <Project 
                {project}
                side={i % 2 === 0 ? '' : '-reverse'}
            />
            <div class='mobileLineBreak'></div>
        </div>
    {/each}
</div>

<style>
    .projects {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        color: var(--text-color);
        overflow-x: hidden;
        padding-top: 1rem;
    }

    .projects :global(h1) {
        margin-left: 1rem;
        margin-bottom: 1rem;
    }
    .projectContainer {
        display: flex;
        flex-direction: row;
        align-self: center;
        justify-content: center;
        width: 100%;
    }
    
    .mobileLineBreak {
        display: none;
    }


    @media (max-width: 768px) {
        .projectContainer {
            flex-direction: column !important;
            align-items: center;
            width: 100%;
        }
        
        .mobileLineBreak {
            display: block;
            width: 90%;
            align-self: center;
            border: 1px dashed white;
            margin-bottom: 2rem;
        }
    }


</style>