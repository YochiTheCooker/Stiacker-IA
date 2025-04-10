<script>
  // Importar las imágenes directamente
  import example1 from '../assets/examples/example1.png';
  import example2 from '../assets/examples/example2.png';


  const examples = [
    {
      image: example1,
      prompt: 'Gato astronauta!'
    },
    {
      image: example2,
      prompt: 'pato tejido!'
    }
  ];
</script>

<div
  class="{examples.length === 1
    ? 'flex items-center justify-center'
    : 'grid md:grid-cols-3 w-full flex-grow'
  } gap-3 md:gap-4"
  
>
  {#each examples as example}
    <div class="relative group cursor-pointer bg-white rounded-lg shadow-sm hover:shadow-md">
      <div class="rounded-lg overflow-hidden bg-gray-100">
        <img
          src={example.image}
          alt={example.prompt}
          class="w-full h-full object-cover max-h-full max-w-[25rem]"
        />
      </div>
      <div
        class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center p-2"
      >
        <p
          class="text-xs md:text-sm text-white text-center"
        >
          "{example.prompt}"
        </p>
      </div>
    </div>
  {/each}
</div> 