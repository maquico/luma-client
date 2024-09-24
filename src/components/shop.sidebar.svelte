<script>
	import Select from '$components/select.svelte';
	import Button from '$components/button.svelte';
	const options = ['Item 1', 'Item 2', 'Item 3'];
</script>

<nav>
	<Select {options} defaultOption="Disponibilidad" />
	<Select {options} defaultOption="Ordenar" />
	<Button label="Confirmar" isPrimary="true" isLarge="true" height="0.em" />
</nav>

<style>
	nav {
		background-color: white;
		height: 100vh; /* Cambiado a 100vh */
		width: 280px;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		border-right: 2px solid #ddd;
	}
</style>
