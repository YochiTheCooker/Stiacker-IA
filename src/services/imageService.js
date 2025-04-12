import { sanitizeInput, validatePrompt } from './securityUtils';

const API_URL = 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2';
const API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;

// Validar que la API Key esté configurada
if (!API_KEY) {
  console.error('⚠️ API Key de Hugging Face no configurada correctamente. La generación de imágenes no funcionará.');
}

/**
 * Genera una imagen a partir de un prompt utilizando la API de Hugging Face
 * @param {string} prompt - Descripción textual de la imagen a generar
 * @returns {Promise<string>} URL de la imagen generada
 */
export async function generateImage(prompt) {
  try {
    // Validar el prompt
    const { valid, message } = validatePrompt(prompt);
    if (!valid) {
      throw new Error(message);
    }

    // Sanitizar el prompt antes de enviarlo
    const sanitizedPrompt = sanitizeInput(prompt);

    // Verificar API Key
    if (!API_KEY) {
      throw new Error('API Key no configurada. Por favor, configura la API Key en las variables de entorno.');
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: sanitizedPrompt,
      }),
    });

    if (!response.ok) {
      // Manejar diferentes códigos de error
      if (response.status === 401) {
        throw new Error('Error de autenticación. Verifica tu API Key.');
      } else if (response.status === 429) {
        throw new Error('Límite de API excedido. Intenta más tarde.');
      } else {
        throw new Error(`Error al generar la imagen (${response.status})`);
      }
    }

    const blob = await response.blob();
    
    // Verificar el tipo de contenido del blob
    if (!blob.type.startsWith('image/')) {
      throw new Error('El servidor no devolvió una imagen válida');
    }
    
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Error en generateImage:', error);
    throw error;
  }
} 