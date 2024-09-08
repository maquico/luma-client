<script>
	let themes = [
		"light",
		"dark",
		"cupcake",
		"bumblebee",
		"emerald",
		"corporate",
		"synthwave",
		"retro",
		"cyberpunk",
		"valentine",
		"halloween",
		"garden",
		"forest",
		"aqua",
		"lofi",
		"pastel",
		"fantasy",
		"wireframe",
		"black",
		"luxury",
		"dracula",
		"cmyk",
		"autumn",
		"business",
		"acid",
		"lemonade",
		"night",
		"coffee",
		"winter",
		"dim",
		"nord",
		"sunset",
	]

	function setTheme(theme){
		document.querySelector('html').setAttribute('data-theme', theme);
	}
</script>

<h1>Shop UI</h1>
<div class="themes">
	{#each themes as theme}
		<button class="btn btn-secondary" on:click={() => {setTheme(theme)}}>
			{theme}
		</button>
	{/each}
</div>

<div class="p-5">
	<a href="/" class="btn btn-primary"> Home </a>
</div>

<style>
	.themes{
			flex-wrap: wrap;
			margin: 2rem;
			display: flex;
			gap: 1rem;
	}
</style>