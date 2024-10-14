<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher(); // Crear un despachador de eventos
	let currentPath;

	onMount(() => {
		currentPath = window.location.pathname;
	});

	function handleTabClick(path) {
		goto(path);
		currentPath = path;
		dispatch('tabChange', path); // Emitir el evento tabChange con la ruta
	}
</script>

<section role="tablist" class="tabs tabs-bordered flex items-center bg-gray-50">
	<div class="label-container ml-20">
		<span class="label">RECOMPENSAS</span>
	</div>
	<div class="tabs-container ml-32">
		<a
			role="tab"
			class="tab {currentPath === '/shop/general' ? 'tab-active' : ''}"
			href="/shop/general"
			on:click|preventDefault={() => handleTabClick('/shop/general')}
		>
			GENERALES
		</a>

		<a
			role="tab"
			class="tab {currentPath === '/shop/customize' ? 'tab-active' : ''}"
			href="/shop/customize"
			on:click|preventDefault={() => handleTabClick('/shop/customize')}
		>
			PERSONALIZADAS
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
