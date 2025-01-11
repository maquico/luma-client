<script>
	import { onMount } from 'svelte';
	import { Info } from 'lucide-svelte';
	import axios from 'axios';
	import { filters } from '$src/lib/stores/filterStore.js';
	import { selectedProjectStore } from '$src/lib/stores/selectedProjectStore.js';
	import { refreshReward, toggle } from '$src/lib/stores/refreshReward.js';
	import CreateRewardModal from '$components/modals/createReward.modal.svelte';
	import { showToast } from '$src/lib/stores/toastStore.js';
	import { t } from '$lib/translations';

	const AVAILABILITY_OPTIONS = {
    	ALL: 'all',
    	AVAILABLE: 'available',
    	BOUGHT: 'boughts',
	};

	const PRICE_ORDER_OPTIONS = {
	    LOW_HIGH: 'low_high',
	    HIGH_LOW: 'high_low',
	};

	let isProjectLeader = true;

	let userData = JSON.parse(localStorage.getItem('sb-kyttbsnmnrayejpbxmpp-auth-token'));
	let userId = userData.user.id;

	let rewards = [];
	let filteredRewards = [];
	let selectedProject = null;
	let showModal = false;
	let rewardIdModal;
	let modalTypeReward = 'reward';

	function handleClose() {
		showModal = false;
	}

	const handleUpdate = () => {
		loadRewards();
	};

	function applyFilters(filterValues) {
    	const { project, availability, priceOrder } = filterValues;
		console.log('Applying filters:', { availability });
		
    	filteredRewards = [...rewards]; // Reset the filtered rewards to all rewards first.

    	// Filter by availability
    	if (availability === AVAILABILITY_OPTIONS.AVAILABLE) {
			console.log()
    	    filteredRewards = filteredRewards.filter((reward) => reward.available === true);
    	} else if (availability === AVAILABILITY_OPTIONS.BOUGHT) {
    	    filteredRewards = filteredRewards.filter((reward) => reward.available === false);
    	}

    	// Filter by project
    	if (project) {
    	    filteredRewards = filteredRewards.filter((reward) => reward.Proyecto_ID === project); // Compare by 'Proyecto_ID'
    	}

    	// Sort by price
    	if (priceOrder === PRICE_ORDER_OPTIONS.HIGH_LOW) {
    	    filteredRewards.sort((a, b) => b.precio - a.precio);
    	} else if (priceOrder === PRICE_ORDER_OPTIONS.LOW_HIGH) {
    	    filteredRewards.sort((a, b) => a.precio - b.precio);
    	}
	}

	// Suscribirse al store para recibir cambios
	const unsubscribe = filters.subscribe((filterValues) => {
		applyFilters(filterValues);
	});

	// Función para traer recompensas (sincrónica)
	const loadRewards = () => {
		console.log('Cargando recompensas...', selectedProject);
		if (!selectedProject) {
			console.log('No hay proyecto seleccionado');
			return;
		}
		axios
			.get(`https://luma-server.onrender.com/api/rewards/project/${selectedProject}`)
			.then((response) => {
				rewards = response.data;
				filteredRewards = [...rewards];
				console.log('Recompensas:', response.data, 'ProjectId:', selectedProject);
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
			showToast($t('shop_customize.buy_success'), { type: 'success', duration: 5000 });
			loadRewards(); // Recarga recompensas después del canje
		} catch (error) {
			console.error('Error al canjear la recompensa:', error.response?.data || error.message);
			if (error.response.data.startsWith('User does not have enough coins')) {
				showToast($t('shop_customize.not_enough_gems'), {
					theme: 'light',
					type: 'error',
					duration: 5000
				});
			} else {
				showToast($t('shop_customize.buy_error'), { theme: 'light', type: 'error', duration: 5000 });
			}
		}
	};

	$: selectedProjectStore.subscribe((value) => {
		console.log('DETECTED CHANGE', value);
		selectedProject = value;
		if (selectedProject) {
			loadRewards(); // Cargar recompensas dinámicamente al cambiar el proyecto
		}
	});

	// subscribe to the refreshReward store
	$: refreshReward.subscribe((value) => {
		console.log('refreshReward:', value);
		if (value === true) {
			loadRewards();
			toggle();
		}
	});

	// Lógica en onMount
	onMount(() => {
		if (selectedProject) {
			//loadRewardsFunction.set(loadRewards); // Guardar función para cargar recompensas en el store
			loadRewards(); // Cargar recompensas solo si hay un proyecto seleccionado
		}
	});
</script>

<div class="h-screen w-full overflow-y-auto p-4 bg-white">
	<div class="grid grid-cols-4 gap-[var(--luma-element-spacing)]">
		{#each filteredRewards as reward}
			<div
				class="bg-white rounded-lg custom-shadow overflow-hidden flex flex-col justify-between"
				on:click={() => {
					if (isProjectLeader) {
						showModal = true;
						rewardIdModal = reward.Recompensa_ID;
						console.log('rewardIdModal:', rewardIdModal);
					}
				}}
			>
				<div class="flex justify-between items-center p-2 bg-white text-gray-700">
					<span>{reward.nombre}</span>
					<div class="flex items-center space-x-2">
						<button class="text-gray-500 hover:text-gray-700">
							<Info class="w-5 h-5" />
						</button>
					</div>
				</div>

				<div class="flex justify-center items-center h-24 bg-gray-100">
					<img
						src={reward.Iconos.foto}
						alt="{reward.nombre} icon"
						class="h-full max-w-full object-contain"
					/>
				</div>

				<div class="p-2">
					<div class="flex justify-between text-sm text-gray-500 mb-2">
						<span>{$t('shop_customize.available')}</span>
						<span>{$t('shop_customize.capacity')}</span>
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
						{$t('shop_customize.bought')}
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

<CreateRewardModal
	show={showModal}
	rewardId={rewardIdModal}
	modalType={modalTypeReward}
	isEdit={true}
	on:close={handleClose}
	on:update={handleUpdate}
/>

<style>
	.custom-shadow {
		box-shadow:
			0 2px 4px rgba(0, 0, 0, 0.05),
			0 -2px 4px rgba(0, 0, 0, 0.05),
			2px 0 4px rgba(0, 0, 0, 0.05),
			-2px 0 4px rgba(0, 0, 0, 0.05);
	}
</style>
