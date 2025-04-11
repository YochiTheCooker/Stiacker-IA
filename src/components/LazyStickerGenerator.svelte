
<script>
  let componentPromise;
  let Component;

  componentPromise = import('./StickerGenerator.svelte');

    componentPromise.then(module => {
        Component = module.default;
    });

    export let imageSrc = null;
</script>

{#if Component}
  <svelte:component this={Component} imageSrc={imageSrc}/>
{:else}
  <p>Loading...</p>
{/if}