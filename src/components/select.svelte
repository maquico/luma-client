<script>
	export let options = [];
	export let defaultOption = 'Select an option';
	export let fontSize = '0.75rem';
	let selectedItem = '';
</script>

<select
	bind:value={selectedItem}
	style="font-size: {fontSize};"
	class="w-full max-w-xs bg-white border border-gray-300 rounded py-2 px-3 text-gray-700"
>
	<option value="" disabled selected>{defaultOption}</option>
	{#each options as option}
		<option value={option}>{option}</option>
	{/each}
</select>
