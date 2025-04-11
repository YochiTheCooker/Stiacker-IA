import stickerManager from './StickerManager';

export async function saveImageAsSticker(imageUrl, stickerName) {
  try {
    await stickerManager.createAndShareWhatsappSticker(imageUrl, stickerName);
    return;
  } catch (error) {
      console.error('Error al guardar el sticker:', error);
      throw new Error('No se pudo guardar el sticker');
  }
}

