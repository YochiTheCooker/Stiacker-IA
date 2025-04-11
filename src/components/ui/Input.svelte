<script>
  export let id = "";
  export let label = "";
  export let type = "text";
  export let value = "";
  export let placeholder = "";
  export let required = false;
</script>

<div class="space-y-1">
  {#if label}
    <label for={id} class="block text-sm font-medium text-gray-700">
      {label}
    </label>
  {/if}
  {#if type === 'password'}
    <input
      {id}
      type="password"
      {placeholder}
      {required}
      bind:value
      class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-apple-purple focus:border-transparent transition-all "
    />
  {:else}
    <input
      {id}
      type="text"
      {placeholder}
      {required}
      bind:value
      class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-apple-purple focus:border-transparent transition-all "
    />
  {/if}
</div> 