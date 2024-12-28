<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';
	import { selectedProjectStore } from '$src/lib/stores/selectedProjectStore.js';
	import CreateRewardModal from '$components/modals/createReward.modal.svelte';

	const dispatch = createEventDispatcher(); // Crear un despachador de eventos
	let currentPath;

	let isProjectLeader = true;
	let selectedProject = null;

	onMount(() => {
		currentPath = window.location.pathname;
	});

	let showModal = false;

	function handleClose() {
		showModal = false;
	}

	function handleTabClick(path) {
		goto(path);
		currentPath = path;
		dispatch('tabChange', path); // Emitir el evento tabChange con la ruta
	}
</script>

<section role="tablist" class="tabs tabs-bordered flex items-center bg-gray-50">
	<div class="tabs-container ml-72">
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

	{#if currentPath === '/shop/customize' && isProjectLeader}
		<div class="controls ml-auto mr-5">
			<button
				class="create-reward-btn"
				on:click={() => {
					showModal = true;
				}}
			>
				+
			</button>
		</div>
	{/if}
</section>

<CreateRewardModal
	show={showModal}
	on:close={handleClose} />

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

	.create-reward-btn {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background-color: #692dd7;
		color: white;
		font-size: 1.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		cursor: pointer;
		transition:
			background-color 0.3s,
			box-shadow 0.3s;
		box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
	}

	.create-reward-btn:hover {
		background-color: #571bb2;
		box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.3);
	}
</style>
