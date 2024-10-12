<script>
	import { projectData } from '$lib/stores/projectStore';

	console.log($projectData);
</script>

Hola soy la pagina de overview

{#if $projectData}
	<h1>{ $projectData.nombre }</h1>
{:else}
	<p>Loading project data...</p>
{/if}

<style>

</style>