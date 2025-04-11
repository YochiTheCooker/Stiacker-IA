<script>
  import Button from '../ui/Button.svelte';
  import Input from '../ui/Input.svelte';
  
  export let onSubmit;
  export let loading = false;
  
  let prompt = '';
  
  function handleSubmit() {
    onSubmit({ prompt });
  }
</script>

<div class="w-full max-w-2xl mx-auto">
  <form on:submit|preventDefault={handleSubmit} class="flex flex-col sm:flex-row gap-2 w-full">
    <div class="flex-1">
      <input
        type="text"
        bind:value={prompt}
        placeholder="Describe tu sticker... (ej: Un llama astronauta)"
        required
        class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-apple-purple focus:border-transparent transition-all"
      />
    </div>
    <Button type="submit" isloading={loading} fullWidth={false} class="px-6">
      {#if loading}
        <span>Cargando...</span>
      {:else}
        Enviar
      {/if}
    </Button>
  </div>