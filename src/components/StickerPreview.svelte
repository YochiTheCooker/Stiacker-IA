<script>
import Card from './ui/Card.svelte';
import StickerShare from './StickerShare.svelte';

export let imageSrc;

</script>



  <Card>
  <div class="space-y-4">
    <div class="aspect-square rounded-xl overflow-hidden bg-gray-100">
      <img src={imageSrc} alt="Sticker generado" class="w-full h-full object-cover" />
    </div>
    <StickerShare {imageSrc} />
  </div>
  </Card>

