svelte
<script>
    let componentPromise;
    let Component;
    
    export let examples = [];

    

    componentPromise = import('./ExampleGallery.svelte');

    componentPromise.then(module => {
        Component = module.default;
    });
    $: if (Component && examples) {
        console.log('Passing examples to ExampleGallery', examples);
    };
</script>

{#if Component}
    <svelte:component this={Component} {...props}/>
{:else}
    <p>Loading...</p>
{/if}
