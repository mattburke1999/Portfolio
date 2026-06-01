<script lang="ts">

    import { calcExperienceYears } from '../../../utils';

    type Props = {
        setModalVisible: (modalName: string) => void;
    }
    let { setModalVisible }: Props = $props();

    const experience = calcExperienceYears('2023-01-01');
</script>

<div class='modalContent'>
    <h1 style:color='var(--yellow-color)'>Azure Functions</h1>
    <p><strong>Experience:</strong> {experience}</p>
    <div class='lineBreak'></div>
    <div class='expert'>
        <h3>Web Development</h3>
        <h3>Automation</h3>
    </div>
    <h3 style:color='var(--yellow-color)' class='underline'>Tools & Technologies:</h3>
    <ul class='tools'>
        <li class='yellowMarker'><button class='projRef' onclick={() => setModalVisible('csharp')}>C#</button></li>
        <li class='yellowMarker'><button class='projRef' onclick={() => setModalVisible('python')}>Python</button></li>
        <li class='yellowMarker'>HTTP Triggers</li>
        <li class='yellowMarker'>Timer Triggers</li>
        <li class='yellowMarker'>Queue Triggers</li>
    </ul>
</div>