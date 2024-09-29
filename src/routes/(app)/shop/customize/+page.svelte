<script>
	import { onMount } from 'svelte';
	import { ImageIcon, Info } from 'lucide-svelte';
	import axios from 'axios';

	export let userId = '37d3b652-d314-4124-9685-add5f0c6fc19';

	let rewards = [];

	async function loadRewards() {
		try {
			const response = await axios.get(
				`https://luma-server.onrender.com/api/rewards/user/${userId}`
			);
			rewards = response.data;
			console.log('Recompensas:', response.data);
		} catch (error) {
			console.error('Error al cargar las recompensas:', error);
		}
	}

	onMount(() => {
		loadRewards();
	});
</script>

<div class="h-screen w-full overflow-y-auto p-4 bg-white">
	<div class="grid grid-cols-4 gap-[var(--luma-element-spacing)]">
		{#each rewards as reward}
			<div class="bg-white rounded-lg custom-shadow overflow-hidden flex flex-col justify-between">
				<div class="flex justify-between items-center p-2 bg-white text-gray-700">
					<span>{reward.name}</span>
					<button class="text-gray-500 hover:text-gray-700">
						<Info class="w-5 h-5" />
					</button>
				</div>

				<div class="flex justify-center items-center h-24 bg-gray-300">
					<ImageIcon class="w-12 h-12 text-gray-400" />
				</div>

				<div class="p-2">
					<div class="flex justify-between text-sm text-gray-500 mb-2">
						<span>Disponible</span>
						<span>Capacidad</span>
					</div>
					<div class="flex justify-between text-sm font-bold text-gray-900 mb-2">
						<span>{reward.totalAvailable}</span>
						<span>{reward.totalBought}/{reward.totalCapacity}</span>
					</div>
					<button
						class="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 rounded-md"
					>
						{reward.price}
					</button>
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
