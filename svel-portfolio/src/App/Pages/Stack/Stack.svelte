<script lang="ts">

    import { onMount } from 'svelte';

    import { pageRefs } from '../../../Stores/pageRefs.svelte'

    import type { ModalFadeStates, StackItemFadeStates, Modal } from '../../../Types/tech-stack';

    import TechStack from './TechStack/TechStack.svelte';
    import TechModal from './TechModals/TechModal.svelte';
    import StackDesc from './StackDesc.svelte';

    import javaLogo from '../../../assets/logos/java-logo.png';
    import JavaModal from './TechModals/JavaModal.svelte';
    import pyLogo from '../../../assets/logos/py-logo.png';
    import PythonModal from './TechModals/PythonModal.svelte';
    import htmlCSSLogo from '../../../assets/logos/html-css-logo.png';
    import HtmlModal from './TechModals/HtmlModal.svelte';
    import jsLogo from '../../../assets/logos/js-logo.png';
    import JSModal from './TechModals/JavaScriptModal.svelte';
    import csLogo from '../../../assets/logos/cs-logo.png';
    import CSharpModal from './TechModals/CSharpModal.svelte';
    import sqlLogo from '../../../assets/logos/sql-logo.png';
    import SQLModal from './TechModals/SQLModal.svelte';
    import rustLogo from '../../../assets/logos/rust-logo.png';
    import RustModal from './TechModals/RustModal.svelte';
    import azFuncLogo from '../../../assets/logos/az-func-logo.png';
    import AzFuncModal from './TechModals/AzFuncModal.svelte';

    type Props = {
        scrollToSection: (sectionRef: HTMLDivElement | null, moreOffset?: boolean) => void;
    }

    let { scrollToSection }: Props = $props();

    let modalVisible = $state<Modal | null>(null);
    let modalFadeState = $state<ModalFadeStates>('fadeInModal');
    let stackItemFadeState = $state<StackItemFadeStates>('fadeIn');
    let spinAnimation = $state<boolean>(false);

    const openModal = (modalName: string) => {
        const modal = modals.find(m => m.name === modalName);
        if (modal) {
            let timeout = 0;
            if (modalVisible) {
                modalFadeState = 'fadeOutModal';
                timeout = 1000;
            }
            setTimeout(() => {
                if (timeout) modalVisible = modal;
                modalFadeState = 'fadeInModal';
                stackItemFadeState = 'fadeOut';
                setTimeout(() => {
                    spinAnimation = false;
                    modalVisible = modal;
                }, 1000);
            }, timeout);
        }
    }

    const closeModal = () => {
        modalFadeState = 'fadeOutModal';
        setTimeout(() => {
            modalVisible = null;
            modalFadeState = undefined;
            spinAnimation = true;
            stackItemFadeState = 'fadeIn';
        }, 1000);
    }

    const scrollToProject = (ref: HTMLDivElement | null) => {
        modalVisible = null;
        modalFadeState = undefined;
        stackItemFadeState = 'fadeIn';
        spinAnimation = true;
        scrollToSection(ref, true);
    }

    const modals: Modal[] = $derived([
        {
            name: 'java',
            title: 'Java',
            img: javaLogo,
            fadeDir: 'E',
            color: 'red',
            modal: JavaModal,
        },
        {
            name: 'python',
            title: 'Python',
            img: pyLogo,
            fadeDir: 'SE',
            color: 'blue',
            modal: PythonModal,
            props: {
                setModalVisible: openModal,
                scrollToProject,
            }
        },
        {
            name: 'html_css',
            title: 'HTML/CSS',
            img: htmlCSSLogo,
            fadeDir: 'S',
            color: 'blue',
            modal: HtmlModal
        },
        {
            name: 'js',
            title: 'JavaScript',
            img: jsLogo,
            fadeDir: 'SW',
            color: 'yellow',
            modal: JSModal, 
            props: {
                scrollToProject,
            }
            
        },
        {
            name: 'csharp',
            title: 'C#',
            img: csLogo,
            fadeDir: 'W',
            color: 'purple',
            modal: CSharpModal,
            props: {
                setModalVisible: openModal, 
                scrollToProject,
            }
        },
        {
            name: 'sql',
            title: 'SQL',
            img: sqlLogo,
            fadeDir: 'NW',
            color: 'blue',
            modal: SQLModal,
        },
        {
            name: 'rust',
            title: 'Rust',
            img: rustLogo,
            fadeDir: 'N',
            color: 'orange',
            modal: RustModal,
            props: {
                scrollToProject,
            }
        },
        {
            name: 'azFunc',
            title: 'Azure',
            img: azFuncLogo,
            fadeDir: 'NE',
            color: 'blue',
            modal: AzFuncModal,
            props: {setModalVisible: openModal }
        }
    ]);

    onMount(() => {
        setTimeout(() => {
            spinAnimation = true;
        }, 1200);
    })

</script>

<div class='stackPage' bind:this={pageRefs.pages.stack}>
    {#if modalVisible === null}
        <StackDesc {stackItemFadeState}/>
        <TechStack 
            {spinAnimation} 
            {stackItemFadeState} 
            {openModal}
            {modals}
        />
    {:else}
        <TechModal 
            {closeModal} 
            content={modalVisible.modal} 
            props={modalVisible.props}
            color={modalVisible.color}
            modalFadeClass={modalFadeState}
        />
    {/if}
</div>

<style>
    .stackPage {
        width: 100%;
        height: 95vh;
        display: flex;
        flex-direction: column;
        position: relative;
        align-items: center;
        color: var(--text-color);
        gap: 1rem;
        --inner-radius: 215px;
        --item-size: 120px;
        --gap: 50px;
        --radius: calc(var(--inner-radius) + var(--item-size) / 2 + var(--gap));
        overflow: hidden;
    }

    @media (max-width: 768px) {
        .stackPage {
            height: 55vh;
            min-height: 475px;
            --inner-radius: 125px;
            --item-size: 50px;
            --gap: 20px;
        }
    }
</style>