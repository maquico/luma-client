<script>
	import { ImageIcon, Info } from 'lucide-svelte';
	import axios from 'axios';
	import { filters } from '$src/lib/stores/filterStore.js';
	import { showToast } from '$src/lib/stores/toastStore.js';
	import { t } from '$lib/translations';
	import { userData } from '$lib/stores/userStore.js';
	import coinImage from '$assets/coin.png';
	import { onMount } from 'svelte';

	let customThemes = [];
	let userLocalData = JSON.parse(localStorage.getItem('sb-kyttbsnmnrayejpbxmpp-auth-token'));
	let userId = userLocalData.user.id;
	let loading = true;

	const AVAILABILITY_OPTIONS = {
		ALL: 'all',
		AVAILABLE: 'available',
		BOUGHT: 'boughts'
	};

	const PRICE_ORDER_OPTIONS = {
		LOW_HIGH: 'low_high',
		HIGH_LOW: 'high_low'
	};

	let activeButton = {
		id: 4,
		text: $t('shop_general.select'),
		disabled: false
	};

	let filteredThemes = [];

	onMount(async () => {
		await fetchThemes();
		await fetchRewards();
		// Cargar tema activo desde localStorage o usar predeterminado
		const savedThemeId = parseInt(localStorage.getItem('activeThemeId')) || 4;
		const savedTheme = customThemes.find((theme) => theme.id === savedThemeId);
		if (savedTheme) {
			setTheme(savedTheme, false);
		}
		loading = false;
	});

	function isValidHex(color) {
		return /^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(color);
	}

	function generateGradient(theme) {
		const { accent, primary, secondary } = theme;
		if (isValidHex(accent) && isValidHex(primary) && isValidHex(secondary)) {
			return `linear-gradient(135deg, ${accent}, ${primary} 40%, ${primary} 60%, ${secondary})`;
		}
		return null;
	}

	function applyFilters(filterValues) {
		const { availability, priceOrder } = filterValues;

		filteredThemes = [...customThemes]; // Reset the filtered themes to all themes first.
		// Filter by availability
		if (availability === AVAILABILITY_OPTIONS.AVAILABLE) {
			console.log();
			filteredThemes = filteredThemes.filter((reward) => reward.available === true);
		} else if (availability === AVAILABILITY_OPTIONS.BOUGHT) {
			filteredThemes = filteredThemes.filter((reward) => reward.available === false);
		}

		// Sort by price
		if (priceOrder === PRICE_ORDER_OPTIONS.HIGH_LOW) {
			filteredThemes.sort((a, b) => b.price - a.price);
		} else if (priceOrder === PRICE_ORDER_OPTIONS.LOW_HIGH) {
			filteredThemes.sort((a, b) => a.price - b.price);
		}
	}

	// Suscribirse al store para recibir cambios
	const unsubscribe = filters.subscribe((filterValues) => {
		applyFilters(filterValues);
	});

	// Función asíncrona para obtener los temas del endpoint
	async function fetchThemes() {
		try {
			const response = await axios.get(`https://luma-server.onrender.com/api/themes`);
			customThemes = response.data.map((theme) => ({
				name: theme.nombre,
				id: theme.Tema_ID,
				totalAvailable: theme.totalAvailable || 1,
				totalBought: theme.totalBought || 0,
				totalCapacity: theme.totalCapacity || 1,
				price: theme.precio,
				accent: theme.accentHex,
				primary: theme.primaryHex,
				secondary: theme.secondaryHex,
				background: theme.backgroundHex,
				textHex: theme.textHex
			}));
		} catch (error) {
			console.error('Error fetching themes:', error);
		}
	}

	// Función asíncrona para obtener las recompensas canjeadas
	async function fetchRewards() {
		try {
			const response = await axios.get(
				`https://luma-server.onrender.com/api/rewards-predefined/${userId}`
			);
			const redeemedThemes = response.data;
			console.log('Datos de recompensas canjeadas:', redeemedThemes);

			redeemedThemes.forEach((redeemedTheme) => {
				let theme = customThemes.find((t) => {
					return t.name === redeemedTheme.name;
				});

				if (theme) {
					theme.totalAvailable = redeemedTheme.totalAvailable;
					theme.totalBought = redeemedTheme.totalBought;
					theme.totalCapacity = redeemedTheme.totalCapacity;
					theme.available = redeemedTheme.available;
				} else {
					console.warn(`No se encontró un tema que coincida con ${redeemedTheme.name}`);
				}
			});

			filteredThemes = [...customThemes];
		} catch (error) {
			console.error('Error fetching redeemed themes:', error);
		}
	}

	function setTheme(theme, save = true) {
		// Establecer el tema como activo
		document.querySelector('html').setAttribute('data-theme', theme.name);

		// Actualizar el estado del botón
		activeButton = {
			id: theme.id,
			text: $t('shop_general.selected'),
			disabled: true
		};

		if (save) {
			localStorage.setItem('activeThemeId', theme.id);
			console.log('Tema activo guardado:', theme.id);
		}
	}

	function reduceUserCoins(coins) {
		userData.update((current) => {
			console.log('Reduciendo monedas:', current.monedas, coins);
			return {
				...current, // Keep the existing values
				monedas: current.monedas - coins // Update the specific attribute
			};
		});
	}

	async function redeemTheme(themeId) {
		try {
			console.log('Intentando canjear el tema:', themeId, userId);
			const response = await axios.post('https://luma-server.onrender.com/api/rewards-predefined', {
				rewardId: themeId,
				userId: userId,
				rewardType: 'theme'
			});
			console.log('Canje exitoso:', response.data);
			showToast($t('shop_general.buy_success'), { type: 'success', duration: 5000 });
			// Find theme by id to get price
			const theme = customThemes.find((t) => t.id === themeId);
			reduceUserCoins(theme.price);
			fetchRewards();
		} catch (error) {
			console.error('Error en el canje:', error);
			if (error.response.data.startsWith('User does not have enough coins')) {
				showToast($t('shop_general.not_enough_coins'), {
					theme: 'light',
					type: 'error',
					duration: 5000
				});
			} else {
				showToast($t('shop_general.buy_error'), { theme: 'light', type: 'error', duration: 5000 });
			}
		}
	}
