<script lang="ts">

    import type { Modal, StackItemFadeStates } from '../../../../Types/tech-stack';

    type Props = {
        modal: Modal;
        openModal: (modalName: string) => void;
        spinAnimation: boolean;
        stackItemFadeState: StackItemFadeStates;
    }

    let { modal, openModal, spinAnimation, stackItemFadeState }: Props = $props();

</script>
<div class={['stackItemFade', spinAnimation && 'spin']}>
    <button class={[
        'stackItem',
        modal.color,
        stackItemFadeState && `${stackItemFadeState}${modal.fadeDir}`
    ]} onclick={() => openModal(modal.name)}>
        <img draggable={false} src={modal.img} alt={modal.title}/>
        <h3>{modal.title}</h3>
    </button>
</div>

<style>
/* FIX MOBILE STYLINGS */
    .stackItemFade {
        position: absolute;
        width: var(--item-size);
        height: var(--item-size);
        z-index: 10;
        left: 50%;
        top: 50%;
        transform:
            translate(-50%, -50%)
            rotate(calc(var(--index, 0) * 45deg))
            translateX(var(--radius))
            rotate(calc(var(--index, 0) * -45deg));
    }
    .stackItemFade.spin {
        animation: keep-upright var(--duration) linear infinite;
    }

    @keyframes keep-upright {
        to {
            transform:
                translate(-50%, -50%)
                rotate(calc(var(--index, 0) * 45deg))
                translateX(var(--radius))
                rotate(calc(var(--index, 0) * -45deg - 360deg));
        }
    }    

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: 
                translate(-50%, -50%)
                rotate(calc(var(--index, 0) * 45deg))
                translateX(calc(100px + var(--radius)))
                rotate(calc(var(--index, 0) * -45deg));
        }
        to {
            opacity: 1;
            transform:
                translate(-50%, -50%)
                rotate(calc(var(--index, 0) * 45deg))
                translateX(var(--radius))
                rotate(calc(var(--index, 0) * -45deg));
        }
    }
    @keyframes fadeOut {
        from {
            opacity: 1;
            /* transform:
                translate(-50%, -50%)
                rotate(calc(var(--index, 0) * 45deg))
                translateX(var(--radius))
                rotate(calc(var(--index, 0) * -45deg)); */
        }
        to {
            opacity: 0;
            /* transform: 
                translate(-50%, -50%)
                rotate(calc(var(--index, 0) * 45deg))
                translateX(calc(100px + var(--radius)))
                rotate(calc(var(--index, 0) * -45deg)); */
        }
    }
    .stackItem {
        width: 100%;
        height: 100%;        
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        gap: .25rem;
        box-shadow: 0px 0px 6px black;
        border: 1px solid var(--text-color);
        outline: none;
        color: var(--text-color);
        background-color: var(--app-gray);
        border-radius: .75rem;
    }
    .stackItem img {
        width: 60%;
        height: 60%;
    }
    .stackItem h3 {
        margin: 0;
        font-size: 1.15rem;
        font-weight: 600;
        text-align: center;
    }

    .stackItem.blue:hover {
        border-color: var(--blue-color);
        box-shadow: 0px 0px 10px var(--blue-color);
    }
    .stackItem.purple:hover {
        border-color: var(--purple-color);
        box-shadow: 0px 0px 10px var(--purple-color);
    }
    .stackItem.yellow:hover {
        border-color: var(--yellow-color);
        box-shadow: 0px 0px 10px var(--yellow-color);
    }
    .stackItem.orange:hover {
        border-color: var(--orange-color);
        box-shadow: 0px 0px 10px var(--orange-color);
    }
    .stackItem.red:hover {
        border-color: var(--red-color);
        box-shadow: 0px 0px 10px var(--red-color);
    }

    @media (max-width: 768px) {
        
        .stackItem img {
            width: 1rem;
            height: 1rem;
        }
        .stackItem h3 {
            font-size: .4rem;
        }
    }

</style>