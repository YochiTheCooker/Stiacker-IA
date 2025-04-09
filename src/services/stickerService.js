import { Filesystem, Directory } from '@capacitor/filesystem'
import { Share } from '@capacitor/share'

export async function saveImageAsSticker(imageUrl) {
  try {
    // Descargar la imagen
    const response = await fetch(imageUrl)
    const blob = await response.blob()

    // Convertir blob a base64
    const reader = new FileReader()
    const base64Data = await new Promise((resolve) => {
      reader.onloadend = () => resolve(reader.result)
      reader.readAsDataURL(blob)
    })

    // Guardar el archivo
    const fileName = `sticker-${Date.now()}.webp`
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Cache
    })

    // Compartir como sticker de WhatsApp
    await Share.share({
      title: 'Compartir Sticker',
      url: savedFile.uri,
      dialogTitle: 'Compartir como sticker'
    })

    return savedFile.uri
  } catch (error) {
    console.error('Error al guardar el sticker:', error)
    throw error
  }
} 