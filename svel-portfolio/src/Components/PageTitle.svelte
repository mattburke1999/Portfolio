<script lang="ts">

    let { title, className }: { title: string, className?: string } = $props();
</script>

<h1 class={className}>{title}</h1>

<style>
    
    h1 {
        color: var(--text-color);
        text-decoration: underline;
        font-size: 2.35rem;
        margin: 0;
    }
</style>