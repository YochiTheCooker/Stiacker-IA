<script>
  import Button from './ui/Button.svelte';
  import Card from './ui/Card.svelte';
  
  export let imageUrl;
  export let onSave;
</script>

<Card>
  <div class="space-y-4">
    <div class="aspect-square rounded-xl overflow-hidden bg-gray-100">
      <img
        src={imageUrl}
        alt="Sticker generado"
        class="w-full h-full object-cover"
      />
    </div>
    <Button variant="success" on:click={onSave}>
      Guardar como Sticker
    </Button>
  </div>
</Card> 