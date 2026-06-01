<script lang="ts">

    import type { Component } from 'svelte';

    type Props = {
        closeModal: () => void;
        content: Component<any>;
        props?: Record<string, unknown>;
        color: string;
        modalFadeClass: string | undefined;
    }

    let { closeModal, content: Content, props = {}, color, modalFadeClass }: Props = $props();

</script>
<!-- TODO: ADD COLOR SHADOW, FIX SWITCHING TO MODALS AND SCROLLING TO PROJECTS -->
<div class={['modal', modalFadeClass]}>
    <Content {...props} />
    <button onclick={closeModal}>X</button>
</div>
<div class='modalBackdrop' onclick={closeModal} aria-hidden="true"></div>

<style>
    .modal {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: var(--app-gray);
        border-radius: 10px;
        border: 1px solid var(--app-gray);
        padding: 1rem;
        box-shadow: 0px 0px 20px black;
        z-index: 10;
    }
    .modalBackdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 95vh;
        background-color: transparent;
        z-index: 9;
    }
    button {
        position: absolute;
        top: 1vh;
        right: 1vh;
        background-color: transparent;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
    }
    .modal :global(.modalContent) {
        color: var(--text-color);
    }
    .modal :global(.modalContent h3) {
        margin: 0;
    }

    .modal :global(.modalContent h1) {
        font-size: 2rem;
        margin: 0;
        margin-bottom: 1rem;
        color: var(--text-color);
    }

    .modal :global(.expert) {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1.5rem;
        margin-bottom: 1rem;
    }

    .modal :global(.expert h3) {
        margin: 0;
        font-weight: 600;
        font-size: 1.2rem;
        color: var(--text-color);
    }

    .modal :global(.modalContent p) {
        margin: 0.5rem 0;
    }
    .modal :global(.desc) {
        font-size: 0.9rem;
    }
    .modal :global(.underline) {
        text-decoration: underline;
    }

    .modal :global(.tools) {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(125px, 1fr));
        gap: 0.5rem;
        padding-left: 1rem;
    }

    .modal :global(.tools li) {
        list-style-type: circle;
        color: var(--text-color);
        font-size: 0.95rem;
    }

    .modal :global(.tools li::marker) {
        color: var(--text-color);
    }
    .modal :global(.tools li.purpleMarker::marker) {
        color: var(--purple-color);
    }
    .modal :global(.tools li.yellowMarker::marker) {
        color: var(--yellow-color);
    }
    .modal :global(.tools li.blueMarker::marker) {
        color: var(--blue-color);
    }
    .modal :global(.tools li.orangeMarker::marker) {
        color: var(--orange-color);
    }
    .modal :global(.projects) {
        display: flex;
        flex-direction: column;
        align-self: flex-start;
        gap: 0.1rem;
    }

    .modal :global(.proj) {
        margin-top: 1rem;
        margin-bottom: 0.5rem;
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--text-color);
        text-decoration: underline;
    }

    .modal :global(.projRef) {
        background: none;
        border: none;
        color: var(--link-color);
        font-weight: 600;
        font-size: .95rem;
        text-decoration: underline;
        padding: 0;
        cursor: pointer;
        width: fit-content;
    }

    .modal :global(.projRef:hover) {
        color: var(--link-hover-color);
    }

    .modal :global(.lineBreak) {
        width: 100%;
        height: 1px;
        background-color: var(--app-gray);
        margin: 1rem 0;
    }

    @media screen and (max-width: 768px) {
        .modal :global(.modalContent) {
            font-size: 0.7rem;
            padding: 0;
        }
        .modal :global(.modalContent h1) {
            font-size: 1.5rem;
        }
        .modal :global(.modalContent p) {
            font-size: 0.8rem;
        }
        .modal :global(.expert) {
            gap: 1rem;
            margin-bottom: .5rem;
        }
        .modal :global(.expert h3) {
            font-size: .9rem;
        }
        .modal :global(.tools) {
            grid-template-columns: repeat(auto-fit, minmax(75px, 1fr));
        }
        .modal :global(.tools li), .modal :global(.projRef) {
            font-size: 0.6rem;
        }
        .modal :global(.proj) {
            font-size: 1rem;
        }
    }
</style>