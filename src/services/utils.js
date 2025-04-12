/**
 * Utilidades generales para la aplicación
 */

/**
 * Comprueba si la aplicación está ejecutándose en un navegador web
 * @returns {boolean} true si se ejecuta en navegador web, false si es nativo
 */
export function isWeb() {
  // Comprobación más segura
  return typeof window !== 'undefined' && 
         typeof document !== 'undefined' &&
         !window.Capacitor && 
         window.location.protocol !== 'file:';
}

/**
 * Comprueba si la aplicación está en modo producción
 * @returns {boolean} true si está en producción
 */
export function isProduction() {
  return import.meta.env.PROD === true;
}

/**
 * Registra un evento de error de forma segura
 * @param {string} category - Categoría del error
 * @param {string} action - Acción que causó el error
 * @param {Error} error - Objeto de error
 */
export function logError(category, action, error) {
  // En producción, no mostrar detalles sensibles
  if (isProduction()) {
    console.error(`Error en ${category}/${action}`);
  } else {
    console.error(`Error en ${category}/${action}:`, error);
  }
  
  // Aquí se podría añadir código para enviar el error a un servicio
  // de monitoreo como Sentry, pero omitiendo información sensible
}