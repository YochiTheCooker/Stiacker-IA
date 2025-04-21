<script>
  import { convertToWebP, guardarStickerWebP, compartirStickerWebP } from '../services/StickerManager.js';
  export let imageSrc;
  let guardando = false;
  let mensaje = '';

  async function handleGuardarYCompartir() {
    guardando = true;
    mensaje = '';
    try {
      const base64WebP = await convertToWebP(imageSrc);
      const nombreArchivo = `sticker_${Date.now()}`;
      await guardarStickerWebP(base64WebP, nombreArchivo);
      await compartirStickerWebP(nombreArchivo);
      mensaje = '¡Sticker guardado y listo para compartir en WhatsApp!';
    } catch (e) {
      mensaje = 'Ocurrió un error al guardar o compartir el sticker.';
      console.error(e);
    }
    guardando = false;
  }
</script>

<div class="flex flex-col items-center space-y-4">
  <button
    class="bg-green-500 text-white px-4 py-2 rounded shadow"
    on:click={handleGuardarYCompartir}
    disabled={guardando}
  >
    {guardando ? 'Guardando...' : 'Guardar y compartir en WhatsApp'}
  </button>
  {#if mensaje}
    <div class="text-center text-sm text-gray-700">{mensaje}</div>
  {/if}
</div>
