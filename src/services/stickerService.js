import { Filesystem, Directory } from '@capacitor/filesystem'
import { Share } from '@capacitor/share'

export async function saveImageAsSticker(imageUrl) {
  try {
    // Si estamos en un navegador web, usamos la API de descarga nativa
    if (typeof window !== 'undefined' && !window.Capacitor) {
      const link = document.createElement('a')
      link.href = imageUrl
      link.download = `sticker-${Date.now()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      return
    }

    // Si estamos en móvil, usamos Capacitor
    const response = await fetch(imageUrl)
    const blob = await response.blob()
    const base64Data = await new Promise((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result.split(',')[1])
      reader.readAsDataURL(blob)
    })

    const fileName = `sticker-${Date.now()}.png`
    await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Documents,
    })

    return fileName
  } catch (error) {
    console.error('Error al guardar el sticker:', error)
    throw new Error('No se pudo guardar el sticker')
  }
} 