<script>
	import Modal from '$components/modal.svelte';
	import { createEventDispatcher } from 'svelte';
	import { projectData } from '$lib/stores/projectStore';
	import axios from 'axios';

	const dispatch = createEventDispatcher();

	export let show = true;
	let projectId = $projectData.Proyecto_ID;
	let projectName = $projectData.nombre;
	let projectNameUser = '';
	let userData = JSON.parse(localStorage.getItem('sb-kyttbsnmnrayejpbxmpp-auth-token'));
	let userID = userData.user.id;

	const close = () => {
		show = false;
		dispatch('close');
	};

	async function deleteProject() {
		console.log(projectId, userID);

		if (projectName === projectNameUser) {
			await axios
				.delete('https://luma-server.onrender.com/api/projects', {
					projectId: projectId,
					requestUserId: userID
				})
				.then((response) => {
					console.log('Delete successful:', response.data);
					console.log(projectId, userID);
					close();
				})
				.catch((error) => {
					console.error('Error during delete request:', error);
				});
		}
	}
</script>

{#if show}
	<Modal header closeByBackgroundClick controls title="Confirmar eliminación" on:close={close}>
		<div class="content">
			<p>
				¿Estás seguro de que deseas eliminar el proyecto <span class="projectName"
					>{projectName}</span
				>?
			</p>
			<p class="warning">Esta acción no podrá ser deshecha.</p>

			<p>Para confirmar, escriba <span class="projectName">{projectName}</span></p>
			<input
				id="projectName"
				type="text"
				required
				bind:value={projectNameUser}
				class:invalid={projectName !== projectNameUser && projectNameUser.length > 0}
			/>

			<div class="controls">
				<button class="btn btn-outline" on:click={close}>Cancelar</button>
				<button
					type="button"
					class="btn btn-error"
					disabled={projectName !== projectNameUser}
					on:click={deleteProject}
				>
					Eliminar
				</button>
			</div>
		</div>
	</Modal>
{/if}

<style>
	.content {
		margin-top: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.content .projectName {
		font-weight: bold;
		color: var(--luma-color-gray-500);
	}

	.content .warning {
		color: var(--luma-color-red-error);
	}

	.controls {
		text-align: right;
	}

	input {
		padding: 0.75rem;
		border-radius: 8px;
		border: 1px solid var(--luma-color-gray-300);
		font-size: 1rem;
		width: 100%;
		box-sizing: border-box;
	}

	input.invalid {
		border-color: var(--luma-color-red-error);
		background-color: #ffe6e6; /* Color de fondo para entradas inválidas */
	}

	.btn[disabled] {
		opacity: 0.6;
		cursor: not-allowed;
	}
</style>
