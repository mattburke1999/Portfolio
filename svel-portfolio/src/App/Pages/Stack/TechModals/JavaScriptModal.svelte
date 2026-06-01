<script lang="ts">

    import { calcExperienceYears } from '../../../utils';

    import { projectsRefs } from '../../../../Stores/projectRefs.svelte';

    type Props = {
        scrollToProject: (ref: HTMLDivElement | null) => void;
    }

    let { scrollToProject }: Props = $props();

    const experience = calcExperienceYears('2022-12-01');

</script>

<div class='modalContent'>
    <h1 style:color='var(--yellow-color)'>JavaScript</h1>
    <p><strong>Experience:</strong> {experience}</p>
    <div class='lineBreak'></div>
    <div class='expert'>
        <h3>Web Development</h3>
        <h3>Desktop Apps</h3>
        <h3>Automations/Scripting</h3>
    </div>
    <h3 style:color='var(--yellow-color)' class='underline'>Tools & Technologies:</h3>
    <ul class='tools'>
        <li class='yellowMarker'>Vanilla JS</li>
        <li class='yellowMarker'>React</li>
        <li class='yellowMarker'>Typescript</li>
        <li class='yellowMarker'>Svelte</li>
        <li class='yellowMarker'>Vue</li>
        <li class='yellowMarker'>Solid</li>
        <li class='yellowMarker'>Lit</li>
        <li class='yellowMarker'>Next.js</li>
        <li class='yellowMarker'>and more . . .</li>
    </ul>
    <h3 style:color='var(--yellow-color)' class='proj'>Projects</h3>
    <p>This (Svelte.js)</p>
    <div class='projects'>
        <button class='projRef' onclick={() => scrollToProject(projectsRefs.projects.hitZone)}>HIT-ZONE</button>
        <button class='projRef' onclick={() => scrollToProject(projectsRefs.projects.todo)}>Personal ToDo App</button>
        <button class='projRef' onclick={() => scrollToProject(projectsRefs.projects.passwordManager)}>Password Manager</button>
        <button class='projRef' onclick={() => scrollToProject(projectsRefs.projects.codeCracker)}>Code Cracker</button>
        <button class='projRef' onclick={() => scrollToProject(projectsRefs.projects.calculator)}>Calculator</button>
    </div>
</div>