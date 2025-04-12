/**
 * Utilidades de seguridad para la aplicación
 */

/**
 * Sanitiza una entrada de texto para evitar inyecciones
 * @param {string} input - Texto a sanitizar
 * @returns {string} Texto sanitizado
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  // Eliminar caracteres potencialmente peligrosos
  return input.replace(/<|>|"|'|`|\//g, '');
}

/**
 * Valida que una URL de imagen sea segura
 * @param {string} url - URL a validar
 * @returns {boolean} True si la URL es válida y segura
 */
export function validateImageUrl(url) {
  if (typeof url !== 'string') return false;
  
  // Validar que sea una URL de imagen segura
  const validProtocols = ['data:image/', 'https://'];
  return validProtocols.some(protocol => url.startsWith(protocol));
}

/**
 * Valida un prompt de texto para generación de imágenes
 * @param {string} prompt - Prompt a validar
 * @returns {Object} { valid: boolean, message: string }
 */
export function validatePrompt(prompt) {
  if (!prompt || typeof prompt !== 'string') {
    return { valid: false, message: 'El prompt no puede estar vacío' };
  }

  if (prompt.trim().length < 3) {
    return { valid: false, message: 'El prompt debe tener al menos 3 caracteres' };
  }

  if (prompt.length > 500) {
    return { valid: false, message: 'El prompt no puede exceder los 500 caracteres' };
  }

  // Buscar patrones potencialmente maliciosos
  const maliciousPatterns = [
    /script/i,
    /javascript:/i,
    /data:/i,
    /vbscript:/i,
    /on\w+=/i, // onClick, onLoad, etc.
  ];

  for (const pattern of maliciousPatterns) {
    if (pattern.test(prompt)) {
      return { 
        valid: false, 
        message: 'El prompt contiene patrones no permitidos' 
      };
    }
  }

  return { valid: true, message: '' };
} 