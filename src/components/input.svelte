<script>
	export let type = 'text';
	export let value;
	export let placeholder;
	export let name;
	export let id;
	export let size = '30';
	export let required = false;
	export let invalid = false;
	export let label;
	export let classes;

	const handleInput = (event) => {
		value = event.target.value;
		dispatch('input', { value });
	};
</script>

<form>
	<label
		class="input input-bordered flex items-center gap-2 {invalid ? 'input-error' : ''} {classes}"
	>
		<span>{label}</span>
		<input {type} {value} {placeholder} {name} {id} {size} {required} on:input={handleInput} />
	</label>
</form>
