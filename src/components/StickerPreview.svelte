<script>
import Button from './ui/Button.svelte';
import Card from './ui/Card.svelte';
import { saveImageAsSticker } from '../services/stickerService';

export let imageSrc;
const handleSaveSticker = async () => {
  try {
    await saveImageAsSticker(imageSrc, 'sticker');
    alert("Sticker saved successfully");
  } catch (error) {
    console.error("Error saving sticker:", error);
    alert("Error saving sticker");
  }
};
</script>

<Card>
<div class="space-y-4">
  <div class="aspect-square rounded-xl overflow-hidden bg-gray-100">
    <img src={imageSrc} alt="Sticker generado" class="w-full h-full object-cover" />
  </div>
  <Button variant="success" on:click={handleSaveSticker}>
    Save as Sticker
  </Button>
</div>
</Card>