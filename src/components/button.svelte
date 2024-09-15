<script>
	import { goto } from '$app/navigation';

	export let label;
	export let type = 'submit';
	export let buttonClass = 'btn';
	export let style = '';
	export let isPrimary = false;
	export let isDisabled = false;
	export let isLarge = false;
	export let href = '';
	export let fontSize = '0.75rem';
	export let height = 'auto';
</script>

<button
	class="{buttonClass} {isPrimary ? 'btn-primary' : ''} {isDisabled ? 'disabled' : ''} {isLarge
		? 'btn-large'
		: ''}"
	style="font-size: {fontSize}; height: {height}; {style}"
	disabled={isDisabled}
	on:click={isDisabled ? null : () => goto(href)}
>
	{label}
</button>

<style>
	.btn {
		color: white;
		font-weight: bold;
	}

	.disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.btn-large {
		padding: 0.5rem 6rem;
	}
</style>
