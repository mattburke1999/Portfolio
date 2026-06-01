<script lang="ts">

    import { isMobile } from '../utils';

    import ThemeSwitch from './ThemeSwitch.svelte';
    import NavBtns from './NavBtns.svelte';

    type Props = {
        scrollToSection: (sectionRef: HTMLDivElement | null, moreOffset?: boolean) => void;
    };

    let { scrollToSection }: Props = $props();

    let isNavOpen = $state<boolean>(!isMobile);
    let showBtns = $state<boolean>(!isMobile);

    const closeNav = () => {
        isNavOpen = false;
        showBtns = false;
    };

    const sectionClick = (sectionRef: HTMLDivElement | null) => {
        if (isMobile) {
            isNavOpen =false;
        }
        console.log(sectionRef);
        scrollToSection(sectionRef);
    }

</script>

<nav>
    <div class='navLogo'>
        <img src='/images/name-logo.png' alt='Name Logo'/>
        <h1>Burke Dev</h1>
    </div>
    {#if isNavOpen} 
        <NavBtns 
            {sectionClick} 
            {showBtns}
        />
        {#if isMobile}
            <button class='iconBtn closeBtn' title='Close Navigation Menu' onclick={closeNav}>
                <span>X</span>
            </button>
        {/if}
    {:else}
        <ThemeSwitch />
        <button class='iconBtn' onclick={() => isNavOpen = true} title='Open Navigation Menu'>
            <i class="fa-solid fa-bars"></i>
        </button>
    {/if}
</nav>

<style>
    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--nav-bar-color);
        height: 75px;
        position: sticky;
        top: 0;
        z-index: 9999;
        box-shadow: black 0px 0px 20px;
        padding: 0 1rem;
    }
    .navLogo {
        display: flex;
        align-items: center;
    }
    .navLogo h1 {
        font-size: 2rem;
        color: white;
        margin: 0;
        font-family: "Gorditas", serif;
    }
    img {
        height: 50px;
        width: auto;
        cursor: pointer;
    }
    .closeBtn {
        position: absolute;
        top: 7.5px;
        right: 5px;
        color: white;
        cursor: pointer;
    }
    .closeBtn span {
        padding: 1rem;
        font-size: 1.5rem;
    }


    i {
        font-size: 1.85rem;
        color: white;
    }

    .iconBtn {
        background: none;
        border: none;
        outline: none;
        cursor: pointer;
    }

    @media screen and (max-width: 768px) {
        nav {
            padding-left: .5rem;
        }
        .navLogo {
            gap: .25rem;
        }
        .navLogo h1 {
            font-size: 1.65rem;
        }
        img {
            height: 40px;
        }
        
    }

</style>