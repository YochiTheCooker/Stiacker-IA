<script>
  import StickerGenerator from './components/StickerGenerator.svelte';
  import { onMount } from 'svelte';
  import { selectedImageStore } from './stores/imageStore';
  import { get } from 'svelte/store';

  let selectedImage;
  onMount(() => {
    selectedImage = get(selectedImageStore)
  });

</script>

<main>
  <StickerGenerator imageSrc={selectedImage} />
</main>
