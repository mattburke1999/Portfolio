<script lang="ts">
    import { pageRefs } from '../../Stores/pageRefs.svelte';

    import PageTitle from '../../Components/PageTitle.svelte';
    import ButtonLink from '../../Components/ButtonLink.svelte';

</script>
<div class='aboutMePage' bind:this={pageRefs.pages.aboutMe}>
    <PageTitle title='About Me' />
    <div class='aboutMeCard'>
        <div class='profile'>
            <img src="/images/me-pic.jpg" alt="Profile" />
        </div>
        <div class='description'>
            <p>
                I am a software developer with a passion for creating innovative solutions. I have experience in various programming languages and technologies, and I enjoy learning new skills to enhance my expertise.
            </p>
            <p>
                In my free time, I love to work on personal projects and explore new technologies. I also enjoy spending time outside running, camping, hiking, etc.
            </p>
        </div>
        <ButtonLink href='/files/Burke, Matthew Resume 2025.pdf' text='View Resume'>
            <i class="fa-solid fa-file-pdf"></i>
        </ButtonLink>
    </div>
</div>
<style>
    .aboutMePage {
        position: relative;
        width: 100%;
        height: 685px;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: var(--text-color);
        gap: 1.75rem;
    }
    .aboutMeCard {
        width: 500px;
        height: 500px;
        background-color: var(--app-gray);
        color: var(--text-color);
        border-radius: 1rem;
        border: 2px solid var(--text-color);
        padding: .75rem;
        gap: 1.5rem;
        box-shadow: 0px 0px 10px black;
        z-index: 10;
    }
    .aboutMeCard, .description {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .description {
        border: 2px dashed var(--text-color);
        border-radius: .75rem;
        padding: .5rem;
        justify-content: center;
        gap: .5rem;
    }

    p {
        margin: 0;
    }

    p {
        font-size: 1rem;
        text-align: justify;
    }
    .aboutMePage :global(h1) {
        margin-top: 2rem;
    }
    .profile {
        width: 15rem;
        height: 15rem;
        border-radius: 50%;
        box-shadow: 0px 1px 6px 1.5px var(--bg-color);
        border: 4px solid var(--text-color);
    }
    .profile img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
    }

    @media (max-width: 768px) {
        .aboutMePage {
            height: 450px;
            gap: 1rem;
        }
        .aboutMeCard {
            width: 275px;
            height: 275px;
            padding: 0.5rem;
            gap: .25rem;
            justify-content: center;
            top: 65%;
        }
        .profile {
            width: 4.5rem;
            height: 4.5rem;
        }
        .description {
            padding: 0.25rem;
            gap: .25rem;
            width: 70%;
        }
        .aboutMeCard p {
            font-size: 0.55rem;
        }
        .description p {
            font-size: 0.65rem;
        }

    }

</style>