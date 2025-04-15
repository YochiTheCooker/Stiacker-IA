import { sanitizeInput, validatePrompt } from './securityUtils';
import { Capacitor } from '@capacitor/core';
import { Http } from '@capacitor-community/http';

const API_URL = 'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev';
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

    const body = { inputs: sanitizedPrompt };
    const headers = {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    };

    if (Capacitor.isNativePlatform()) {
      // Validar que body no sea null
      if (!body || typeof body !== 'object') {
        throw new Error('El cuerpo de la petición (body) no es válido.');
      }
      console.log('Petición a HuggingFace:', { url: API_URL, headers, body });

      const response = await Http.post({
        url: API_URL,
        headers: headers || {},
        data: body || {},
        params: {}
      });
      console.log('Respuesta HuggingFace (nativo):', response);

      if (response.status !== 200) {
        throw new Error(`Error de API: ${response.status} - ${response.data?.error || 'Sin mensaje'}`);
      }

      if (response.data && response.data[0] && response.data[0].image) {
        return response.data[0].image;
      } else {
        throw new Error('La respuesta de la API no contiene la imagen esperada.');
      }
    } else {
      // Petición web (puede fallar por CORS)
      const response = await fetch(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });
      const data = await response.json();
      console.log('Respuesta HuggingFace (web):', data);

      if (!response.ok) {
        throw new Error(`Error de API: ${response.status} - ${data?.error || 'Sin mensaje'}`);
      }

      if (data && data[0] && data[0].image) {
        return data[0].image;
      } else {
        throw new Error('La respuesta de la API no contiene la imagen esperada.');
      }
    }
  } catch (error) {
    console.error('Error en generateImage:', error);
    throw error;
  }
} 