// src/services/stickerService.js
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

/**
 * Convierte una imagen a WebP 512x512 y la retorna en base64 (sin prefijo dataURL)
 */
export async function convertToWebP(imageSrc) {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, 512, 512);
      ctx.drawImage(img, 0, 0, 512, 512);
      canvas.toBlob(
        (blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            // Extrae solo la parte base64
            const base64 = reader.result.split(',')[1];
            resolve(base64);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        },
        'image/webp',
        0.95
      );
    };
    img.onerror = reject;
    img.src = imageSrc;
  });
}

/**
 * Guarda el sticker en la carpeta de WhatsApp Stickers
 */
export async function guardarStickerWebP(base64WebP, nombreArchivo) {
  await Filesystem.writeFile({
    path: `WhatsApp/Media/WhatsApp Stickers/${nombreArchivo}.webp`,
    data: base64WebP,
    directory: Directory.External,
  });
}

/**
 * Comparte el sticker usando el plugin Share
 */
export async function compartirStickerWebP(nombreArchivo) {
  await Share.share({
    url: `file:///storage/emulated/0/WhatsApp/Media/WhatsApp Stickers/${nombreArchivo}.webp`,
    dialogTitle: 'Compartir sticker en WhatsApp'
  });
}