import { validateImageUrl } from './securityUtils';

/**
 * Guarda una imagen como sticker para su uso posterior
 * @param {string} imageUrl - URL de la imagen a guardar
 * @returns {Promise<string>} Nombre del archivo guardado o ubicación
 */
export async function saveImageAsSticker(imageUrl) {
  try {
    // Validar URL de la imagen
    if (!validateImageUrl(imageUrl)) {
      throw new Error('URL de imagen inválida o insegura');
    }

    // Generar un nombre de archivo seguro con timestamp
    const fileName = `sticker-${Date.now()}.png`;
    
    // Crear un link de descarga para la versión web
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = fileName;
    
    // Usar un método seguro para descargar
    document.body.appendChild(link);
    link.click();
    
    // Limpiar después de la descarga
    setTimeout(() => {
      document.body.removeChild(link);
      // Revocar el objeto URL para liberar memoria
      if (imageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imageUrl);
      }
    }, 100);
    
    return fileName;
  } catch (error) {
    console.error('Error al guardar el sticker:', error);
    throw new Error('No se pudo guardar el sticker: ' + error.message);
  }
}

