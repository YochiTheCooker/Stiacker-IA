<script>
	import StickerGenerator from './components/StickerGenerator.svelte';
	import { onMount } from 'svelte';
	import { selectedImageStore } from './stores/imageStore';
	import { get } from 'svelte/store';

	let selectedImage;
	onMount(() => {
		selectedImage = get(selectedImageStore);
	});
</script>

<main class="text-black w-full bg-white"><div>
		<StickerGenerator imageSrc={selectedImage}/>
	</div></main>