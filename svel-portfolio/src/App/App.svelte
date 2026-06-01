<script lang="ts">

    import { onMount, tick } from 'svelte';

    import Background from './Background/Background.svelte';
    import NavBar from './NavBar/NavBar.svelte';
    import Hello from './Pages/Hello.svelte';
    import Stack from './Pages/Stack/Stack.svelte';
    import Experience from './Pages/Experience/Experience.svelte';
    import Projects from './Pages/Projects/Projects.svelte';
    import AboutMe from './Pages/AboutMe.svelte';

    import { pageRefs } from '../Stores/pageRefs.svelte'

    const scrollToSection = (sectionRef: HTMLDivElement | null, moreOffset: boolean = false) => {
        console.log('Scrolling to section:', sectionRef);
        if (sectionRef) {
            console.log(sectionRef);
            window.scrollTo({
                top: sectionRef.offsetTop - (moreOffset ? 125 : 75),
                behavior: 'smooth', // Smooth scroll
            });
        }
    };

    onMount(() => {
        // tick().then(() => 
            pageRefs.init()
        // );

        return () => pageRefs.cleanup();
    })

</script>

<Background />
<NavBar {scrollToSection} />
<div class='line-break'></div>
<Hello />
<div class='line-break'></div>
<AboutMe />
<div class='line-break'></div>
<Stack {scrollToSection} />
<div class='line-break'></div>
<Experience />
<div class='line-break'></div>
<Projects />
<div class='line-break'></div>