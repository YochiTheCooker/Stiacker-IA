# LlamaSticker

Una aplicación móvil para generar stickers de WhatsApp usando inteligencia artificial.

## Requisitos

- Node.js 16 o superior
- Android Studio (para desarrollo en Android)
- Xcode (para desarrollo en iOS)
- Una API Key de Hugging Face

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tuusuario/llamasticker.git
cd llamasticker
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las plataformas nativas:
```bash
npx cap add android
npx cap add ios
```

## Desarrollo

Para ejecutar en modo desarrollo:
```bash
npm run dev
```

Para construir la aplicación:
```bash
npm run build
```

Para abrir en Android Studio:
```bash
npm run android
```

Para abrir en Xcode:
```bash
npm run ios
```

## Uso

1. Obtén una API Key de Hugging Face en https://huggingface.co/
2. Abre la aplicación
3. Ingresa tu API Key
4. Describe el sticker que quieres generar
5. Presiona "Generar Sticker"
6. Una vez generada la imagen, presiona "Guardar como Sticker"
7. Comparte el sticker en WhatsApp

## Tecnologías

- Svelte
- Capacitor
- Hugging Face API (Stable Diffusion) 