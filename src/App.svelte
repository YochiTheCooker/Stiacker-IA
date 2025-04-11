<script>
	import LazyStickerGenerator from './components/LazyStickerGenerator.svelte';
	import LazyExampleGallery from './components/LazyExampleGallery.svelte';
	import { onMount } from 'svelte';
	import { selectedImageStore } from './stores/imageStore';
	import { get } from 'svelte/store';

	const examples = [
		{
			image: '/examples/example1.png',
			prompt: 'Gato astronauta!'
		},
		{
			image: '/examples/example2.png',
			prompt: 'pato tejido!'
		}
	];

	let selectedImage;
	onMount(() => {
		selectedImage = get(selectedImageStore);
	});
</script>

<main class="text-black w-full bg-white">
	<div>
		<LazyStickerGenerator imageSrc={selectedImage} />
		<LazyExampleGallery {examples} />
	</div>
</main>