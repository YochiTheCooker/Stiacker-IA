

export async function saveImageAsSticker(imageUrl) {
  try {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `sticker-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  } catch (error) {
    console.error('Error al guardar el sticker:', error);
    throw new Error('No se pudo guardar el sticker');
  }
} 