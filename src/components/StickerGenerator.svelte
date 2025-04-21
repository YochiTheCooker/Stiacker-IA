<script>
    import { onMount, onDestroy } from 'svelte';
    import { generateImage } from '../services/imageService';
    import { isWeb } from '../services/utils';
    import { generatedImage, isLoading, error } from '../stores/imageStore';
    import StickerForm from './forms/StickerForm.svelte';
    import StickerPreview from './StickerPreview.svelte';
    import { fade, slide } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import Header from './ui/Header.svelte';
    import ExampleGallery from './ExampleGallery.svelte';
    import Loader from './ui/Loader.svelte';
  

    let sanitizeWorker = null;

    onMount(() => {
    
      sanitizeWorker = new Worker(new URL('../workers/sanitize.worker.js', import.meta.url), { type: 'module' });

 
      sanitizeWorker.onmessage = (event) => {
        $error = event.data; // Update the store with sanitized HTML from the worker
      };

 
      sanitizeWorker.onerror = (err) => {
        console.error('Sanitize worker error:', err);
        $error = 'Error displaying message.'; // Fallback error
      };
    });

    onDestroy(() => {
      // Terminate the worker when the component is destroyed
      if (sanitizeWorker) {
        sanitizeWorker.terminate();
      }
    });

    async function handleSubmit({ prompt }) {
      try {
        $isLoading = true
        $error = null
        const imageUrl = await generateImage(prompt)
        $generatedImage = imageUrl
      } catch (err) {
        console.error('Error en generación:', 
          import.meta.env.PROD ? 'Error de generación' : err);
        // Send the raw error message to the worker for sanitization
        if (sanitizeWorker) {
          sanitizeWorker.postMessage(err.message || 'Unknown generation error'); 
        } else {
          $error = 'Could not process error message.'; // Fallback if worker failed to load
        }
      } finally {
        $isLoading = false
      }
    }

  </script>

  <div class="bg-white" transition:fade={{ duration: 700 }}>
  {#if isWeb()}
    <Header class="w-full" />
    {/if}
  
    <!-- Adjusted min-height calculation if needed, added padding-bottom -->
    <main class="flex-grow overflow-y-auto px-4 pb-28 w-full max-w-2xl mx-auto">
      <section class="py-6">
        {#if $isLoading}
      <Loader text="Generando tu sticker" />
        {:else}
        {#if $error}
          <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-4"
               in:slide={{ duration: 300, easing: quintOut }}
               out:fade={{ duration: 200 }}>
            <!-- Render the already sanitized HTML from the store -->
            <p class="text-red-700">{@html $error}</p> 
          </div>
        {/if}
        {#if $generatedImage}
        <div class="justify-center">
          
          <StickerPreview imageSrc={$generatedImage} />
        </div>
        {:else}
          <section class="py-4"
                   in:slide={{ duration: 400, easing: quintOut }}
                   out:fade={{ duration: 200 }}>
            <h2 class="flex justify-center text-xl font-bold text-apple-gray text-center mb-4">
              Inspiración para tus stickers
            </h2>
            <ExampleGallery/>
          </section>
          {/if}
        {/if}
      </section>
    </main>

    <!-- Form moved outside main, added fixed positioning and background -->
    <div class="fixed bottom-0 left-0 right-0 z-10 bg-white p-4 border-t border-gray-200">
       <div class="max-w-2xl mx-auto"> <!-- Optional: Constrain form width -->
         <StickerForm onSubmit={handleSubmit} loading={$isLoading} />
       </div>
    </div>
  </div>