</script>

{#if loading}
	<div class="overlay">
		<span class="loader"></span>
	</div>
{/if}

<div class="w-full p-4 bg-white main-content">
	<div class="grid grid-cols-4 gap-[var(--luma-element-spacing)]">
		{#each filteredThemes as theme}
			<div class="bg-white rounded-lg custom-shadow overflow-hidden flex flex-col justify-between">
				<div class="flex justify-between items-center p-2 bg-white text-gray-700">
					<span>{theme.name}</span>
					<button class="text-gray-500 hover:text-gray-700"> </button>
				</div>

				<div
					class="flex justify-center items-center h-24"
					style="background: {generateGradient(theme) || 'none'};"
				>
					{#if !generateGradient(theme)}
						<ImageIcon class="w-12 h-12 text-gray-400" />
					{/if}
				</div>

				<div class="p-2">
					<div class="flex justify-between text-sm text-gray-500 mb-2">
						<span>{$t('shop_general.available')}</span>
						<span>{$t('shop_general.capacity')}</span>
					</div>
					<div class="flex justify-between text-sm font-bold text-gray-900 mb-2">
						<span>{theme.totalAvailable}</span>
						<span>{theme.totalBought}/{theme.totalCapacity}</span>
					</div>
					{#if theme.totalBought === 1}
						<button
							class={`w-full text-primary font-bold py-1 rounded-md 
							${activeButton.id === theme.id ? 'bg-primary/20 border-none' : 'bg-white border border-primary hover:filter hover:bg-primary/5'}`}
							on:click={() => setTheme(theme)}
							disabled={activeButton.id === theme.id ? activeButton.disabled : false}
						>
							{activeButton.id === theme.id ? activeButton.text : $t('shop_general.select')}
						</button>
					{:else}
						<button
							class="w-full bg-primary text-white font-bold py-1 rounded-md flex items-center justify-center gap-2
						hover:filter hover:brightness-90"
							on:click={() => redeemTheme(theme.id)}
						>
							<img src={coinImage} alt="Luma-coin" class="w-4 h-4" />
							<span>{theme.price}</span>
						</button>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.main-content {
		height: 90vh;
	}

	.custom-shadow {
		box-shadow:
			0 2px 4px rgba(0, 0, 0, 0.05),
			0 -2px 4px rgba(0, 0, 0, 0.05),
			2px 0 4px rgba(0, 0, 0, 0.05),
			-2px 0 4px rgba(0, 0, 0, 0.05);
	}

	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		font-size: 1.5rem;
		z-index: 1000;
	}

	.loader {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		position: relative;
		animation: rotate 1s linear infinite;
	}
	.loader::before {
		content: '';
		box-sizing: border-box;
		position: absolute;
		inset: 0px;
		border-radius: 50%;
		border: 5px solid #fff;
		animation: prixClipFix 2s linear infinite;
	}

	@keyframes rotate {
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes prixClipFix {
		0% {
			clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
		}
		25% {
			clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
		}
		50% {
			clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
		}
		75% {
			clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%);
		}
		100% {
			clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0);
		}
	}
</style>
