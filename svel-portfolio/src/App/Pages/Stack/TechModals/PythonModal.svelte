<script lang="ts">

    import { calcExperienceYears } from '../../../utils';

    import { projectsRefs } from '../../../../Stores/projectRefs.svelte';

    type Props = {
        setModalVisible: (modalName: string) => void;
        scrollToProject: (ref: HTMLDivElement | null) => void;
    }

    let { setModalVisible, scrollToProject }: Props = $props();

    const experience = calcExperienceYears('2017-09-01');
</script>

<div class='modalContent'>
    <h1 style:color='var(--yellow-color)'>Python</h1>
    <p><strong>Experience:</strong> {experience}</p>
    <p class='desc'>This is my preferred programming language that I am most comfortable with.</p>
    <div class='lineBreak'></div>
    <div class='expert'>
        <h3>Web Development</h3>
        <h3>Desktop Apps</h3>
        <h3>Data Science</h3>
        <h3>Automation</h3>
    </div>
    <h3 style:color='var(--yellow-color)' class='underline'>Tools & Technologies:</h3>
    <ul class='tools'>
        <li class='yellowMarker'>Flask</li>
        <li class='yellowMarker'>Django</li>
        <li class='yellowMarker'>FastAPI</li>
        <li class='yellowMarker'>pywebview</li>
        <li class='yellowMarker'>Tkinter</li>
        <li class='yellowMarker'>Plotly</li>
        <li class='yellowMarker'>Pandas</li>
        <li class='yellowMarker'>NumPy</li>
        <li class='yellowMarker'>Scikit-learn</li>
        <li class='yellowMarker'>Matplotlib</li>
        <li class='yellowMarker'><button class='projRef' onclick={() => setModalVisible('azFunc')}>Azure Functions</button></li>
        <li class='yellowMarker'>and more . . .</li>
    </ul>
    <h3 style:color='var(--yellow-color)' class='proj'>Projects</h3>
    <div class='projects'>
        <button class='projRef' onclick={() => scrollToProject(projectsRefs.projects.garminMock)}>GarminMock Flask Website</button>
        <button class='projRef' onclick={() => scrollToProject(projectsRefs.projects.todo)}>Personal ToDo App</button>
        <button class='projRef' onclick={() => scrollToProject(projectsRefs.projects.hitZone)}>HIT-ZONE</button>
        <button class='projRef' onclick={() => scrollToProject(projectsRefs.projects.passwordManager)}>Password Manager</button>
    </div>
</div>