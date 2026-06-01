<script lang="ts">

    import { calcExperienceYears } from '../../../utils';

    import { projectsRefs } from '../../../../Stores/projectRefs.svelte';

    type Props = {
        setModalVisible: (modalName: string) => void;
        scrollToProject: (projectRef: HTMLDivElement | null) => void;
    }

    let { setModalVisible, scrollToProject }: Props = $props();

    const experience = calcExperienceYears('2023-01-01');

</script>

<div class='modalContent'>
    <h1 style:color='var(--purple-color)'>C#</h1>
    <p><strong>Experience:</strong> {experience}</p>
    <div class='lineBreak'></div>
    <div class='expert'>
        <h3>Web Development</h3>
        <h3>Desktop Apps</h3>
        <h3>Automations</h3>
    </div>
    <h3 style:color='var(--purple-color)' class='underline'>Tools & Technologies:</h3>
    <ul class='tools'>
        <li class='purpleMarker'>ASP.NET Core</li>
        <li class='purpleMarker'>MVC Core Web Apps</li>
        <li class='purpleMarker'>Entity Framework Core</li>
        <li class='purpleMarker'>LINQ</li>
        <li class='purpleMarker'>ASP.NET Web API</li>
        <li class='purpleMarker'><button class='projRef' onclick={() => setModalVisible('azFunc')}>Azure Functions</button></li>
        <li class='purpleMarker'>and more . . .</li>
    </ul>
    <h3 style:color='var(--purple-color)' class='proj'>Projects</h3>
    <div class='projects'>
        <button class='projRef' onclick={() => scrollToProject(projectsRefs.projects.garminMock)}>GarminMock .NET Website</button>
    </div>
</div>