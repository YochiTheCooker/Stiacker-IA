<script>
    import { onMount, onDestroy } from 'svelte';
    import { generateImage } from '../services/imageService'
    import { saveImageAsSticker } from '../services/stickerService'
    import { isWeb } from '../services/utils'
    import { generatedImage, isLoading, error } from '../stores/imageStore'
    import StickerForm from './forms/StickerForm.svelte'
    import StickerPreview from './StickerPreview.svelte'
    import { fade, slide } from 'svelte/transition'
    import { quintOut } from 'svelte/easing'
    import Header from './ui/Header.svelte'
    import ExampleGallery from './ExampleGallery.svelte'
    // Removed direct DOMPurify import

    let sanitizeWorker = null;

    onMount(() => {
      // Instantiate the worker
      // The { type: 'module' } might be necessary depending on your bundler setup for workers
      sanitizeWorker = new Worker(new URL('../workers/sanitize.worker.js', import.meta.url), { type: 'module' });

      // Handle messages received from the worker
      sanitizeWorker.onmessage = (event) => {
        $error = event.data; // Update the store with sanitized HTML from the worker
      };

      // Optional: Handle worker errors
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

    async function handleSaveSticker() {
      if ($generatedImage) {
        try {
          await saveImageAsSticker($generatedImage)
        } catch (err) {
           console.error('Error saving sticker:', err);
          // Send the raw error message to the worker for sanitization
          if (sanitizeWorker) {
             sanitizeWorker.postMessage('Error al guardar el sticker: ' + (err.message || 'Unknown save error'));
          } else {
             $error = 'Could not process error message.'; // Fallback if worker failed to load
          }
        }
      }
    }

  </script>

  <div class="bg-white" transition:fade={{ duration: 700 }}>
  {#if isWeb()}
    <Header class="w-full" />
    {/if}
  
    <main class="flex flex-col min-h-[calc(100vh-4rem)] pb-24 w-full max-w-2xl mx-auto">
      <div class="px-4 w-full">
        
        <section class="py-6">
          {#if $error}
            <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-4"
                 in:slide={{ duration: 300, easing: quintOut }}
                 out:fade={{ duration: 200 }}>
              <!-- Render the already sanitized HTML from the store -->
              <p class="text-red-700">{@html $error}</p> 
            </div>
          {/if}
          {#if $generatedImage}
            <div in:slide={{ duration: 400, delay: 300, easing: quintOut }}
                 out:fade={{ duration: 200 }}>
              <StickerPreview 
                imageSrc={$generatedImage} 
                onSave={handleSaveSticker}
              /> 
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
        </section>
      
        <div class="max-w-2xl mx-auto px-4 py-4">
          <StickerForm onSubmit={handleSubmit} loading={$isLoading} />
        </div>
      
    </main>
  </div>