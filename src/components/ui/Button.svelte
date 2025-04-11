<script>
  export let type = "button";
  export let variant = "primary";
  export let disabled = false;
  export let fullWidth = true;
  export let loading = false;

  const variants = {
    primary: "bg-apple-purple hover:bg-opacity-90 text-white",
    success: "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
  };
</script>

<button
  {type}
  {disabled}
  on:click
  class="w-full sm:w-auto font-medium py-3 px-6 rounded-xl transition-all transform hover:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed {variants[variant]} {fullWidth ? 'w-full' : ''} justify-center"
>
  {#if loading}
    <span class="inline-block animate-spin mr-2">⌛</span>
  {/if}
  <slot />
</button> 