<script lang="ts">
    import { experiences } from '../../../PageData/experience';

    import ExperienceItem from './ExperienceItem.svelte';
    import PageTitle from '../../../Components/PageTitle.svelte';

    import { pageRefs } from '../../../Stores/pageRefs.svelte';


</script>

<div class='header' bind:this={pageRefs.pages.experience}>
    <PageTitle title='Experience' />
</div>
<div class='timeline'>
    {#each experiences as experience, index (experience.title)}
        <ExperienceItem 
            experience={experience}
            side={index%2 === 0 ? 'left' : 'right'} 
        />
    {/each}
</div>

<style>
    .header {
        padding-top: 1rem;
    }



    /* The actual timeline (the vertical ruler) */
    .timeline {
        position: relative;
        max-width: 90%;
        margin: 0 auto;
        margin-bottom: 3vh;
    }

    /* The actual timeline (the vertical ruler) */
    .timeline::after {
        content: '';
        position: absolute;
        width: 6px;
        background-color: var(--app-gray);
        top: 0;
        bottom: 0;
        left: 50%;
        margin-left: -3px;
    }
    

    .header :global(h1) {
        margin-left: 1rem;
        margin-bottom: 1rem;
    }

    /* Media queries - Responsive timeline on screens less than 600px wide */
    @media screen and (max-width: 768px) {
        .timeline {
            max-width: 100%;
        }
        /* Place the timelime to the left */
        .timeline::after {
            left: 31px;
        }
    }

</style>