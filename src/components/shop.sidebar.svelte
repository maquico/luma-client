<script>
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { filters } from '../lib/stores/filterStore.js';
	import { selectedProjectStore } from '$src/lib/stores/selectedProjectStore.js';
	import { t } from '$lib/translations';

	export let showProjectSelect; // Recibe la prop desde el componente padre

	const AVAILABILITY_OPTIONS = {
    	ALL: 'all',
    	AVAILABLE: 'available',
    	BOUGHT: 'boughts',
	};

	const PRICE_ORDER_OPTIONS = {
	    LOW_HIGH: 'low_high',
	    HIGH_LOW: 'high_low',
	};

	let projectsOptions = [];
	
	let availableOptions = [
    	{ key: AVAILABILITY_OPTIONS.ALL, label: $t('shop_sidebar.all') },
    	{ key: AVAILABILITY_OPTIONS.AVAILABLE, label: $t('shop_sidebar.available') },
    	{ key: AVAILABILITY_OPTIONS.BOUGHT, label: $t('shop_sidebar.boughts') },
	];

	let priceOptions = [
	    { key: PRICE_ORDER_OPTIONS.LOW_HIGH, label: $t('shop_sidebar.low_high') },
	    { key: PRICE_ORDER_OPTIONS.HIGH_LOW, label: $t('shop_sidebar.high_low') },
	];

	let selectedProject = '';
	let selectedAvailability = '';
	let selectedPriceOrder = '';

    const userData = JSON.parse(localStorage.getItem('sb-kyttbsnmnrayejpbxmpp-auth-token'));
    const userId = userData.user.id;

	// Función para obtener los proyectos
	const fetchProjects = async () => {
		try {
			const response = await axios.get(
				`https://luma-server.onrender.com/api/projects/user/${userId}`
			);
			projectsOptions = response.data.map((project) => ({
				value: project.Proyecto_ID,
				label: project.nombre
			}));
			if (projectsOptions.length > 0) {
				selectedProject = projectsOptions[0].value;
				selectedProjectStore.set(selectedProject); // Actualiza el store
			}
		} catch (error) {
			console.error('Error fetching projects:', error);
		}
	};

	// Llamada para obtener proyectos al cargar el componente
	onMount(() => {
		fetchProjects();
	});

	const handleConfirm = () => {
    	filters.set({
    	    project: selectedProject,
    	    availability: selectedAvailability,
    	    priceOrder: selectedPriceOrder,
    	});
    	selectedProjectStore.set(selectedProject);
	};


	// Suscribirse al store para recibir cambios
	//$: selectedProjectStore.subscribe((value) => {
	//	selectedProject = value;
	//});
</script>

<nav>
	{#if showProjectSelect}
		<select
			class="select select-bordered w-full max-w-xs"
			bind:value={selectedProject}
			on:change={() => selectedProjectStore.set(selectedProject)}
		>
			{#each projectsOptions as option}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
	{/if}

	<select class="select select-bordered w-full max-w-xs" bind:value={selectedAvailability}>
		<option value="" disabled>{$t('shop_sidebar.availability')}</option>
		{#each availableOptions as option}
			<option value={option.key}>{option.label}</option>
		{/each}
	</select>
	
	<select class="select select-bordered w-full max-w-xs" bind:value={selectedPriceOrder}>
		<option value="" disabled>{$t('shop_sidebar.price_sorting')}</option>
		{#each priceOptions as option}
			<option value={option.key}>{option.label}</option>
		{/each}
	</select>
	

	<button class="btn btn-primary w-full max-w-xs" on:click={handleConfirm}>{$t('shop_sidebar.confirm')}</button>
</nav>

<style>
	nav {
		background-color: white;
		height: 100vh; /* Altura completa de la barra lateral */
		width: 280px; /* Ancho de la barra lateral */
		padding: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem; /* Espacio entre los elementos */
		border-right: 2px solid #ddd; /* Línea divisoria a la derecha */
	}
</style>
