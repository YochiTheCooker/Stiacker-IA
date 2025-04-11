import { Share } from '@capacitor/share';
import { Filesystem, Directory } from '@capacitor/filesystem';

class StickerManager {
    async saveAsWhatsappSticker(imageUrl, filename) {
        try {
            const directoryPath = "WhatsApp/Media/WhatsApp Stickers/";

             try {
                await Filesystem.mkdir({
                    path: directoryPath,
                    directory: Directory.ExternalStorage,
                    recursive: true,
                });
            } catch (e){
                console.error("Error creating directory:", e);
                throw e;
            }
            const resizedImageBlob = await this.resizeImage(imageUrl);

            const base64Data = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result.split(',')[1]);
                reader.readAsDataURL(resizedImageBlob);
            });

            const filePath = `${directoryPath}${filename}.webp`;

            await Filesystem.writeFile({
                path: filePath,
                data: base64Data,
                directory: Directory.ExternalStorage,
            });

            return filePath;
        } catch (err) {
            console.error("Error saving sticker to WhatsApp directory:", err);
            throw err;
        }
    }
    async createAndShareWhatsappSticker(imageUrl, filename) {
        try {
            const stickerPath = await this.saveAsWhatsappSticker(imageUrl, filename);
            console.log("Sticker saved to:", stickerPath);
            await this.shareToWhatsapp(stickerPath);
        } catch (err) {
            console.error("Error creating and sharing sticker:", err);
            throw err;
        }
    }

    async resizeImage(imageUrl) {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const resizedBlob = await new Promise(resolve => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = 512;
                canvas.height = 512;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, 512, 512);
                canvas.toBlob(resolve, 'image/webp', 0.9);
            };
            img.src = URL.createObjectURL(blob);
        });
        return resizedBlob;
    }
    async saveImage(resizedImage, filename) {
        // Save to disk, return the saved path
        console.log("saving image", resizedImage, filename);
        // Add the implementation of the saveImage using the capacitor filesystem plugin here
        // ...
        // Example with the filesystem plugin:
        // ...
        return resizedImage; 
    }
    async shareToWhatsapp(imageUrl) {
        console.log("sharing image", imageUrl);
        try{
            await Share.share({
                title: 'Check out this sticker!',
                url: imageUrl,
                dialogTitle: 'Share with WhatsApp',
            });
        } catch (err){
            console.error(err);
            throw err;
        }

    }


}

const stickerManager = new StickerManager();
export { stickerManager as default, stickerManager as StickerManager, stickerManager, stickerManager as createAndShareWhatsappSticker };