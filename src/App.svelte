<script>
	import LazyStickerGenerator from './components/LazyStickerGenerator.svelte';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { selectedImageStore } from './stores/imageStore';
	import { get } from 'svelte/store';


	let selectedImage;
	onMount(() => {
		selectedImage = get(selectedImageStore);
	});
</script>

<main class="text-black w-full bg-white flex flex-col h-screen">
	<!-- Added flex flex-col h-screen -->
	<div class="text-black w-full bg-white flex-grow overflow-y-auto">
		<!-- Added flex-grow overflow-y-auto -->
		<LazyStickerGenerator imageSrc={selectedImage} />
	</div>
</main>