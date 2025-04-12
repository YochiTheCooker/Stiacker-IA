<script>
  import Button from '../ui/Button.svelte';
  import { validatePrompt, sanitizeInput } from '../../services/securityUtils';

  export let onSubmit;
  export let loading = false;

  let prompt = '';
  let validationError = '';

  function handleSubmit() {
    // Reiniciar mensaje de error
    validationError = '';

    // Limpiar espacios en blanco
    const trimmedPrompt = prompt.trim();

    // Validar el prompt
    const validation = validatePrompt(trimmedPrompt);
    if (!validation.valid) {
      validationError = validation.message;
      return;
    }

    // Sanitizar la entrada y enviar
    const sanitizedPrompt = sanitizeInput(trimmedPrompt);
    onSubmit({ prompt: sanitizedPrompt });
    // Clear prompt after successful submission
    prompt = '';
  }
</script>

<form 
  on:submit|preventDefault={handleSubmit} 
  class="flex items-center gap-2"
>
  <div class="flex-grow min-w-[60px]">
    <input
      type="text"
      bind:value={prompt}
      placeholder="Describe tu sticker..."
      required
      class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-apple-purple focus:border-transparent transition-all"
      aria-label="Descripción del sticker"
      maxlength="500"
    />

    {#if validationError}
      <p class="text-red-600 text-xs mt-1">{validationError}</p>
    {/if}
  </div>
  
  <Button 
    type="submit" 
    loading={loading} 
    fullWidth={false} 
    class="px-4 py-3 rounded-xl flex-shrink-0 text-sm sm:text-base"
  >
    {#if loading}
      <span class="animate-spin">⌛</span>
    {:else}
      <span aria-label="Enviar">Enviar</span>
    {/if}
  </Button>
</form>