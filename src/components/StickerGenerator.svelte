<script>
  import { generateImage } from '../services/imageService'
  import { saveImageAsSticker } from '../services/stickerService'
  import { generatedImage, isLoading, error } from '../stores/imageStore'
  import StickerForm from './forms/StickerForm.svelte'
  import StickerPreview from './StickerPreview.svelte'
  import ExampleGallery from './ExampleGallery.svelte'
  import { fade, slide } from 'svelte/transition'
  import { quintOut } from 'svelte/easing'
  import Header from './ui/Header.svelte'
  
  async function handleSubmit({ prompt }) {
    try {
      $isLoading = true
      $error = null
      const imageUrl = await generateImage(prompt)
      $generatedImage = imageUrl
    } catch (err) {
      $error = err.message
    } finally {
      $isLoading = false
    }
  }
  
  async function handleSaveSticker() {
    if ($generatedImage) {
      try {
        await saveImageAsSticker($generatedImage)
      } catch (err) {
        $error = 'Error al guardar el sticker: ' + err.message
      }
    }
  }
</script>

<div class="min-h-screen bg-gradient-to-b from-gray-100 to-white">

  <Header/>

  <main class="flex flex-col min-h-[calc(100vh-4rem)] pb-24">
    <div class="max-w-2xl mx-auto px-4 w-full">
      
      <section class="py-6">
        {#if $error}
          <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-4"
               in:slide={{ duration: 300, easing: quintOut }}
               out:fade={{ duration: 200 }}>
            <p class="text-red-700">{$error}</p>
          </div>
        {/if}
        {#if $generatedImage}
          <div in:slide={{ duration: 400, delay: 300, easing: quintOut }}
               out:fade={{ duration: 200 }}>
            <StickerPreview
              imageUrl={$generatedImage}
              onSave={handleSaveSticker}
            />
          </div>
        {:else}
          <section class="py-4"
                   in:slide={{ duration: 400, easing: quintOut }}
                   out:fade={{ duration: 200 }}>
            <h2 class="flex justify-center text-xl font-semibold text-gray-800 mb-4">
              Inspiración para tus stickers
            </h2>
            <ExampleGallery />
          </section>
        {/if}
      </section>
    </div>

    
    <div class="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-lg z-10">
      <div class="max-w-2xl mx-auto px-4 py-4">
        <StickerForm onSubmit={handleSubmit} loading={$isLoading} />
      </div>
    </div>
  </main>
</div> 