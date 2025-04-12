<script>
  import { onMount } from 'svelte';
  import Cropper from 'cropperjs';
  import 'cropperjs/dist/cropper.css';
  import { fabric } from 'fabric';

  export let imageSrc;
  let cropper;
  let canvas;

  onMount(() => {
    const imageElement = document.getElementById('image');
    cropper = new Cropper(imageElement, {
      aspectRatio: 1,
      viewMode: 1,
      ready() {
        // Inicializar el canvas de Fabric.js
        canvas = new fabric.Canvas('canvas', {
          width: 512,
          height: 512,
        });
      },
    });
  });

  function addText() {
    const text = new fabric.Textbox('Texto aquí', {
      left: 50,
      top: 50,
      fontSize: 20,
    });
    canvas.add(text);
  }

  function saveImage() {
    const croppedCanvas = cropper.getCroppedCanvas();
    const croppedImage = croppedCanvas.toDataURL('image/png');

    // Aquí puedes guardar la imagen o hacer lo que necesites
    console.log(croppedImage);
  }
</script>

<div>
  <img src={imageSrc} alt="Imagen para editar" />
  <button on:click={addText}>Agregar Texto</button>
  <button on:click={saveImage}>Guardar Sticker</button>
  <canvas id="canvas"></canvas>
</div>

<style>
  /* Estilos para el editor */
  #canvas {
    border: 1px solid #ccc;
    margin-top: 10px;
  }
</style>
