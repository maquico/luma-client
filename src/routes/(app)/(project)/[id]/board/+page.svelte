<script>
	import { data } from './data';
	import Board from '$components/board/Board.svelte';
	import CreateTaskModal from '$components/modals/createTask.modal.svelte';
	import { projectData } from '$lib/stores/projectStore';
	import axios from 'axios';
	import { onMount } from 'svelte';

	// console.log($projectData);

	onMount(async () => {
		await getBoardTasks(projectId)
		await getTags(projectId)
	})

	let showModal = false;
	let tags = ['Loading...'];
	let projectId = $projectData.Proyecto_ID
	let projectTasks = []
	let filteredProjectTasks = []
	let selectedOption = ''

	function handleClose() {
		showModal = false;
	}

	function handleBoardUpdated(newColumnsData) {
		// if you wanted to update a database or a server, this is where you would do it
		$data = newColumnsData;
	}

	async function getTags(projectId){
		await axios.get(`https://luma-server.onrender.com/api/task/tags/${projectId}`)
			.then((response) => {
				// console.log('tags',response.data);
				tags = response.data
			})
			.catch((error) => {
				console.log(error);
			})
	}

	async function getBoardTasks(projectId){
		await axios.get(`https://luma-server.onrender.com/api/task/project-client/${projectId}`)
			.then((response) => {
				projectTasks = response.data || [];
				filteredProjectTasks = projectTasks;
				// console.log(projectTasks);
			})
			.catch((error) => {
				console.log(error);
			})
	}

	async function filterByTag(tag){
		return projectTasks.map(category => {
			const filteredItems = category.items.filter(task => task.tags.includes(tag));

			return {
				...category,
				items: filteredItems
			};
		})
	}

	async function handleSelectChange(event) {
		selectedOption = event.target.value;
		// console.log(`Selected option: ${selectedOption}`);

		if(tags.includes(event.target.value)){ //Escenario para filtrar por tag
			// console.log('El array tags tiene el valor de',event.target.value);
			filteredProjectTasks = await filterByTag(selectedOption);
			// console.log(filteredProjectTasks);

		}else{ //Escenario no existente / default
			// console.log('Escenario vacio');
			filteredProjectTasks = projectTasks;
			// console.log(filteredProjectTasks);
		}

	}
</script>

<div id="projectBoard">
	<div class="top">
		<p>
			{#if $projectData}
				<h1>{$projectData.nombre}</h1>
			{:else}
				<p>Loading project data...</p>
			{/if}
		</p>
		<div class="controls">
			<select class="select select-primary w-full max-w-xs" on:change={handleSelectChange}>
				<option selected>None</option>
				{#each tags as tag}
					<option value={tag}>{tag}</option>
				{/each}
			</select>

			<button
				class="btn btn-primary"
				on:click={() => {
					showModal = true;
				}}
			>
				Crear tarea</button
			>
		</div>
	</div>

	{#if !filteredProjectTasks}
		<p>Loading tasks...</p>
	{:else}
<!--		<Board columns={projectTasks} onFinalUpdate={handleBoardUpdated}/>-->
		<Board columns={filteredProjectTasks} onFinalUpdate={handleBoardUpdated}/>
	{/if}
</div>

<CreateTaskModal show={showModal} on:close={handleClose} />

<style>
	.top {
		display: flex;
		justify-content: space-between;
	}

	.top .controls {
		display: flex;
		gap: var(--luma-half-element-spacing);
	}

	.top p:first-child {
		font-size: var(--luma-h5-font-size);
	}
</style>
