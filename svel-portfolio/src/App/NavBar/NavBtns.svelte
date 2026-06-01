<script lang="ts">

    import { isMobile } from '../utils';

    import ThemeSwitch from './ThemeSwitch.svelte';

    import { pageRefs } from '../../Stores/pageRefs.svelte';
    import type { Page } from '../../Stores/pageRefs.svelte';

    type Props = {
        sectionClick: (sectionRef: HTMLDivElement | null, moreOffset?: boolean) => void;
        showBtns: boolean;
    };

    let { sectionClick, showBtns }: Props = $props();

    type NavType = {
        refName: Page;
        label: string;
        style: string;
    }

    const navs: NavType[] = $derived([
        { refName: 'home', label: 'Home', style: 'blue' },
        { refName: 'aboutMe', label: 'About Me', style: 'green' },
        { refName: 'stack', label: 'Stack', style: 'pink' },
        { refName: 'experience', label: 'Experience', style: 'blue' },
        { refName: 'projects', label: 'Projects', style: 'green' }
    ]);

    const onAnimationEnd = (e: AnimationEvent) => {
        if (e.animationName === 'rollDown') {
            showBtns = true;
        }
    }
</script>

<div class={[isMobile ? 'mobileNavBtns' : 'navBtns']} onanimationend={onAnimationEnd}>
    {#if isMobile}
        <div class='line-break'></div>
    {/if}
    {#each navs as nav (nav.refName)}
        <button 
            class={[nav.style,
                pageRefs.current === nav.refName && 'active',
                isMobile && showBtns && 'show'
            ]} 
            onclick={() => sectionClick(pageRefs.pages[nav.refName])}
        >{nav.label}</button>
    {/each}
    {#if !isMobile}
        <ThemeSwitch/>
    {/if}
</div>

<style>
    
    .navBtns {
        display: flex;
        flex-direction: row;
        gap: 3rem;
    }

    .mobileNavBtns {
        position: absolute;
        top: 75px;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: var(--app-gray);
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: -2;
        gap: .75rem;
        animation: rollDown 0.3s ease-in-out;
    }

    @keyframes rollDown {
        from {
            transform: translateY(-100%);
        }
        to {
            transform: translateY(0);
        }
    }
    button {
        font-size: 25px;
        text-decoration: none;
        background-color: inherit;
        border: none;
        color: white;
        font-family: montserrat, sans-serif;
        cursor: pointer;
    }
    .mobileNavBtns button {
        width: 98%;
        font-size: 20px;
        color: var(--nav-bar-color);
        background-color: white;
        padding: 1rem;
        box-shadow: black 0px 1px 5px 1px;
        z-index: -1;
    }
    .mobileNavBtns button.show {
        display: block;
    }
    .lineBreak {
        margin-bottom: .5rem;
        background-color: var(--app-gray);
        box-shadow: black 0px 2px 10px 1px;
        height: 1px;
    }
    .mobileNavBtns button.active, .mobileNavBtns button:hover {
        background-color: black;
    }
    button.blue:hover, button.blue.active {
        color: var(--app-blue);
    }
    button.green:hover, button.green.active {
        color: var(--app-green);
    }
    button.pink:hover, button.pink.active {
        color: var(--app-pink);
    }
    
</style>