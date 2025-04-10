<script>
  // Importar las imágenes directamente
  import example1 from '../assets/examples/example1.jpg';
  import example2 from '../assets/examples/example2.jpg';
  import example3 from '../assets/examples/example3.jpg';
  import example4 from '../assets/examples/example4.jpg';

  const examples = [
    {
      image: example1,
      prompt: 'Un llama astronauta flotando en el espacio'
    },
    {
      image: example2,
      prompt: 'Un llama superhéroe volando sobre la ciudad'
    },
    {
      image: example3,
      prompt: 'Un llama chef cocinando en una cocina profesional'
    },
    {
      image: example4,
      prompt: 'Un llama pintor creando una obra maestra'
    }
  ];
</script>

<div class="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
  {#each examples as example}
    <div class="relative group cursor-pointer bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div class="aspect-square rounded-lg overflow-hidden bg-gray-100">
        <img
          src={example.image}
          alt={example.prompt}
          class="w-full h-full object-cover"
        />
      </div>
      <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center p-2">
        <p class="text-xs md:text-sm text-white text-center">
          "{example.prompt}"
        </p>
      </div>
    </div>
  {/each}
</div> 