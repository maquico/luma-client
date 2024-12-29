<script>
	import { ImageIcon, Info } from 'lucide-svelte';
	import axios from 'axios';
	import { filters } from '$src/lib/stores/filterStore.js';

	let customThemes = [];
	let userData = JSON.parse(localStorage.getItem('sb-kyttbsnmnrayejpbxmpp-auth-token'));
	let userId = userData.user.id;

	let activeButton = {
		id: null,
		text: 'Utilizar',
		disabled: false
	};

	let filteredThemes = [];

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

	// Función para aplicar los filtros
	function applyFilters(filterValues) {
		const { availability, priceOrder } = filterValues;

		// Filtrar la lógica según tus requisitos, por ejemplo:
		if (availability === 'Disponibles para comprar') {
			filteredThemes = customThemes.filter((theme) => theme.available === true);
		} else if (availability === 'Compradas') {
			filteredThemes = customThemes.filter((theme) => theme.available === false);
		} else {
			filteredThemes = [...customThemes];
		}

		// Ordenar si se seleccionó
		if (priceOrder === 'Mayor a menor') {
			filteredThemes.sort((a, b) => b.price - a.price);
		} else if (priceOrder === 'Menor a mayor') {
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
				textHex: theme.textHex,
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

	// Llamar a ambas funciones cuando el componente se monte
	async function initializeData() {
		await fetchThemes();
		await fetchRewards();
	}

	initializeData();

	function setTheme(theme) {
		// Establecer el tema como activo
		document.querySelector('html').setAttribute('data-theme', theme.name);

		// Actualizar el estado del botón
		activeButton = {
			id: theme.id,
			text: 'Seleccionado',
			disabled: true
		};
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
			fetchRewards();
		} catch (error) {
			console.error('Error en el canje:', error);
		}
	}
</script>

<div class="h-screen w-full overflow-y-auto p-4 bg-white">
	<div class="grid grid-cols-4 gap-[var(--luma-element-spacing)]">
		{#each filteredThemes as theme}
			<div class="bg-white rounded-lg custom-shadow overflow-hidden flex flex-col justify-between">
				<div class="flex justify-between items-center p-2 bg-white text-gray-700">
					<span>{theme.name}</span>
					<button class="text-gray-500 hover:text-gray-700">
						<Info class="w-5 h-5" />
					</button>
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
						<span>Disponible</span>
						<span>Capacidad</span>
					</div>
					<div class="flex justify-between text-sm font-bold text-gray-900 mb-2">
						<span>{theme.totalAvailable}</span>
						<span>{theme.totalBought}/{theme.totalCapacity}</span>
					</div>
					{#if theme.totalBought === 1}
						<button
							class={`w-full text-purple-600 font-bold py-1 rounded-md 
						${activeButton.id === theme.id ? 'bg-purple-200 border-none' : 'bg-white border border-purple-600'}`}
							on:click={() => setTheme(theme)}
							disabled={activeButton.id === theme.id ? activeButton.disabled : false}
						>
							{activeButton.id === theme.id ? activeButton.text : 'Seleccionar'}
						</button>
					{:else}
						<button
							class="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 rounded-md"
							on:click={() => redeemTheme(theme.id)}
						>
							${theme.price}
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
