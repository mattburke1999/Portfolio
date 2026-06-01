<script lang="ts">

    import type { StackItemFadeStates } from '../../../Types/tech-stack';

    import PageTitle from '../../../Components/PageTitle.svelte';
    import ButtonLink from '../../../Components/ButtonLink.svelte';

    let { stackItemFadeState }: { stackItemFadeState: StackItemFadeStates } = $props();
</script>

<div class={['stackInner', stackItemFadeState && `${stackItemFadeState}Modal`]}>
    <!-- <h1>My Tech Stack</h1> -->
    <PageTitle title='My Tech Stack' />
    <p>(Click one of the floating Stack icons to view more)</p>
    <div class='desc'>
        <h3>My Preferred Stack</h3>
        <ul>
            <li><strong>Backend:</strong> C# (ASP.NET) or Python (flask)</li>
            <li><strong>Frontend:</strong> React or Svelte with Typescript</li>
            <li><strong>Database:</strong> PostgreSQL</li>
            <li class='no-bullet'>*&nbsp;&nbsp;Redis for caching or session management</li>
        </ul>
    </div>
    <ButtonLink href='https://github.com/mattburke1999/' text='View GitHub'>
        <i class="fa-brands fa-github"></i>
    </ButtonLink>
</div>

<style>
    .stackInner {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
        border-radius: 50%;
        background-color: var(--app-gray);
        width: calc(2 * var(--inner-radius));
        height: calc(2 * var(--inner-radius));
        border: 2px solid var(--text-color);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2.5rem;
        pointer-events: none;
    }
    .stackInner :global(h1) {
        margin-top: 2.75rem;
    }
    .desc {
        border: 2px dashed var(--text-color);
        border-radius: .75rem;
        padding: .5rem;
        display: flex;
        flex-direction: column;
        gap: .75rem;
    }
    .desc h3 {
        margin: 0;
        font-size: 1.25rem;
        text-decoration: underline;
    }
    .desc ul {
        margin: 0;
        padding: 0;
        padding-left: 1rem;
        display: flex;
        flex-direction: column;
        gap: .75rem;
    }
    p {
        margin: 0;
        margin-bottom: -1.5rem;
    }
    li.no-bullet {
        list-style-type: none;
        font-style: italic;
        transform: translateX(-1rem);
    }
    @media (max-width: 768px) {
        .stackInner {
            gap: 0.675rem;
        }
        .stackInner :global(h1) {
            font-size: 1.25rem;
            margin-top: 1.5rem;
        }
        p {
            font-size: 0.55rem;
            margin: 0;
        }
        .desc h3 {
            font-size: 0.85rem;
        }
        .desc ul {
            font-size: 0.5rem;
            gap: 0.5rem;
            padding-left: 0.75rem;
        }
    }
            
</style>