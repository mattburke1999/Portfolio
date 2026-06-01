<script lang="ts">

    import type { StackItemFadeStates, Modal } from '../../../../Types/tech-stack';

    import StackItem from './StackItem.svelte';

    type Props = {
        spinAnimation: boolean;
        stackItemFadeState: StackItemFadeStates;
        openModal: (modalName: string) => void;
        modals: Modal[];
    }

    let { 
        spinAnimation, 
        stackItemFadeState, 
        openModal,
        modals
    }: Props = $props();

</script>

<div class={['stack', spinAnimation && 'spin']}>
    {#each modals as modal, index (modal.name)}
        <StackItem
            {modal} 
            {openModal} 
            {spinAnimation}
            {stackItemFadeState}
            --index={index}
        />
    {/each}
</div>

<style>
    
    .stack {
        position: absolute;
        width: calc(2 * var(--radius));
        height: calc(2 * var(--radius));
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(0deg);
        z-index: 9;
        --duration: 60s;
    }
    .spin {
        animation: spin var(--duration) linear infinite;
    }

    @keyframes spin {
        to {
            transform: translate(-50%, -50%) rotate(360deg);
        }
    }
</style>