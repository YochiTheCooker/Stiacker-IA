<script>
  export let type = "button";
  export let variant = "primary";
  export let fullWidth = true;
  export let isloading = false;

  const variants = {
    primary: "bg-white border border-gray-300 text-gray-800",
    success: "bg-gradient-to-r from-green-500 to-emerald-600 text-white",
  };
</script>

<button {type} on:click class="sm:w-auto font-medium py-3 px-6 rounded-xl transform transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed {variants[variant]} {fullWidth ? 'w-full' : ''} justify-center">
  {#if isloading}
    <span class="bg-gradient-to-r from-black to-orange-500 text-white">
      ⌛
    </span>
  {/if}
  <slot/>
</button>