<script>
	import Board from '$components/board/Board.svelte';
	import CreateTaskModal from '$components/modals/createTask.modal.svelte';
	import { projectData } from '$lib/stores/projectStore';
	import axios from 'axios';
	import { onMount } from 'svelte';

	// console.log($projectData);

	onMount(async () => {
		loading = true
		try {
			await Promise.all([
				getBoardTasks(projectId),
				getTags(projectId)
			]);
		} catch (error) {
			console.error("Error fulfilling promises:", error);
		} finally {
			loading = false; // Hide overlay
		}

	})

	let showModal = false;
	let tags = [];
	let projectId = $projectData.Proyecto_ID
	let projectTasks = []
	let filteredProjectTasks = []
	let selectedOption = ''
	let loading = true

	function handleClose() {
		showModal = false;
	}

	// function handleBoardUpdated(newColumnsData) {
	// 	// if you wanted to update a database or a server, this is where you would do it
	// 	// $data = newColumnsData;
	// }

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

	async function handleUpdate(event) {
    	console.log('Update event received on Board Page:', event);
    	try {
    	    await getBoardTasks(projectId); 
    	} catch (error) {
    	    console.error("Error updating board tasks:", error);
    	}
	}


	// Receive the create event directly from the CreateTaskModal
		function handleCreate(event) {
		console.log('Task Created on Board Page:', event);
		getBoardTasks(projectId);
	}
</script>

{#if loading}
	<div class="overlay">
		<span class="loader"></span>
	</div>
{/if}

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
		<Board columns={filteredProjectTasks} on:update={handleUpdate} on:delete={handleUpdate}/>
	{/if}
</div>

<CreateTaskModal show={showModal} on:close={handleClose} on:update={handleCreate}/>

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
      animation: rotate 1s linear infinite
  }
  .loader::before {
      content: "";
      box-sizing: border-box;
      position: absolute;
      inset: 0px;
      border-radius: 50%;
      border: 5px solid #FFF;
      animation: prixClipFix 2s linear infinite ;
  }

  @keyframes rotate {
      100%   {transform: rotate(360deg)}
  }

  @keyframes prixClipFix {
      0%   {clip-path:polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)}
      25%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)}
      50%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)}
      75%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%)}
      100% {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 0)}
  }
</style>
