
import { createAndShareWhatsappSticker } from './StickerManager';

export async function saveImageAsSticker(imageUrl, stickerName) {
  try {
    await createAndShareWhatsappSticker(imageUrl, stickerName);
    return;
  } catch (error) {
    console.error('Error al guardar el sticker:', error);
    throw new Error('No se pudo guardar el sticker');
  }
}

