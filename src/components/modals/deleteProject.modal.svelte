<script>
	import Modal from '$components/modal.svelte';
	import { createEventDispatcher } from 'svelte';
	import { projectData } from '$lib/stores/projectStore';
	import axios from 'axios';
	import { showToast } from '$lib/stores/toastStore';
	import { browser } from '$app/environment'; // Import browser check
	import { t } from '$lib/translations';

	const dispatch = createEventDispatcher();

	export let show = true;
	let projectId = '';
	let projectName = '';
	let projectNameUser = '';
	let userData = null;
	let userID = null;

	// Subscribe to projectData store to set project details when available
	projectData.subscribe((data) => {
		if (data) {
			projectId = data.Proyecto_ID;
			projectName = data.nombre;
		}
	});

	if (browser) {
		// Retrieve user data only in the browser environment
		const localData = localStorage.getItem('sb-kyttbsnmnrayejpbxmpp-auth-token');
		if (localData) {
			userData = JSON.parse(localData);
			userID = userData.user.id;
		} else {
			console.error('No user data found in localStorage');
		}
	}

	const close = () => {
		show = false;
		dispatch('close');
	};

	async function deleteProject() {
		console.log(projectId, userID);
		if (projectName === projectNameUser) {
			await axios
				.delete('https://luma-server.onrender.com/api/projects', {
					data: {
						projectId: projectId,
						requestUserId: userID
					}
				})
				.then((response) => {
					console.log('Proyecto eliminado', response.data);
					showToast($t('delete_project.delete_success'), { type: 'success', duration: 5000 });

					window.location.href = '/';
				})
				.catch((error) => {
					console.error('Error al eliminar proyecto', error);
					if (error.response.status === 400 || error.response.status === 403) {
						// Check if the status code is 400
						if (error.response.data == "El usuario no tiene permisos para eliminar el proyecto.") {
							showToast($t('delete_project.not_leader'), {
								type: 'warning',
								duration: 5000,
								theme: 'light'
							});
						} else {
							showToast(error.response.data, {
								type: 'warning',
								duration: 5000,
								theme: 'light'
							});
						}
						return;
					}
					// Generic error toast
					showToast($t('delete_project.delete_error'), { type: 'error', duration: 5000 });
					return;
				});
		}
	}
</script>

{#if show}
	<Modal header closeByBackgroundClick controls title={$t('delete_project.confirm_title')} on:close={close}>
		<div class="content">
			<p>
				{$t('delete_project.you_sure')} <span class="projectName"
					>{projectName}</span
				>?
			</p>
			<p class="warning">{$t('delete_project.warning')}</p>

			<p>{$t('delete_project.to_confirm')} <span class="projectName">{projectName}</span></p>
			<input
				id="projectName"
				type="text"
				required
				bind:value={projectNameUser}
				class:invalid={projectName !== projectNameUser && projectNameUser.length > 0}
			/>

			<div class="controls">
				<button class="btn btn-outline" on:click={close}>{$t('delete_project.cancel')}</button>
				<button
					type="button"
					class="btn btn-error"
					disabled={projectName !== projectNameUser}
					on:click={deleteProject}
				>
				{$t('delete_project.delete')}
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
