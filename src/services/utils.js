import { App } from '@capacitor/app';

async function isWeb() {
  if(App.getInfo){
    try {
      const info = await App.getInfo();
      return info.platform === 'web';
    } catch (error) {
      console.error('Error getting app info:', error);
      return false;
    }
  }
  return false
}


export { isWeb };