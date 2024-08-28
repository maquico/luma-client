<script>
	export let label;
	export let buttonClass = 'btn btn-primary';
</script>

<button type="submit" class={buttonClass}>{label}</button>

<style>
	.btn {
		color: white;
		font-weight: bold;
	}
</style>
