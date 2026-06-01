<script lang="ts">

    import { calcExperienceYears } from '../../../utils';

    const experience = calcExperienceYears('2020-08-01');
</script>

<div class='modalContent'>
    <h1 style:color='var(--blue-color)'>SQL</h1>
    <p><strong>Experience:</strong> {experience}</p>
    <p class='desc'>I&apos;ve worked extensively with various SQL databases,</p>
    <p class='desc'>managing data effectively for different applications.</p>
    <div class='lineBreak'></div>
    <div class='expert'>
        <h3>Data Storage</h3>
        <h3>Data Manipulation</h3>
    </div>
    <h3 style:color='var(--blue-color)' class='underline'>Databases:</h3>
    <ul class='tools'>
        <li class='blueMarker'>PostgreSQL</li>
        <li class='blueMarker'>SQL Server</li>
        <li class='blueMarker'>MySQL</li>
        <li class='blueMarker'>SQLite</li>
        <li class='blueMarker'>Redis</li>
        <li class='blueMarker'>MongoDB</li>
    </ul>
</div>