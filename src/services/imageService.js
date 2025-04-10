const API_URL = 'https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-dev'
const API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY

export async function generateImage(prompt) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: prompt,
      }),
    })

    if (!response.ok) {
      throw new Error('Error al generar la imagen')
    }

    const blob = await response.blob()
    return URL.createObjectURL(blob)
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
} 