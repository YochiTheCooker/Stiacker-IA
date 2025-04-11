import { Capacitor } from '@capacitor/core';

async function isWeb() {
  if (Capacitor.getPlatform) {
    return Capacitor.getPlatform() === 'web';
  }
  return true
}


export { isWeb };