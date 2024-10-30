<script>
	import { data } from './data';
	import Board from '$components/board/Board.svelte';
	import CreateTaskModal from '$components/modals/createTask.modal.svelte';
	import { projectData } from '$lib/stores/projectStore';
	import axios from 'axios';
	import { onMount } from 'svelte';

	// console.log($projectData);

	onMount(async () => {
		try {
			const response = await axios.get(`https://luma-server.onrender.com/api/task/project/${projectId}`);
			projectTasks = response.data || [];
		}catch (error) {
			console.log(error);
		}

		// getBoardTasks(projectId)
		// await getTags(projectId)
	})

	let showModal = false;
	let tags = ['tag1', 'tag2', 'tag3', 'tag4'];
	let projectId = $projectData.Proyecto_ID
	let projectTasks

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
				console.log(response.data);
				tags = response.data
			})
			.catch((error) => {
				console.log(error);
			})
	}

	// async function getBoardTasks(projectId){
	// 	await axios.get(`https://luma-server.onrender.com/api/task/project/${projectId}`)
	// 		.then((response) => {
	// 			// console.log(response.data);
	// 			projectTasks = response.data
	// 			console.log(projectTasks);
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 		})
	// }

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
			<select class="select select-primary w-full max-w-xs">
				<option disabled selected>Filter by tag</option>
				<!--{#each tags as tag}-->
				<!--	<option value={tag}>{tag}</option>-->
				<!--{/each}-->
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

	{#if !projectTasks}
		<p>Loading tasks...</p>
	{:else}
		<!--	<Board columns={$data} onFinalUpdate={handleBoardUpdated} />-->
		<Board columns={projectTasks} onFinalUpdate={handleBoardUpdated}/>
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
