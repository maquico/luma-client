<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';
	import { Gem } from 'lucide-svelte';
	import gemImage from '$assets/gem.png';
	import { selectedProjectStore } from '$src/lib/stores/selectedProjectStore.js';
	import CreateRewardModal from '$components/modals/createReward.modal.svelte';
	import { API_BASE_URL } from '$lib/stores/apiStore.js';
	import axios from 'axios';

	const dispatch = createEventDispatcher(); // Crear un despachador de eventos
	let currentPath;

	let selectedProjectUserRole;
	let userGems = 'loading';
	let selectedProject = null;

	$: selectedProjectStore.subscribe((value) => {
		console.log('DETECTED CHANGE', value);
		selectedProject = value;

		const localUserData = JSON.parse(localStorage.getItem('sb-kyttbsnmnrayejpbxmpp-auth-token'));
		const userID = localUserData.user.id;
		axios
			.get(`${API_BASE_URL}/projects/user/${userID}`)
			.catch((error) => {
				console.error('Error:', error);
			})
			.then((response) => {
				console.log('Success:', response.data);
				console.log('Project:', selectedProject);

				// Validate each project and check if it matches the selected project
				const selectedProjectData = response.data.find(
					(element) => element.Proyecto_ID === selectedProject
				);

				// If the project is found, assign the gems
				if (selectedProjectData) {
					userGems = selectedProjectData.currentUserGems;
					selectedProjectUserRole = selectedProjectData.queryingUserRole;
					console.log('User Role:', selectedProjectUserRole);
					console.log('User Gems:', userGems);
				} else {
					console.log('Project not found');
				}
			});
	});

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

	<div class="navbar-right">
		{#if currentPath === '/shop/customize'}
			<div class="controls currency-container">
				<div class="gem currency">
					<span>{userGems}</span>
					<div class="icon-container">
						<img src={gemImage} />
					</div>
				</div>
			</div>
		{/if}

		{#if currentPath === '/shop/customize' && selectedProjectUserRole === 'Lider'}
			<div class="controls">
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
	</div>
</section>

<CreateRewardModal show={showModal} on:close={handleClose} />

<style>
	.tabs-container {
		display: flex;
		gap: 1rem;
		flex-grow: 1; /* Asegura que este contenedor ocupe el máximo espacio posible */
		justify-content: flex-start; /* Alinea las pestañas a la izquierda */
	}

	.navbar-right {
		display: flex;
		justify-content: flex-end;
		align-items: center;
    margin-right: 1.5rem;
		/*position: absolute;*/
		/*right: 10px;*/
		/*top: 70px;*/
	}

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

	.gem .icon-container,
	.icon-container {
		background-color: var(--luma-color-gray-50);
		right: -15px;
	}

	.currency {
		font-size: 14px;
		position: relative;
		padding: 2px 14px 2px 10px;
		border: 1px solid var(--luma-color-gray-400);
		border-radius: 0.8rem;
	}

	.currency-container {
		display: flex;
		gap: 25px;
		margin-right: 15px;
	}

	.icon-container {
		position: absolute;
		top: 0px;
	}

	.controls {
		display: flex; /* Hacemos los controles un flexbox */
		align-items: center; /* Alineamos los elementos dentro del control al centro */
	}

	.currency-container {
		margin-right: 20px; /* Espacio entre el gem y el botón */
	}

	.create-reward-btn {
		margin-left: 10px; /* Espacio entre el gem y el botón */
	}
</style>
