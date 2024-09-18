<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let currentPath;

	onMount(() => {
		currentPath = window.location.pathname;
	});

	function handleTabClick(path) {
		goto(path);
		currentPath = path;
	}
</script>

<section role="tablist" class="tabs tabs-bordered flex items-center bg-gray-50">
	<div class="tabs-container flex space-x-4 ml-72">
		<a
			role="tab"
			class="tab {currentPath === '/shop/general' ? 'tab-active' : ''}"
			href="/shop/general"
			on:click|preventDefault={() => handleTabClick('/shop/general')}
		>
			RECOMPENSAS GENERALES
		</a>

		<a
			role="tab"
			class="tab {currentPath === '/shop/customize' ? 'tab-active' : ''}"
			href="/shop/customize"
			on:click|preventDefault={() => handleTabClick('/shop/customize')}
		>
			RECOMPENSAS PERSONALIZADAS
		</a>
	</div>
</section>

<style>
	.tab {
		padding: 1rem 0.5rem 2rem;
		font-size: 0.875rem;
		color: #333;
		border-bottom: 2px solid transparent;
		transition: color 0.3s;
	}

	.tab-active {
		color: var(--luma-color-secondary-orange);
		border-bottom-color: var(--luma-color-secondary-orange);
	}

	.tabs-bordered {
		border-bottom: 1px solid #ddd;
	}
</style>
