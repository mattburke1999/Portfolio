<script lang="ts">

    import { calcExperienceYears } from '../../../utils';

    const experience = calcExperienceYears('2022-06-01');

</script>

<div class='modalContent'>
    <h1 style:color='var(--orange-color)'>HTML/CSS</h1>
    <p><strong>Experience:</strong> {experience}</p>
    <div class='lineBreak'></div>
    <div class='expert'>
        <h3>Web Development</h3>
        <h3>UIs</h3>
    </div>
</div>