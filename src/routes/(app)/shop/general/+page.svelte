<script>
	import { ImageIcon, Info } from 'lucide-svelte'; // Asegúrate de importar los íconos que necesites
	let themes = [
		'light',
		'dark',
		'cupcake',
		'bumblebee',
		'emerald',
		'corporate',
		'synthwave',
		'retro',
		'cyberpunk',
		'valentine',
		'halloween',
		'garden',
		'forest',
		'aqua',
		'lofi',
		'pastel',
		'fantasy',
		'wireframe',
		'black',
		'luxury',
		'dracula',
		'cmyk',
		'autumn',
		'business',
		'acid',
		'lemonade',
		'night',
		'coffee',
		'winter',
		'dim',
		'nord',
		'sunset'
	];

	function setTheme(theme) {
		document.querySelector('html').setAttribute('data-theme', theme);
	}
</script>

<div class="h-screen w-full overflow-y-auto p-4 bg-white">
	<div class="grid grid-cols-4 gap-[var(--luma-element-spacing)]">
		{#each themes as theme}
			<div class="bg-white rounded-lg custom-shadow overflow-hidden flex flex-col justify-between">
				<div class="flex justify-between items-center p-2 bg-white text-gray-700">
					<span>{theme}</span>
					<button class="text-gray-500 hover:text-gray-700">
						<Info class="w-5 h-5" />
					</button>
				</div>

				<div class="flex justify-center items-center h-24 bg-gray-300">
					<ImageIcon class="w-12 h-12 text-gray-400" />
				</div>

				<div class="p-2">
					<button
						class="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 rounded-md"
						on:click={() => setTheme(theme)}
					>
						Seleccionar
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
