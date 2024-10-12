<script>
	import { data } from './data';
	import Board from '$components/board/Board.svelte';
	import CreateTaskModal from '$components/modals/createTask.modal.svelte';
	import { projectData } from '$lib/stores/projectStore';

	console.log($projectData);

	let showModal = false;

	function handleClose() {
		showModal = false;
	}

	function handleBoardUpdated(newColumnsData) {
		// if you wanted to update a database or a server, this is where you would do it
		$data = newColumnsData;
	}

	let tags = ['tag1', 'tag2', 'tag3', 'tag4'];
</script>

<div id="projectBoard">
	<div class="top">
		<p>NOMBRE PROYECTO</p>
		<div class="controls">
			<button
				class="btn btn-primary"
				on:click={() => {
					showModal = true;
				}}
			>
				Crear tarea</button
			>
			<select class="select select-primary w-full max-w-xs">
				<option disabled selected>What is the best TV show?</option>
				{#each tags as tag}
					<option value={tag}>{tag}</option>
				{/each}
			</select>
		</div>
	</div>

	<Board columns={$data} onFinalUpdate={handleBoardUpdated} />
</div>

<CreateTaskModal show={showModal} on:close={handleClose} />

<style>
	.top {
		display: flex;
		justify-content: space-between;
	}

	.top .controls {
		display: flex;
		gap: var(--luma-element-spacing);
	}

	.top p:first-child {
		font-size: var(--luma-h5-font-size);
	}
</style>
