
<script>
  import { fade } from 'svelte/transition';
  import LoadingIcon from './ui/LoadingIcon.svelte';
  let componentPromise;
  let Component;
  let loading = true;

  

  componentPromise = new Promise(resolve => {
      setTimeout(() => {
          import('./StickerGenerator.svelte').then(module => {
            resolve(module.default);
          });
      },)
    });

    componentPromise.then(module => {
      Component = module;
      loading = false;
    });

    export let imageSrc = null;
</script>

{#if !loading && Component}
  <svelte:component this={Component} imageSrc={imageSrc}/>
{:else }
  <div class="flex align-center justify-center"
    out:fade={{duration:300}}
  >
    <LoadingIcon />
  </div>
{/if}