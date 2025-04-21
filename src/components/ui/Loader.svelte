<script> export let text = "";
</script>

<div class="flex flex-row items-center justify-center h-screen w-full gap-4">
    <span class="text-gray-700 text-base">{text}</span>
  <svg class="animate-spin h-5 w-5 text-apple-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
  </svg>
</div>
