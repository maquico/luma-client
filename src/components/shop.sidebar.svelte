<script>
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { filters } from '../lib/stores/filterStore.js';
	import { selectedProjectStore } from '$src/lib/stores/selectedProjectStore.js';

	export let showProjectSelect; // Recibe la prop desde el componente padre

	let projectsOptions = [];
	let availableOptions = ['Todas', 'Disponibles para comprar', 'Compradas'];
	let priceOptions = ['Menor a mayor', 'Mayor a menor'];
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
			priceOrder: selectedPriceOrder
		});
		selectedProjectStore.set(selectedProject); // Actualiza el store
	};

	// Suscribirse al store para recibir cambios
	$: selectedProjectStore.subscribe((value) => {
		selectedProject = value;
	});
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
		<option value="" disabled>Selecciona Disponibilidad</option>
		{#each availableOptions as option}
			<option>{option}</option>
		{/each}
	</select>

	<select class="select select-bordered w-full max-w-xs" bind:value={selectedPriceOrder}>
		<option value="" disabled>Selecciona Ordenar</option>
		{#each priceOptions as option}
			<option>{option}</option>
		{/each}
	</select>

	<button class="btn btn-primary w-full max-w-xs" on:click={handleConfirm}>Confirmar</button>
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
