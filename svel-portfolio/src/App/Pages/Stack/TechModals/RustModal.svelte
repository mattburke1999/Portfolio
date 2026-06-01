<script lang="ts">

    import { calcExperienceYears } from '../../../utils';

    import { projectsRefs } from '../../../../Stores/projectRefs.svelte';

    type Props = {
        scrollToProject: (ref: HTMLDivElement | null) => void;
    }

    let { scrollToProject }: Props = $props();

    const experience = calcExperienceYears('2024-01-01');

</script>

<div class='modalContent'>
    <h1 style:color='var(--orange-color)'>rust</h1>
    <p><strong>Experience:</strong> {experience}</p>
    <div class='lineBreak'></div>
    <div class='expert'>
        <h3>Web Development</h3>
    </div>
    <h3 style:color='var(--orange-color)' class='underline'>Tools & Technologies:</h3>
    <ul class='tools'>
        <li class='orangeMarker'>Tokio</li>
        <li class='orangeMarker'>Warp framework</li>
    </ul>
    <h3 style:color='var(--orange-color)' class='proj'>Projects</h3>
    <div class='projects'>
        <button class='projRef' onclick={() => scrollToProject(projectsRefs.projects.hitZone)}>HIT-ZONE</button>
        <button class='projRef' onclick={() => scrollToProject(projectsRefs.projects.passwordManager)}>Password Manager</button>
    </div>
</div>