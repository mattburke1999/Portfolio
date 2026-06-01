<script lang="ts">

    import { onMount } from 'svelte';

    import { phrases } from '../../PageData/hello';
    import { pageRefs } from '../../Stores/pageRefs.svelte';

    type FadeInState = 'typing' | 'typed' | 'backTyping' | '';


    let fadedIn = $state<FadeInState>('');
    let phraseNum = $state<number>(0);

    const onAnimationEnd = (e: AnimationEvent) => {
        if (e.animationName.includes('typing')) {
            fadedIn = 'typed';
            setTimeout(() => {
                fadedIn = 'backTyping';
            }, 1250);
            setTimeout(() => {
                fadedIn = 'typing';
                phraseNum = (phraseNum + 1) % phrases.length;
            }, 4750);
        }
    };

    onMount(() => {
        setTimeout(() => {
            fadedIn = 'typing';
        }, 1500);
    });

</script>

<div class='hello' bind:this={pageRefs.pages.home}>
    <h1 class='name fadeInE'>
        <span>Hello,&nbsp;</span>
        <span>I&apos;m&nbsp;</span>
        <span class='highlight1'>Matthew</span>
        .
    </h1>
    <div class='descriptionContainer'>
        <h1 class={`description ${fadedIn}`} onanimationend={onAnimationEnd}>
            <span>I&apos;m&nbsp;</span>
            <span>a&nbsp;</span>
            {#each phrases[phraseNum] as phrase, index (index)}
                <span class={phrase.class}>{@html phrase.text}</span>
            {/each}
        </h1>
    </div>
</div>

<style>
    .hello {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-end;
        height: 95vh;
        background-image: url('/images/hello-bg.jpg');
        /* change size of image */
        background-size: cover;
        --fade-start: 0;
        animation: fade 1s ease-in;
        gap: 3rem;
        padding-right: 3.5rem;
        color: white;
        overflow-x: hidden;
    }


    .description, .name {
        color:  white;
        margin: 0;
        text-shadow: 2px 2px 4px #000000;
        display: inline-block;
        transition: transform 0.3s ease-in-out;
        -webkit-user-select: none;  /* Safari */
        -moz-user-select: none;     /* Firefox */
        -ms-user-select: none;      /* Internet Explorer/Edge */
        user-select: none; 
    }

    .name {
        font-size: 4rem;
        margin-top: 15%;
    }
    .descriptionContainer {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
        gap: 0.5rem;
    }

    .description {
        font-size: 2rem;
        width: 0;
        overflow: hidden;
        white-space: nowrap;
        letter-spacing: .15em;
        text-align: end;
    }
    .description.typing {
        border-right: .15em solid white;
        animation: 
            typing 3.5s steps(40, end),
            blink-caret .75s step-end infinite;
    }
    .description.typed {
        border-right: .15em solid white;
        width: 100%; 
        animation:
            blink-caret .75s step-end infinite;
    }

    .description.backTyping {
        border-right: .15em solid white;
        width: 100%; 
        animation:
            backTyping 3.5s steps(40, end),
            blink-caret .75s step-end infinite;
    }
    
    @keyframes typing {
    from { width: 0 }
    to { width: 100%; }
    }

    @keyframes backTyping {
    from { width: 100%; }
    to { width: 0; }
    }

    /* The typewriter cursor effect */
    @keyframes blink-caret {
    from, to { border-color: transparent }
    50% { border-color: white; }
    }  

    h1 span {
        display: inline-block;
        transition: transform 0.2s ease-in-out;
    }
    h1 span:hover {
        transform: scale(1.1);
    }


    @media screen and (max-width: 768px) {
        .hello {
            background-image: url('/images/hello-bg-phone.jpg');
            padding-right: 0.75rem;
            gap: .25rem;
        }
        .name {
            margin-top: 70%;
            font-size: 2.1rem;
        }
        .description {
            font-size: 1.1rem;
        }    
    }

    .highlight3 {
        color: var(--app-blue);
        -webkit-user-select: none;  /* Safari */
        -moz-user-select: none;     /* Firefox */
        -ms-user-select: none;      /* Internet Explorer/Edge */
        user-select: none; 
    }
    .highlight2 {
        color: var(--app-green);
        -webkit-user-select: none;  /* Safari */
        -moz-user-select: none;     /* Firefox */
        -ms-user-select: none;      /* Internet Explorer/Edge */
        user-select: none; 
    }
    .highlight1 {
        color: var(--app-pink);
        -webkit-user-select: none;  /* Safari */
        -moz-user-select: none;     /* Firefox */
        -ms-user-select: none;      /* Internet Explorer/Edge */
        user-select: none; 
    }
</style>