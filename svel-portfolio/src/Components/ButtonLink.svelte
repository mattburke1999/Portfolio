<script lang="ts">
    import type { Snippet } from 'svelte';

    type Props = {
        href: string;
        text: string;
        title?: string;
        className?: string;
        children: Snippet;
    }

    let { href, text, title = text, className, children }: Props = $props();
</script>
<a {href} target='_blank' {title} class={className} rel='noopener noreferrer' >
    {@render children()}
    <span>{text}</span>
</a>

<style>
    a {
        background-color: var(--button-color, var(--app-blue));
        color: var(--color, var(--text-color));
        padding: 0.5rem;
        border-radius: 6px;
        text-decoration: none;
        font-weight: bold;
        transition: background-color 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        box-shadow: 1px 2px 5px 0px rgb(0, 0, .15);
        pointer-events: auto;
        width: fit-content;
    }
    a:hover span{
        text-decoration: underline;
    }
    @media (max-width: 768px) {
         a {
            font-size: .65rem;
            padding: 0.25rem;
            gap: 0.25rem;
        }
    }
</style>