<script lang="ts">

    import { setTheme, getThemeStorage } from '../utils';

    import { onMount } from 'svelte';

    let darkMode = $state<boolean>(getThemeStorage() === 'dark');

    const toggleTheme = () => {
        darkMode = !darkMode;
        setTheme(darkMode ? 'dark' : 'light');
    };

    onMount(() => {
        setTheme(darkMode ? 'dark' : 'light');
    });

</script>

<label title="Toggle Theme">
    <input type="checkbox" checked={darkMode} onchange={toggleTheme} />
    <span>
        <i class='fa-solid fa-sun lightIcon'></i>
        <i class='fa-solid fa-moon darkIcon'></i>
    </span>
</label>

<style>
    label {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 30px;
    }

    input {
        opacity: 0;
        width: 0;
        height: 0;
    }


    span {
        position: absolute;
        cursor: pointer;
        top: 0px;
        left: 0;
        right: 0;
        bottom: 0px;
        background-color: #ccc;
        transition: .4s;
        border-radius: 34px;
    }

    span:before {
        position: absolute;
        content: "";
        height: 24px;
        width: 24px;
        left: 4px;
        bottom: 3px;
        background-color: white;
        transition: .4s;
        border-radius: 50%;
    }

    label input:checked+span:before {
        left: 6px;
        background-color: black;
        transform: translateX(26px);
    }
    .lightIcon, .darkIcon {
        position: absolute;
        top: 50%;
        font-size: 1rem !important;
        transform: translateY(-50%);
        transition: opacity 0.5s, visibility 0.5s;
    }

    .lightIcon {
        left: 8px;
        color: black !important;
        opacity: 1;
        visibility: visible;
    }
    .darkIcon {
        right: 9px;
        color: white !important;
        opacity: 0;
        visibility: hidden;
    }

    label input:checked+span .lightIcon {
        opacity: 0;
        visibility: hidden;
    }
    label input:checked+span .darkIcon {
        opacity: 1;
        visibility: visible;
    }


</style>