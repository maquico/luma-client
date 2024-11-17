<script>
	import { onMount } from 'svelte';
	import { ImageIcon, Info } from 'lucide-svelte';
	import axios from 'axios';
	import { filters } from '$src/lib/stores/filterStore.js';
	import { loadRewardsFunction } from '$src/lib/stores/rewardStore.js';

	export let userId = '37d3b652-d314-4124-9685-add5f0c6fc19';

	let rewards = [];
	let filteredRewards = [];
	let selectedProject = '';

	// Función para aplicar los filtros
	function applyFilters(filterValues) {
		const { project, availability, priceOrder } = filterValues;

		// Filtramos según disponibilidad
		if (availability === 'Disponibles para comprar') {
			filteredRewards = rewards.filter((reward) => reward.available === true);
		} else if (availability === 'Compradas') {
			filteredRewards = rewards.filter((reward) => reward.available === false);
		} else {
			filteredRewards = [...rewards];
		}

		// Ordenar si se seleccionó
		if (priceOrder === 'Mayor a menor') {
			filteredRewards.sort((a, b) => b.price - a.price);
		} else if (priceOrder === 'Menor a mayor') {
			filteredRewards.sort((a, b) => a.price - b.price);
		}

		// Filtra por proyecto si está seleccionado
		if (project) {
			filteredRewards = filteredRewards.filter((reward) => reward.id === project);
		}
	}

	// Suscribirse al store para recibir cambios
	const unsubscribe = filters.subscribe((filterValues) => {
		applyFilters(filterValues);
	});

	// Función para traer el primer proyecto
	const fetchFirstProject = async () => {
		try {
			const response = await axios.get(
				`https://luma-server.onrender.com/api/projects/user/${userId}`
			);
			if (response.data.length > 0) {
				selectedProject = {
					value: response.data[0].Proyecto_ID,
					label: response.data[0].nombre
				};
			}
			console.log('Primer proyecto:', selectedProject);
		} catch (error) {
			console.error('Error fetching the first project:', error);
		}
	};

	// Función para traer recompensas (sincrónica)
	const loadRewards = () => {
		console.log('Cargando recompensas...', selectedProject);
		if (!selectedProject) return; // Nos aseguramos de que selectedProject esté definido
		axios
			.get(`https://luma-server.onrender.com/api/rewards/project/${selectedProject.value}`)
			.then((response) => {
				rewards = response.data;
				filteredRewards = [...rewards];
				console.log('Recompensas:', response.data, 'ProjectId:', selectedProject.value);
			})
			.catch((error) => {
				console.error('Error al cargar las recompensas:', error);
			});
	};

	// Función para canjear una recompensa
	const redeemReward = async (rewardId) => {
		try {
			console.log('Canjeando recompensa:', rewardId, userId);
			const response = await axios.post('https://luma-server.onrender.com/api/rewards/buy', {
				userId: userId,
				rewardId: rewardId
			});
			console.log('Recompensa canjeada:', response.data);
			loadRewards(); // Recarga recompensas después del canje
		} catch (error) {
			console.error('Error al canjear la recompensa:', error.response?.data || error.message);
		}
	};

	// Lógica en onMount
	onMount(async () => {
		loadRewardsFunction.set(loadRewards); // Guardar función para cargar recompensas en el store
		await fetchFirstProject(); // Traer primero el proyecto de forma asincrónica
		loadRewards(); // Cargar recompensas después, de manera no bloqueante
	});
</script>

<div class="h-screen w-full overflow-y-auto p-4 bg-white">
	<div class="grid grid-cols-4 gap-[var(--luma-element-spacing)]">
		{#each filteredRewards as reward}
			<div class="bg-white rounded-lg custom-shadow overflow-hidden flex flex-col justify-between">
				<div class="flex justify-between items-center p-2 bg-white text-gray-700">
					<span>{reward.nombre}</span>
					<button class="text-gray-500 hover:text-gray-700">
						<Info class="w-5 h-5" />
					</button>
				</div>

				<div class="flex justify-center items-center h-24 bg0-gray-300">
					<ImageIcon class="w-12 h-12 text-gray-400" />
				</div>

				<div class="p-2">
					<div class="flex justify-between text-sm text-gray-500 mb-2">
						<span>Disponible</span>
						<span>Capacidad</span>
					</div>
					<div class="flex justify-between text-sm font-bold text-gray-900 mb-2">
						<span>{reward.cantidad}</span>
						<span>{reward.totalCompras}/{reward.limite}</span>
					</div>
					{#if reward.totalCompras === reward.limite}
						<button
							class="w-full bg-purple-200 text-purple-600 font-bold py-1 rounded-md cursor-not-allowed"
							disabled
						>
							Comprado
						</button>
					{:else}
						<button
							class="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 rounded-md"
							on:click={() => redeemReward(reward.Recompensa_ID)}
						>
							${reward.precio}
						</button>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.custom-shadow {
		box-shadow:
			0 2px 4px rgba(0, 0, 0, 0.05),
			0 -2px 4px rgba(0, 0, 0, 0.05),
			2px 0 4px rgba(0, 0, 0, 0.05),
			-2px 0 4px rgba(0, 0, 0, 0.05);
	}
</style>
